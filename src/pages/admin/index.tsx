import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import Button from '@components/Button'
import Input from '@components/Input'
import { UserResponse } from '@supabase/supabase-js'
import { createClient } from '@utils/supabase/client'

function AdminPage() {
  const router = useRouter()
  const supabase = createClient()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [userResponse, setUserResponse] = useState<UserResponse>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await supabase.auth.signInWithPassword({
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
    })

    if (!response.data.user) {
      return alert('로그인에 실패했습니다.')
    }

    router.refresh()
  }

  useEffect(() => {
    ;(async () => {
      const user = await supabase.auth.getUser()

      setUserResponse(user)
    })()
  }, [])

  return (
    <div className="flex flex-col justify-center container min-h-full">
      {!!userResponse?.data.user ? (
        <div className="flex flex-col items-center mb-20 gap-4">
          <div className="mb-4 text-center">
            <b>{userResponse.data.user.email}</b> 로그인하였습니다.
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
              supabase.auth.signOut()
              router.push('/')
            }}
          >
            로그아웃
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-20 gap-8">
          <h1 className="text-2xl font-medium">로그인</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <Input type="text" placeholder="이메일" ref={emailRef} />
              <Input type="password" placeholder="패스워드" ref={passwordRef} />
            </div>
            <Button type="submit" className="w-full mt-6">
              로그인
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AdminPage
