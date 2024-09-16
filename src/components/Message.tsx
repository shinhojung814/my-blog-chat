import { BsFillPersonFill, BsRobot } from 'react-icons/bs'

import { cn } from '@utils/style'

export type MessageProps = {
  role: 'user' | 'assistant'
  content: string
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  return (
    <div
      className={cn('p-4 lg:p-6', role === 'user' ? 'bg-white' : 'bg-gray-100')}
    >
      <div className="flex items-start container mx-auto gap-3 lg:gap-4">
        {role === 'user' ? (
          <BsFillPersonFill className="w-6 h-6 shrink-0" />
        ) : (
          <BsRobot className="w-6 h-6 shrink-0" />
        )}
        <div className="flex flex-col items-start">
          <div className="whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    </div>
  )
}

export default Message
