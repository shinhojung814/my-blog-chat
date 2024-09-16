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
  if (req.method !== 'POST') return res.status(405).end()

  const messages = req.body.messages as ChatCompletionMessageParam[]

  const response = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages,
  })

  messages.push(response.choices[0].message)

  res.status(200).json({ messages })
}
