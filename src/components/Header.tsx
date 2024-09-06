import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BsRobot } from 'react-icons/bs'

type HeaderProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="flex justify-between items-center h-14 lg:h-16 border-b px-4 lg:px-6">
      <button className="p-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? (
          <AiOutlineClose className="h-5 lg:h-6 w-5 lg:w-6" />
        ) : (
          <AiOutlineMenu className="h-5 lg:h-6 w-5 lg:w-6" />
        )}
      </button>
      <Link href="/">
        <h1 className="text-2xl lg:text-3xl font-medium text-slate-600">
          BLOG
        </h1>
      </Link>
      <Link href="/posts" className="p-2">
        <BsRobot className="h-5 lg:h-6 w-5 lg:w-6" />
      </Link>
    </header>
  )
}

export default Header
