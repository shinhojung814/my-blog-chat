import { Metadata } from 'next'

import PostList from '@components/shared/PostList'
import { getPosts, getTags } from '@utils/fetch'

type TagPageProps = { params: { tag: string } }

export const generateMetadata = ({ params }: TagPageProps): Metadata => {
  return {
    title: `My-Blog-Chat #${decodeURIComponent(params.tag)}`,
    description: `My-Blog-Chat #${decodeURIComponent(params.tag)}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  const posts = await getPosts({ tag })

  return <PostList tag={tag} initialPosts={posts} />
}

export const generateStaticParams = async () => {
  const tags = await getTags()

  return tags.map((tag) => ({ tag }))
}
