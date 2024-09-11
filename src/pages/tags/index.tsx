import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { createClient } from '@utils/supabase/client'

function TagsPage() {
  const supabase = createClient()

  const { data: existingTags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await supabase.from('Post').select('tags')

      return Array.from(new Set(data?.flatMap((data) => JSON.parse(data.tags))))
    },
  })

  return (
    <div className="flex flex-col items-center pt-20 pb-24 px-4 gap-2">
      <h1 className="mb-8 text-center text-2xl font-semibold">태그</h1>
      <div className="flex flex-wrap justify-center container mx-auto px-10 gap-2">
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

export default TagsPage
