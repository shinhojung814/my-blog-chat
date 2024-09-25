import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

import PostList from '@components/PostList'
import { Post } from '@models/post'
import { createClient } from '@utils/supabase/server'

type CategoryPageProps = {
  category: string
  posts: Post[]
}

const supabase = createClient({})

function CategoryPage({
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostList category={category} />
}

export const getStaticProps = (async (context) => {
  const category = context.params?.category as string
  const { data } = await supabase
    .from('Post')
    .select('*')
    .eq('category', category)

  return {
    props: {
      category,
      posts:
        data?.map((post) => ({
          ...post,
          tags: JSON.parse(post.tags) as string[],
        })) ?? [],
    },
  }
}) satisfies GetStaticProps<CategoryPageProps>

export const getStaticPaths = (async () => {
  const { data } = await supabase.from('Post').select('category')
  const categories = Array.from(new Set(data?.map((data) => data.category)))

  return {
    paths: categories.map((category) => ({ params: { category } })),
    fallback: 'blocking',
  }
}) satisfies GetStaticPaths

export default CategoryPage
