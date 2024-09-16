import dynamic from 'next/dynamic'

const Search = dynamic(() => import('@/components/Search'), { ssr: false })

function SearchPage() {
  return <Search />
}

export default SearchPage
