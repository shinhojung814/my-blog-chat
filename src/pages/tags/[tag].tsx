import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'

import PostCard from '@components/PostCard'
import { createClient } from '@utils/supabase/client'

type TagsPageProps = {
  tag: string
}

function TagsPage({ tag }: TagsPageProps) {
  const supabase = createClient()
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('Post')
        .select('*')
        .like('tags', `%${tag}%`)
        .order('created_at', { ascending: false })

      if (!data) return []

      return data
    },
  })

  return (
    <div className="flex flex-col items-center pt-10">
      <h1 className="text-2xl font-medium"># {tag}</h1>
      <div className="grid grid-cols-2 container pt-12 pb-24 px-4 mx-auto gap-x-4 gap-y-6 lg:gap-x-7 lg:gap-y-12">
        {posts?.map((post) => <PostCard key={post.id} {...post} />)}
      </div>
    </div>
  )
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
