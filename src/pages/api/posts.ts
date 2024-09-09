import formidable from 'formidable'
import { readFileSync } from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { Post, PostRequest } from '@models/post'
import { sanitizeFileName } from '@utils/posts'
import { createClient } from '@utils/supabase/server'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | { error: string }>,
) {
  try {
    const supabase = await createClient(req.cookies)

    const form = formidable({ multiples: true })
    const [fields, files] = await form.parse(req)
    let image_url: string | null = null

    if (files.image && Array.isArray(files.image)) {
      const file = files.image[0]
      const fileName = `${file.newFilename}_${sanitizeFileName(file.originalFilename)}`
      const fileContent = readFileSync(file.filepath)

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-image')
        .upload(fileName, fileContent, {
          contentType: file.mimetype ?? undefined,
        })

      if (uploadError) {
        res.status(403).json({ error: 'Error uploading image' })
        return
      }

      if (uploadData?.path) {
        const { data: publicUrlData } = await supabase.storage
          .from('blog-image')
          .getPublicUrl(uploadData.path)

        image_url = publicUrlData?.publicUrl ?? null
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

    const { data, error: insertError } = await supabase
      .from('Post')
      .insert([postRequest])
      .select()

    if (insertError) {
      res.status(500).json({ error: 'Error inserting post' })
      return
    }

    if (data && data.length === 1) {
      const { tags, ...rest } = data[0]

      res.status(200).json({
        ...rest,
        tags: JSON.parse(tags) as string[],
      })
    } else {
      res.status(500).json({ error: 'Error retrieving inserted post' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Unexpected server error' })
  }
}
