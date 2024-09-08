import ReactSelect from 'react-select'

import { MarkdownEditor } from '@components/Markdown'

type WritePageProps = {
  existingCategories: string[]
  existingTags: string[]
}

function WritePage({ existingCategories, existingTags }: WritePageProps) {
  return (
    <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">새로운 포스트</h1>
      <form>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="제목"
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
          />
          <input
            type="file"
            accept="image/*"
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
          />
          <ReactSelect options={[]} placeholder="카테고리" isMulti={false} />
          <ReactSelect options={[]} placeholder="태그" isMulti={true} />
          <MarkdownEditor height={500} />
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-gray-700 py-2 text-white"
        >
          작성하기
        </button>
      </form>
    </div>
  )
}

export const getServerSideProps = () => {}

export default WritePage
