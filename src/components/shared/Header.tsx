'use client'

import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { BsRobot } from 'react-icons/bs'

import IconButton from '@components/shared/IconButton'
import { useSidebar } from '@components/shared/Providers'

const Header: React.FC = () => {
  const { isOpen, setIsOpen } = useSidebar()

  return (
    <header className="flex h-14 items-center justify-between border-b px-4 lg:h-16 lg:px-6">
      <IconButton
        Icon={isOpen ? AiOutlineClose : AiOutlineMenu}
        label="sidebarToggle"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Link href="/">
        <h1 className="text-2xl font-medium text-slate-600 lg:text-3xl">
          BLOG
        </h1>
      </Link>
      <IconButton
        Icon={BsRobot}
        label="searchLink"
        component={Link}
        href="/search"
      />
    </header>
  )
}

export default Header
