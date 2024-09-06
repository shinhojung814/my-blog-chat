import { GetServerSideProps } from 'next'

type PostPageProps = {
  id: string
}

function PostPage({ id }: PostPageProps) {
  return <div>PostPage {id}</div>
}

const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query

  return {
    props: {
      id,
    },
  }
}

export default PostPage
