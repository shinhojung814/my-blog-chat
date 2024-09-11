import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import PostCard from '@components/PostCard'
import { createClient } from '@utils/supabase/client'
import { useInView } from 'react-intersection-observer'

export default function Home() {
  const supabase = createClient()

  const {
    data: postPages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => {
      const { data } = await supabase
        .from('Post')
        .select('*')
        .order('created_at', { ascending: false })
        .range(pageParam, pageParam + 4)

      if (!data) return { posts: [], nextPage: null }

      return { posts: data, nextPage: data.length === 5 ? pageParam + 5 : null }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 container pt-20 pb-24 px-4 mx-auto gap-x-4 gap-y-6 lg:gap-x-7 lg:gap-y-12">
        {postPages?.pages
          .flatMap((page) => page.posts)
          .map((post) => <PostCard key={post.id} {...post} />)}
        <div ref={ref} />
      </div>
    </div>
  )
}
