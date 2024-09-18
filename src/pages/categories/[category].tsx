import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

import PostList from '@components/PostList'

type CategoryPageProps = {
  category: string
}

function CategoryPage({
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostList category={category} />
}

export const getStaticProps = (async (context) => {
  return {
    props: {
      category: context.params?.category as string,
    },
  }
}) satisfies GetStaticProps<CategoryPageProps>

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}) satisfies GetStaticPaths

export default CategoryPage
