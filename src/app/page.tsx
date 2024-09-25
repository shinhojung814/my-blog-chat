import { cookies } from 'next/headers'

import PostList from '@components/PostList'
import { createClient } from '@utils/supabase/server'

async function Home() {
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

export default Home
