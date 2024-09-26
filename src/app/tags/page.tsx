import { cookies } from 'next/headers'
import Link from 'next/link'

import { createClient } from '@utils/supabase/server'

export default async function TagsPage() {
  const supabase = createClient(cookies())
  const { data } = await supabase.from('Post').select('tags')
  const existingTags = Array.from(
    new Set(data?.flatMap((data) => JSON.parse(data.tags))),
  )

  return (
    <div className="flex flex-col items-center pt-20 pb-24 px-4 gap-2">
      <h1 className="mb-8 text-center text-2xl font-semibold">태그</h1>
      <div className="flex flex-wrap justify-center container gap-2">
        {existingTags?.map((tag) => (
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
