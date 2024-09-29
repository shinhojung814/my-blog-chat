import Link from 'next/link'

import { getTags } from '@utils/fetch'

export default async function TagsPage() {
  const tags = await getTags()

  return (
    <div className="flex flex-col items-center pt-20 pb-24 px-4 gap-2">
      <h1 className="mb-8 text-center text-2xl font-semibold">태그</h1>
      <div className="flex flex-wrap justify-center container gap-2">
        {tags?.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="text-lg text-gray-500 underline"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  )
}
