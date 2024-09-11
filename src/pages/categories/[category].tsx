import { GetServerSideProps } from 'next'

import PostList from '@components/PostList'

type CategoryPageProps = {
  category: string
}

function CategoryPage({ category }: CategoryPageProps) {
  return <PostList category={category} />
}

export const getServerSideProps: GetServerSideProps<
  CategoryPageProps
> = async ({ query }) => {
  return {
    props: {
      category: query.category as string,
    },
  }
}

export default CategoryPage
