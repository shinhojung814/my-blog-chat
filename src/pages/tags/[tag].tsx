import { GetServerSideProps } from 'next'

import PostList from '@components/PostList'

type TagsPageProps = {
  tag: string
}

function TagsPage({ tag }: TagsPageProps) {
  return <PostList tag={tag} />
}

export const getServerSideProps: GetServerSideProps<TagsPageProps> = async ({
  query,
}) => {
  return {
    props: {
      tag: query.tag as string,
    },
  }
}

export default TagsPage
