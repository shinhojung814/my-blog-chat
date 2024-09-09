import formidable from 'formidable'
import { readFileSync } from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Post, PostRequest } from '@models/post'
import { createClient } from '@utils/supabase/server'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post>,
) {
  const supabase = await createClient(req.cookies)

  const form = formidable({ multiples: true })
  const [fields, files] = await form.parse(req)
  let image_url: string | null = null

  if (files.image?.length === 1) {
    const file = files.image[0]
    const fileName = `${file.newFilename}_${file.originalFilename}`
    const fileContent = await readFileSync(file.filepath)

    const { data: uploadData, error } = await supabase.storage
      .from('blog-image')
      .upload(fileName, fileContent, {
        contentType: file.mimetype ?? undefined,
      })

    if (error) {
      res.status(403).end()
    }

    if (uploadData?.path) {
      const { data } = await supabase.storage
        .from('blog-image')
        .getPublicUrl(uploadData.path)

      image_url = data.publicUrl
    }
  }

  const { title, category, tags, content } = fields

  const postRequest = {
    title: title?.[0],
    category: category?.[0],
    tags: tags?.[0],
    content: content?.[0],
    image_url,
  } as PostRequest

  const { data } = await supabase.from('Post').insert([postRequest]).select()

  if (data && data.length === 1) {
    const { tags, ...rest } = data[0]

    res.status(200).json({
      ...rest,
      tags: JSON.parse(tags) as string[],
    })
  } else {
    res.status(500).end()
  }
}
