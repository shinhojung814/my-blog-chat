import { cookies } from 'next/headers'

import Dashboard from '@components/Admin/Dashboard'
import LoginForm from '@components/Admin/LoginForm'
import { createClient } from '@utils/supabase/server'

export default async function AdminPage() {
  const supabase = createClient(cookies())
  const userResponse = await supabase.auth.getUser()

  return (
    <div className="flex flex-col justify-center container min-h-full">
      {!!userResponse?.data.user ? (
        <Dashboard user={userResponse.data.user} />
      ) : (
        <LoginForm />
      )}
    </div>
  )
}
