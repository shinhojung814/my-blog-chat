import Link from 'next/link'
import { AiFillGithub, AiFillHome, AiOutlineClose } from 'react-icons/ai'

import IconButton from '@components/IconButton'
import { cn } from '@utils/style'

type SidebarProps = {
  isOpen: boolean
  close: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, close }) => {
  return (
    <div
      className={cn(
        'absolute min-h-screen flex-col p-10 pr-6 gap-6 border-r bg-white text-base z-10 lg:relative',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      <div className="flex justify-end lg:hidden">
        <IconButton Icon={AiOutlineClose} onClick={close} />
      </div>
      <Link href="/" className="w-48 font-medium text-gray-600 hover:underline">
        홈
      </Link>
      <Link
        href="/tags"
        className="w-48 font-medium text-gray-600 hover:underline"
      >
        태그
      </Link>
      <Link
        href="/category"
        className="w-48 font-medium text-gray-600 hover:underline"
      >
        카테고리
      </Link>
      <div className="mt-10 flex items-center gap-4">
        <IconButton
          Icon={AiFillHome}
          component={Link}
          href={process.env.NEXT_PUBLIC_BLOG_URL as string}
          target="_blank"
        />
        <IconButton
          Icon={AiFillGithub}
          component={Link}
          href={process.env.NEXT_PUBLIC_GITHUB_URL as string}
          target="_blank"
        />
      </div>
    </div>
  )
}

export default Sidebar
