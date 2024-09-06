import Link from 'next/link'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsRobot } from 'react-icons/bs'

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center h-14 lg:h-16 border-b px-4 lg:px-6">
      <button className="p-2">
        <AiOutlineMenu className="w-5 h-5 lg:w-6 lg:h-6" />
      </button>
      <Link href="/">
        <h1 className="text-2xl lg:text-3xl font-medium text-slate-600">
          BLOG
        </h1>
      </Link>
      <Link className="p-2" href="/posts">
        <BsRobot className="w-5 h-5 lg:w-6 lg:h-6" />
      </Link>
    </header>
  )
}

export default Header
