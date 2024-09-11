import { GetServerSideProps } from 'next'

import PostList from '@components/PostList'

type TagPageProps = {
  tag: string
}

function TagPage({ tag }: TagPageProps) {
  return <PostList tag={tag} />
}

export const getServerSideProps: GetServerSideProps<TagPageProps> = async ({
  query,
}) => {
  return {
    props: {
      tag: query.tag as string,
    },
  }
}

export default TagPage
