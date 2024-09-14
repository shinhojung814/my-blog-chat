import type { ChatCompletionMessageParam } from 'openai/resources/index'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

import IconButton from '@components/IconButton'

function SearchPage() {
  const [] = useState<ChatCompletionMessageParam[]>()
  const handleSubmit = () => {}

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">SearchPage</div>
      <div className="container mx-auto p-4 pb-12">
        <form
          className="flex items-center rounded-md border"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="질문을 입력해주세요."
            className="flex-1 rounded-md p-2 pl-3"
          />
          <IconButton type="submit" Icon={AiOutlineSearch} />
        </form>
      </div>
    </div>
  )
}

export default SearchPage
