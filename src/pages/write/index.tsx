import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from 'react'

import Input from '@components/Input'
import { MarkdownEditor } from '@components/Markdown'
import { createClient } from '@utils/supabase/client'

const ReactSelect = dynamic(() => import('react-select/creatable'), {
  ssr: false,
})

function PostWritePage() {
  const router = useRouter()
  const supabase = createClient()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const { data: existingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('category')

      return Array.from(new Set(data?.map((data) => data.category)))
    },
  })

  const { data: existingTags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('tags')

      return Array.from(new Set(data?.flatMap((data) => JSON.parse(data.tags))))
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!title.length) return alert('제목을 입력해주세요.')
    if (!category.length) return alert('카테고리를 선택해주세요.')
    if (!tags.length) return alert('태그를 선택해주세요.')
    if (!content.length) return alert('내용을 입력해주세요.')

    const formData = new FormData()

    formData.append('title', title)
    formData.append('category', category)
    formData.append('tags', tags)
    formData.append('content', content)

    if (fileRef.current?.files?.[0]) {
      formData.append('image', fileRef.current.files?.[0])
    }

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (data.id) {
      router.push(`posts/${data.id}`)
    }
  }

  return (
    <div className="container mx-auto flex flex-col px-4 pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">새로운 포스트</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
          />
          <Input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400"
          />
          <ReactSelect
            options={(existingCategories ?? []).map((category) => ({
              label: category,
              value: category,
            }))}
            placeholder="카테고리"
            onChange={(e: any) => e && setCategory(e.value)}
            isMulti={false}
          />
          <ReactSelect
            options={(existingTags ?? []).map((tag) => ({
              label: tag,
              value: tag,
            }))}
            placeholder="태그"
            onChange={(e: any) => {
              e.length && setTags(JSON.stringify(e.map((e: any) => e.value)))
            }}
            isMulti
          />
          <MarkdownEditor
            value={content}
            onChange={(text) => setContent(text ?? '')}
            height={500}
          />
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

export default PostWritePage
