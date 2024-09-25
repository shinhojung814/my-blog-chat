import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

import PostList from '@components/PostList'
import { Post } from '@models/post'
import { createClient } from '@utils/supabase/server'

type TagPageProps = {
  tag: string
  posts: Post[]
}

const supabase = createClient({})

function TagPage({ tag }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <PostList tag={tag} />
}

export const getStaticProps = (async (context) => {
  const tag = context.params?.tag as string
  const { data } = await supabase
    .from('Post')
    .select('*')
    .like('tags', `%${tag}%`)

  return {
    props: {
      tag,
      posts:
        data?.map((post) => ({
          ...post,
          tags: JSON.parse(post.tags) as string[],
        })) ?? [],
    },
  }
}) satisfies GetStaticProps<TagPageProps>

export const getStaticPaths = (async () => {
  const { data } = await supabase.from('Post').select('tags')
  const tags = Array.from(
    new Set(data?.flatMap((data) => JSON.parse(data.tags))),
  )

  return {
    paths: tags.map((tag) => ({ params: { tag } })),
    fallback: 'blocking',
  }
}) satisfies GetStaticPaths

export default TagPage
