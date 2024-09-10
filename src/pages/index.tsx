import { useQuery } from '@tanstack/react-query'

import PostCard from '@components/PostCard'
import { createClient } from '@utils/supabase/client'

export default function Home() {
  const supabase = createClient()
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('Post')
        .select('*')
        .order('created_at', { ascending: false })

      if (!data) return []

      return data
    },
  })

  return (
    <main>
      <div className="grid grid-cols-2 container pt-20 pb-24 px-4 mx-auto gap-x-4 gap-y-6 lg:gap-x-7 lg:gap-y-12">
        {posts?.map((post) => <PostCard key={post.id} {...post} />)}
      </div>
    </main>
  )
}
