import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/components/SignOutButton'

export default async function ProtectedLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('nama, jabatan, role')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white shadow-md py-5 px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <img
              src="/logo-96h.webp"
              alt="Logo DPMPTSP Kabupaten Gunungkidul"
              width={348}
              height={96}
              className="h-10 w-auto shrink-0"
            />
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold tracking-wide truncate">
                Data Center &amp; Monitoring Bidang
              </h1>
              <p className="text-blue-200 text-sm mt-0.5">DPMPTSP Kabupaten Gunungkidul</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:block text-sm text-blue-100 text-right">
              {profile?.nama || user.email}
              {profile?.jabatan && <span className="block text-xs text-blue-300">{profile.jabatan}</span>}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 flex gap-1">
          <Link
            href="/data-center"
            className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-800 transition"
          >
            Data Center
          </Link>
          <Link
            href="/cuti"
            className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-800 border-b-2 border-transparent hover:border-blue-800 transition"
          >
            Ajukan Cuti
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">{children}</main>

      <footer className="text-center py-8 text-gray-400 text-xs mt-12 border-t border-gray-200">
        &copy; {new Date().getFullYear()} DPMPTSP Kabupaten Gunungkidul. Internal Monitoring System.
      </footer>
    </div>
  )
}
