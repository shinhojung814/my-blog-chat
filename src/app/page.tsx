import PostList from '@components/shared/PostList'
import { getPosts } from '@utils/fetch'

export default async function Home() {
  const posts = await getPosts({})

  return <PostList initialPosts={posts} />
}
