import { cookies } from 'next/headers'

import PostList from '@components/shared/PostList'
import { createClient } from '@utils/supabase/server'

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const category = params.category
  const supabase = createClient(cookies())
  const { data } = await supabase
    .from('Post')
    .select('*')
    .eq('category', category)

  return (
    <PostList
      category={decodeURIComponent(category)}
      initialPosts={data?.map((post) => ({
        ...post,
        tags: JSON.parse(post.tags) as string[],
      }))}
    />
  )
}

export const generateStaticParams = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('Post').select('category')
  const categories = Array.from(new Set(data?.map((data) => data.category)))

  return categories.map((category) => ({ category }))
}
