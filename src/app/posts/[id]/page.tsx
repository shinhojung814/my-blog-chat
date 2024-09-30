import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PostPage from '@components/Posts'
import { getPost } from '@utils/fetch'
import { createClient } from '@utils/supabase/server'

type PostPageProps = {
  params: { id: string }
}

export const generateMetadata = async ({
  params,
}: PostPageProps): Promise<Metadata> => {
  const post = await getPost(params.id)

  return {
    title: post?.title,
    description: post?.content.split('.')[0],
    openGraph: post?.image_url
      ? {
          images: [
            {
              url: post?.image_url,
            },
          ],
        }
      : undefined,
  }
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const post = await getPost(params.id)

  if (!post) return notFound()

  return <PostPage {...post} />
}

export const generateStaticParams = async () => {
  const supabase = createClient()
  const { data } = await supabase.from('Post').select('id')

  return data?.map(({ id }) => ({ params: { id: id.toString() } })) ?? []
}
