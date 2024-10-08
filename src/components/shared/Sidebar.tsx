'use client'

import Link from 'next/link'
import { AiFillGithub, AiFillHome, AiOutlineClose } from 'react-icons/ai'

import IconButton from '@components/shared/IconButton'
import { useSidebar } from '@components/shared/Providers'
import { useCategories } from '@utils/hooks'
import { cn } from '@utils/style'

const Sidebar: React.FC = () => {
  const { isOpen, setIsOpen } = useSidebar()
  const { data: existingCategories } = useCategories()

  return (
    <div
      className={cn(
        'absolute min-h-screen flex-col p-10 pr-6 gap-6 border-r bg-white text-base z-10 lg:relative',
        isOpen ? 'flex' : 'hidden',
      )}
    >
      <div className="flex justify-end lg:hidden">
        <IconButton
          Icon={AiOutlineClose}
          label="sidebarClose"
          onClick={() => setIsOpen(false)}
        />
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
      {existingCategories?.map((category) => (
        <Link
          key={category}
          href={`/categories/${category}`}
          className="w-48 font-medium text-gray-600 hover:underline"
        >
          {category}
        </Link>
      ))}
      <div className="mt-10 flex items-center gap-4">
        <IconButton
          Icon={AiFillHome}
          label="blogLink"
          component={Link}
          href={process.env.NEXT_PUBLIC_BLOG_URL as string}
          target="_blank"
        />
        <IconButton
          Icon={AiFillGithub}
          label="githubLink"
          component={Link}
          href={process.env.NEXT_PUBLIC_GITHUB_URL as string}
          target="_blank"
        />
        <img
          src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fmy-blog-chat.vercel.app&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=%EB%B0%A9%EB%AC%B8%EC%9E%90&edge_flat=false"
          alt="visit"
          width={100}
          height={20}
        />
      </div>
    </div>
  )
}

export default Sidebar
