import Image from 'next/image'
import Link from 'next/link'

import { Post } from '@models/post'
import { cn } from '@utils/style'

export type PostCardProps = Omit<Post, 'tags'> & {
  className?: string
}

const PostCard = ({
  id,
  title,
  content,
  image_url,
  className,
}: PostCardProps) => {
  return (
    <Link href={`/posts/${id}`} className={cn('bg-white', className)}>
      <div className="relative aspect-[1.8/1] w-full">
        <Image
          src={image_url ?? '/thumbnail.png'}
          alt={title}
          className="object-cover"
          sizes="360px"
          fill
        />
      </div>
      <div className="p-2">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="line-clamp-3 text-sm text-gray-500">{content}</p>
      </div>
    </Link>
  )
}

export default PostCard
