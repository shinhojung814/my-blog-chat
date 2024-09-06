import Link from 'next/link'
import { AiOutlineSetting } from 'react-icons/ai'
import { BsPencilSquare } from 'react-icons/bs'

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-between border-t p-4 font-medium">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="pr-1 lg:pr-2 text-sm lg:text-base">ABOUT ME</div>
        <div className="text-xs lg:text-sm text-gray-500">
          프론트엔드 개발자 정신호
        </div>
      </div>
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="pr-1 lg:pr-2 text-sm lg:text-base">ADMIN</div>
        <Link href="/admin">
          <AiOutlineSetting className="h-4 lg:h-5 w-4 lg:w-5 text-gray-500 transition-all hover:text-gray-600" />
        </Link>
        <Link href="/write">
          <BsPencilSquare className="h-4 lg:h-5 w-4 lg:w-5 text-gray-500 transition-all hover:text-gray-600" />
        </Link>
      </div>
    </footer>
  )
}

export default Footer
