import { cache } from 'react'

import { createClient as createBrownserClient } from '@utils/supabase/client'
import { createClient as createServerClient } from '@utils/supabase/server'

export const getPosts = cache(
  async ({
    category,
    tag,
    page = 0,
  }: {
    category?: string
    tag?: string
    page?: number
  }) => {
    const supabase =
      typeof window === 'undefined'
        ? createServerClient()
        : createBrownserClient()

    let request = supabase.from('Post').select('*')

    if (category) request = request.eq('category', category)
    if (tag) request = request.like('tags', `%${tag}%`)

    const { data } = await request
      .order('created_at', { ascending: false })
      .range(page, page + 4)

    return data?.map((post) => ({
      ...post,
      tags: JSON.parse(post.tags) as string[],
    }))
  },
)

export const getPost = cache(async (id: string) => {
  const supabase =
    typeof window === 'undefined'
      ? createServerClient()
      : createBrownserClient()

  const { data } = await supabase.from('Post').select('*').eq('id', id)

  if (!data) return null

  return {
    ...data[0],
    tags: JSON.parse(data[0].tags) as string[],
  }
})

export const getCategories = cache(async () => {
  const supabase =
    typeof window === 'undefined'
      ? createServerClient()
      : createBrownserClient()

  const { data } = await supabase.from('Post').select('category')

  return Array.from(new Set(data?.map((data) => data.category))) as string[]
})

export const getTags = cache(async () => {
  const supabase =
    typeof window === 'undefined'
      ? createServerClient()
      : createBrownserClient()

  const { data } = await supabase.from('Post').select('tags')

  return Array.from(
    new Set(data?.flatMap((data) => JSON.parse(data.tags))),
  ) as string[]
})
