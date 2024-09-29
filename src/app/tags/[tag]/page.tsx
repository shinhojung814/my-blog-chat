import PostList from '@components/shared/PostList'
import { getPosts, getTags } from '@utils/fetch'

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag)
  const posts = await getPosts({ tag })

  return <PostList tag={tag} initialPosts={posts} />
}

export const generateStaticParams = async () => {
  const tags = await getTags()

  return tags.map((tag) => ({ tag }))
}
