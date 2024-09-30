import { Metadata } from 'next'

import PostList from '@components/shared/PostList'
import { getCategories, getPosts } from '@utils/fetch'

type CategoryPageProps = {
  params: { category: string }
}

export const generateMetadata = ({ params }: CategoryPageProps): Metadata => {
  return {
    title: `My-Blog-Chat ${decodeURIComponent(params.category)}`,
    description: `My-Blog-Chat ${decodeURIComponent(params.category)}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  const posts = await getPosts({ category })

  return (
    <PostList category={decodeURIComponent(category)} initialPosts={posts} />
  )
}

export const generateStaticParams = async () => {
  const categories = await getCategories()

  return categories.map((category) => ({ category }))
}
