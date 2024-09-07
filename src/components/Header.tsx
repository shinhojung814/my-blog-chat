import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BsRobot } from 'react-icons/bs'

import IconButton from '@components/IconButton'

type HeaderProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isOpen: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="flex justify-between items-center h-14 lg:h-16 border-b px-4 lg:px-6">
      <IconButton
        Icon={isSidebarOpen ? AiOutlineClose : AiOutlineMenu}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Link href="/">
        <h1 className="text-2xl lg:text-3xl font-medium text-slate-600">
          BLOG
        </h1>
      </Link>
      <IconButton Icon={BsRobot} component={Link} href="/posts" />
    </header>
  )
}

export default Header
