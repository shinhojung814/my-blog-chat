import { createClient } from '@/utils/supabase/client'
import { GetServerSideProps } from 'next'

type PostPageProps = {
  id: string
}

function PostPage({ id }: PostPageProps) {
  return <div>PostPage {id}</div>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query
  const supabase = createClient()
  const response = await supabase.from('Post').select('*').eq('id', Number(id))

  return {
    props: {
      id,
    },
  }
}

export default PostPage
