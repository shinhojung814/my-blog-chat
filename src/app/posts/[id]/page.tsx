import { notFound } from 'next/navigation'

import PostPage from '@components/Posts'
import { getPost } from '@utils/fetch'
import { createClient } from '@utils/supabase/server'

export default async function PostDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await getPost(params.id)

  if (!post) return notFound()

  return <PostPage {...post} />
}

export const generateStaticParams = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('Post').select('id')

  return data?.map(({ id }) => ({ params: { id: id.toString() } })) ?? []
}
