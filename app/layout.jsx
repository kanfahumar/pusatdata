import './globals.css'

export const metadata = {
  title: 'Data Center & Monitoring - DPMPTSP Gunungkidul',
  description: 'Sistem monitoring internal DPMPTSP Kabupaten Gunungkidul',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="font-sans text-gray-800 bg-gray-50">{children}</body>
    </html>
  )
}
