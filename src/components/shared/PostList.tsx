'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import PostCard from '@components/shared/PostCard'
import { Post } from '@models/post'
import { getPosts } from '@utils/fetch'
import { cn } from '@utils/style'

type PostListProps = {
  category?: string
  tag?: string
  className?: string
  initialPosts?: Post[]
}

const PostList: React.FC<PostListProps> = ({
  category,
  tag,
  className,
  initialPosts,
}) => {
  const {
    data: postPages,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', category, tag],
    queryFn: async ({ pageParam }) => {
      const posts = await getPosts({ category, tag, page: pageParam })

      if (!posts) return { posts: [], nextPage: null }

      return {
        posts: posts,
        nextPage: posts?.length === 5 ? pageParam + 5 : null,
      }
    },
    initialData: initialPosts
      ? {
          pages: [
            {
              posts: initialPosts ?? [],
              nextPage: initialPosts.length === 5 ? 5 : null,
            },
          ],
          pageParams: [0],
        }
      : undefined,
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
    <div className={cn('flex flex-col items-center pt-10', className)}>
      <h1 className={cn('text-2xl font-medium', !category && !tag && 'hidden')}>
        {category ? category : `#${tag}`}
      </h1>
      <div className="grid grid-cols-2 container pt-12 pb-24 gap-x-4 gap-y-6 lg:gap-x-7 lg:gap-y-12">
        {postPages?.pages
          .flatMap((page) => page.posts)
          .map((post) => <PostCard key={post.id} {...post} />)}
        <div ref={ref} />
      </div>
    </div>
  )
}

export default PostList
