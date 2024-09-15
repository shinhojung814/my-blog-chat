import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { ChatCompletionMessageParam } from 'openai/resources/index'
import { FormEvent, useCallback, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

import IconButton from '@components/IconButton'

function SearchPage() {
  const [messageParams, setMessageParams] = useState<
    ChatCompletionMessageParam[]
  >([])

  const inputRef = useRef<HTMLInputElement>(null)

  const { mutate, isPending } = useMutation<
    ChatCompletionMessageParam[],
    unknown,
    ChatCompletionMessageParam[]
  >({
    mutationFn: async (messages) => {
      const res = await axios.post('/api/completions', { messages })

      return res.data.messages
    },
    onSuccess: (data) => {
      setMessageParams(data)
    },
  })

  const handleSubmit = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault()

      if (isPending) return

      const nextMessages = [
        ...messageParams,
        {
          role: 'user' as const,
          content: (inputRef.current?.value as string) ?? '',
        },
      ]

      setMessageParams(nextMessages)

      mutate(nextMessages)
    },
    [messageParams, mutate, isPending],
  )

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">{JSON.stringify(messageParams)}</div>
      <div className="container mx-auto p-4 pb-12">
        <form
          className="flex items-center rounded-md border"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="질문을 입력해주세요."
            ref={inputRef}
            className="flex-1 p-2 pl-3"
          />
          <IconButton type="submit" Icon={AiOutlineSearch} />
        </form>
      </div>
    </div>
  )
}

export default SearchPage
