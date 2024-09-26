import { cookies } from 'next/headers'

import PostPage from '@components/Posts'
import { createClient } from '@utils/supabase/server'

export default async function PostDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient(cookies())
  const { data } = await supabase
    .from('Post')
    .select('*')
    .eq('id', Number(params?.id))

  if (!data || !data[0]) return { notFound: true }

  const { tags, ...rest } = data[0]

  return <PostPage tags={JSON.parse(tags) as string[]} {...rest} />
}

export const generateStaticParams = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('Post').select('id')

  return data?.map(({ id }) => ({ params: { id: id.toString() } })) ?? []
}
