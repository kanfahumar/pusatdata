'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email atau kata sandi salah.')
      setLoading(false)
      return
    }

    router.push('/data-center')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo-96h.webp"
            alt="Logo DPMPTSP Kabupaten Gunungkidul"
            width={348}
            height={96}
            className="h-14 w-auto mb-4"
          />
          <h1 className="text-lg font-semibold text-gray-800 text-center">
            Data Center &amp; Monitoring Bidang
          </h1>
          <p className="text-sm text-gray-500 text-center">DPMPTSP Kabupaten Gunungkidul</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="nama@gunungkidulkab.go.id"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kata sandi</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white font-medium text-sm rounded-lg py-2.5 transition"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Akun dibuat oleh admin. Hubungi admin instansi jika belum memiliki akun.
        </p>
      </div>
    </div>
  )
}
