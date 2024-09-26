import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { MarkdownViewer } from '@components/shared/Markdown'
import { Post } from '@models/post'

const PostPage: React.FC<Post> = ({
  title,
  category,
  tags,
  content,
  created_at,
  image_url,
}) => {
  return (
    <div className="flex flex-col container pt-20 pb-40 gap-8">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Link
            href={`/categories/${category}`}
            className="px-2 py-1 rounded-md bg-slate-800 text-sm text-white"
          >
            {category}
          </Link>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-2 py-1 rounded-md bg-slate-200 text-sm text-slate-500"
            >
              {tag}
            </Link>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          {format(new Date(created_at), 'yyyy년 MM월 dd일 HH:mm')}
        </div>
      </div>
      {image_url && (
        <Image
          src={image_url}
          alt={title}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      )}
      <MarkdownViewer source={content} className="min-w-full" />
    </div>
  )
}

export default PostPage
