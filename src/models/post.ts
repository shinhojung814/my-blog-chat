import { Database } from '@models/supabase'

export type Post = Omit<Database['public']['Tables']['Post']['Row'], 'tags'> & {
  tags: string[]
}

export type PostRequest = Database['public']['Tables']['Post']['Insert']
