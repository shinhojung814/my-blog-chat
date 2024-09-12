import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs'

type CompletionsResponse = {
  messages: ChatCompletionMessageParam[]
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompletionsResponse>,
) {
  if (req.method !== 'GET') return res.status(405).end()

  const messages: ChatCompletionMessageParam[] = []

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are interacting with OpenAI.',
      },
      { role: 'user', content: 'gpt-3.5-turbo에 대해 설명해주세요.' },
    ],
    model: 'gpt-3.5-turbo',
  })

  messages.push(response.choices[0].message)

  res.status(200).json({ messages })
}
