import { cookies } from 'next/headers'

import PostList from '@components/shared/PostList'
import { createClient } from '@utils/supabase/server'

export default async function Home() {
  const supabase = createClient(cookies())
  const { data } = await supabase.from('Post').select('*')

  return (
    <PostList
      initialPosts={data?.map((post) => ({
        ...post,
        tags: JSON.parse(post.tags) as string[],
      }))}
    />
  )
}
