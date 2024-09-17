import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import {
  ChatCompletionMessageParam,
  ChatCompletionSystemMessageParam,
} from 'openai/resources/index.mjs'

import { createClient } from '@utils/supabase/server'

type CompletionsResponse = {
  messages: ChatCompletionMessageParam[]
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

const getFirstMessage = async (
  supabase: ReturnType<typeof createClient>,
): Promise<ChatCompletionSystemMessageParam> => {
  const { data: postMetadataList } = await supabase
    .from('Post')
    .select('id, title, category, tags')

  return {
    role: 'system',
    content: `
    retrieve 함수를 사용하여 블로그에 게시된 포스트를 참고하여 답변할 수 있습니다.
    [블로그 포스트 목록] ${JSON.stringify(postMetadataList ?? [])}
    `,
  }
}

const getPostContent = async (
  id: string,
  supabase: ReturnType<typeof createClient>,
) => {
  const { data } = await supabase.from('Post').select('*').eq('id', id)

  if (!data) return {}

  return data[0]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompletionsResponse>,
) {
  if (req.method !== 'POST') return res.status(405).end()

  const messages = req.body.messages as ChatCompletionMessageParam[]

  const supabase = await createClient(req.cookies)

  if (messages.length === 1) {
    messages.unshift(await getFirstMessage(supabase))
  }

  while (messages.at(-1)?.role !== 'assistant') {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-0613',
      messages,
      function_call: 'auto',
      functions: [
        {
          name: 'retrieve',
          parameters: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: '참고할 포스트의 id',
              },
            },
          },
          description: '해당 id를 가진 블로그 포스트의 전체 내용을 가져옵니다.',
        },
      ],
    })

    const responseMessage = response.choices[0].message

    if (responseMessage.function_call) {
      const { id } = JSON.parse(responseMessage.function_call.arguments)

      const functionResult = await getPostContent(id, supabase)

      messages.push({
        role: 'function',
        name: responseMessage.function_call.name,
        content: JSON.stringify(functionResult),
      })
    } else {
      messages.push(responseMessage)
    }
  }

  res.status(200).json({ messages })
}
