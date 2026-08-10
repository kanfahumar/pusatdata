import { createClient } from '@/lib/supabase/server'
import DataCenterClient from './DataCenterClient'

export default async function DataCenterPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('bidang')
    .select(`
      id, nama_bidang, deskripsi,
      tim_kerja (
        id, nama_tim,
        arsip_tahunan ( id, tahun, arsip_folder ( id, nama, link, urutan ) )
      ),
      arsip_tahunan ( id, tahun, arsip_folder ( id, nama, link, urutan ) )
    `)
    .order('nama_bidang')

  if (error) {
    return (
      <div className="text-center py-16 bg-white border border-dashed border-red-300 rounded-xl">
        <p className="text-red-600 text-sm font-medium">Gagal memuat data direktori.</p>
        <p className="text-gray-400 text-xs mt-1">{error.message}</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Direktori Bidang</h2>
        <p className="text-gray-500 text-sm">Klik pada salah satu bidang untuk menjelajahi arsip.</p>
      </div>
      <DataCenterClient direktoriDinas={data || []} />
    </>
  )
}
