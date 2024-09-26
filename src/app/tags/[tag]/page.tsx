import { cookies } from 'next/headers'

import PostList from '@components/shared/PostList'
import { createClient } from '@utils/supabase/server'

export default async function TagPage({ params }: { params: { tag: string } }) {
  const supabase = createClient(cookies())
  const tag = params.tag
  const { data } = await supabase
    .from('Post')
    .select('*')
    .like('tags', `%${tag}%`)

  return (
    <PostList
      tag={decodeURIComponent(tag)}
      initialPosts={data?.map((post) => ({
        ...post,
        tags: JSON.parse(post.tags) as string[],
      }))}
    />
  )
}

export const generateStaticParams = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('Post').select('tags')
  const tags = Array.from(
    new Set(data?.flatMap((data) => JSON.parse(data.tags))),
  )

  return tags.map((tag) => ({ tag }))
}
