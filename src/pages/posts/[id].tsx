import { format } from 'date-fns'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { MarkdownViewer } from '@components/Markdown'
import { Post } from '@models/post'
import { createClient } from '@utils/supabase/client'

type PostDetailPageProps = Post

function PostDetailPage({
  id,
  title,
  category,
  tags,
  content,
  created_at,
  image_url,
}: PostDetailPageProps) {
  return (
    <div className="flex flex-col container mx-auto pt-20 pb-40 px-4 gap-8">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Link
            href={`/categories/${category}`}
            className="px-2 py-1 rounded-md bg-slate-800 text-sm text-white"
          >
            {category}
          </Link>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-2 py-1 rounded-md bg-slate-200 text-sm text-slate-500"
            >
              {tag}
            </Link>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          {format(new Date(created_at), 'yyyy년 MM월 dd일 HH:mm')}
        </div>
      </div>
      {image_url && (
        <Image
          src={image_url}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      )}
      <MarkdownViewer source={content} className="min-w-full" />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  const supabase = createClient()

  const { data } = await supabase.from('Post').select('*').eq('id', Number(id))

  if (!data || !data[0]) return { notFound: true }

  const { title, category, tags, content, created_at, image_url } = data[0]

  const formattedDate = new Date(created_at).toLocaleDateString('kr-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return {
    props: {
      id,
      title,
      category,
      tags: JSON.parse(tags) as string[],
      content,
      created_at: formattedDate,
      image_url,
    },
  }
}

export default PostDetailPage
