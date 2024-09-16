import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import type { ChatCompletionMessageParam } from 'openai/resources/index'
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

import Button from '@components/Button'
import IconButton from '@components/IconButton'
import Message, { MessageProps } from '@components/Message'

const Search: React.FC = () => {
  const [messageParams, setMessageParams] = useState<
    ChatCompletionMessageParam[]
  >([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const existingMessages = localStorage.getItem('messages')
    if (existingMessages) {
      setMessageParams(JSON.parse(existingMessages))
    }
  }, [])

  const messagePropsList = useMemo(() => {
    return messageParams.filter(
      (param): param is MessageProps =>
        param.role === 'user' || param.role === 'assistant',
    )
  }, [messageParams])

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
      localStorage.setItem('messages', JSON.stringify(data))
    },
  })

  const handleSubmit = useCallback(
    (e?: FormEvent<HTMLFormElement>) => {
      e?.preventDefault()

      if (isPending || !inputRef.current) return

      const nextMessages = [
        ...messageParams,
        {
          role: 'user' as const,
          content: inputRef.current?.value as string,
        },
      ]

      setMessageParams(nextMessages)
      mutate(nextMessages)
      inputRef.current.value = ''
    },
    [messageParams, mutate, isPending],
  )

  const handleReset = useCallback(() => {
    if (window.confirm('대화를 초기화 하시겠습니까?')) {
      setMessageParams([])
      localStorage.removeItem('messages')
    }
  }, [])

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">
        <Message role="assistant" content="무엇이든 물어보세요." />
        {messagePropsList.map((props, index) => (
          <Message key={index} {...props} />
        ))}
        {isPending && (
          <Message role="assistant" content="답변을 작성하는 중입니다." />
        )}
      </div>
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
        <Button className="block w-[100px] mt-4 ml-auto" onClick={handleReset}>
          대화 초기화
        </Button>
      </div>
    </div>
  )
}

export default Search
