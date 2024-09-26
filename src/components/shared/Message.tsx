import { BsFillPersonFill, BsRobot } from 'react-icons/bs'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import PostCard, { PostCardProps } from '@components/shared/PostCard'
import { cn } from '@utils/style'

export type MessageProps = {
  role: 'user' | 'assistant'
  content: string
  posts?: Omit<PostCardProps, 'className'>[]
}

const Message: React.FC<MessageProps> = ({ role, content, posts }) => {
  return (
    <div
      className={cn('p-4 lg:p-6', role === 'user' ? 'bg-white' : 'bg-gray-100')}
      data-cy={`message-${role}`}
    >
      <div className="flex items-start container mx-auto gap-3 lg:gap-4">
        {role === 'user' ? (
          <BsFillPersonFill className="w-6 h-6 shrink-0" />
        ) : (
          <BsRobot className="w-6 h-6 shrink-0" />
        )}
        <div className="flex flex-col items-start">
          <ReactMarkdown
            className="whitespace-pre-wrap"
            remarkPlugins={[remarkGfm]}
          >
            {content}
          </ReactMarkdown>
          {posts && posts.length > 0 && (
            <div className="flex justify-start mt-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  className="w-[300px] border"
                  {...post}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
