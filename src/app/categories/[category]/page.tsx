import PostList from '@components/shared/PostList'
import { getCategories, getPosts } from '@utils/fetch'

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
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
