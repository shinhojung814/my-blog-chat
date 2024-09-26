'use client'

import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

import Button from '@components/shared/Button'
import { createClient } from '@utils/supabase/client'

type DashboardProps = {
  user: User
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const router = useRouter()
  const supabase = createClient()

  return (
    <div className="flex flex-col items-center mb-20 gap-4">
      <div className="mb-4 text-center">
        <b>{user.email}</b> 로그인하였습니다.
      </div>
      <Button
        type="button"
        className="w-1/2"
        onClick={() => router.push('/write')}
      >
        포스트 작성하기
      </Button>
      <Button
        type="button"
        className="w-1/2"
        onClick={() => {
          fetch('/api/posts', {
            method: 'DELETE',
          })
        }}
      >
        테스트 데이터 삭제
      </Button>
      <Button
        type="button"
        className="w-1/2"
        onClick={() => {
          supabase.auth.signOut()
          router.push('/')
        }}
      >
        로그아웃
      </Button>
    </div>
  )
}

export default Dashboard
