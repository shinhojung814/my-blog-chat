import Link from 'next/link'
import { AiOutlineSetting } from 'react-icons/ai'
import { BsPencilSquare } from 'react-icons/bs'

import IconButton from '@components/IconButton'

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between border-t p-4 font-medium">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="pr-1 text-sm lg:pr-2 lg:text-base">ABOUT ME</div>
        <div className="text-xs text-gray-500 lg:text-sm">
          프론트엔드 개발자 정신호
        </div>
      </div>
      <div className="flex items-center">
        <div className="pr-1 text-sm lg:pr-2 lg:text-base">ADMIN</div>
        <IconButton
          Icon={AiOutlineSetting}
          className="text-gray-500 hover:text-gray-600"
          component={Link}
          href="/admin"
        />
        <IconButton
          Icon={BsPencilSquare}
          className="text-gray-500 hover:text-gray-600"
          component={Link}
          href="/write"
        />
      </div>
    </footer>
  )
}

export default Footer
