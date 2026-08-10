'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-xs sm:text-sm bg-blue-800 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition shrink-0"
    >
      Keluar
    </button>
  )
}
