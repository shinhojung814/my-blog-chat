'use client'

import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import Button from '@components/shared/Button'
import Input from '@components/shared/Input'
import { createClient } from '@utils/supabase/client'

const LoginForm: React.FC = () => {
  const router = useRouter()
  const supabase = createClient()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

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

  return (
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
  )
}

export default LoginForm
