import { GetStaticProps } from 'next'

import PostList from '@components/PostList'
import { Post } from '@models/post'
import { createClient } from '@utils/supabase/server'

function Home() {
  return <PostList />
}

export const getStaticProps = (async () => {
  const supabase = createClient({})
  const { data } = await supabase.from('Post').select('*')

  return {
    props: {
      posts:
        data?.map((post) => ({
          ...post,
          tags: JSON.parse(post.tags) as string[],
        })) ?? [],
    },
  }
}) satisfies GetStaticProps<{ posts: Post[] }>

export default Home
