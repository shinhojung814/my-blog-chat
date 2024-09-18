import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

import PostList from '@components/PostList'

type TagPageProps = {
  tag: string
}

function TagPage({ tag }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostList tag={tag} />
}

export const getStaticProps = (async (context) => {
  return {
    props: {
      tag: context.params?.tag as string,
    },
  }
}) satisfies GetStaticProps<TagPageProps>

export const getStaticPaths = (async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}) satisfies GetStaticPaths

export default TagPage
