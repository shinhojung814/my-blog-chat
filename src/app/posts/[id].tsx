import { format } from 'date-fns'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { MarkdownViewer } from '@components/Markdown'
import { Post } from '@models/post'
import { createClient } from '@utils/supabase/client'

const supabase = createClient()

function PostDetailPage({
  id,
  title,
  category,
  tags,
  content,
  created_at,
  image_url,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-col container pt-20 pb-40 gap-8">
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
          className="w-full h-auto"
        />
      )}
      <MarkdownViewer source={content} className="min-w-full" />
    </div>
  )
}

export const getStaticProps = (async (context) => {
  const { data } = await supabase
    .from('Post')
    .select('*')
    .eq('id', Number(context.params?.id))

  if (!data || !data[0]) return { notFound: true }

  const { id, title, category, tags, content, created_at, image_url } = data[0]

  return {
    props: {
      id,
      title,
      category,
      tags: JSON.parse(tags) as string[],
      content,
      created_at,
      image_url,
    },
  }
}) satisfies GetStaticProps<Post>

export const getStaticPaths = (async () => {
  const { data } = await supabase.from('Post').select('id')

  return {
    paths: data?.map(({ id }) => ({ params: { id: id.toString() } })) ?? [],
    fallback: 'blocking',
  }
}) satisfies GetStaticPaths

export default PostDetailPage
