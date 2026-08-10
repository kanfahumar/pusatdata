'use client'

import { useState } from 'react'

function Chevron({ open }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function IconFolder() {
  return (
    <svg className="w-5 h-5 shrink-0 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h3.5l1.5 2H19a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  )
}

function IconTeam() {
  return (
    <svg className="w-4 h-4 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-1.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 10-2-7.46" />
    </svg>
  )
}

function IconDoc() {
  return (
    <svg className="w-4 h-4 shrink-0 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

function Accordion({ open, children }) {
  return (
    <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}

function TahunBlock({ tahunList }) {
  const [openId, setOpenId] = useState(null)
  const sorted = [...(tahunList || [])].sort((a, b) => String(b.tahun).localeCompare(String(a.tahun)))

  return (
    <>
      {sorted.map((t) => {
        const isOpen = openId === t.id
        const folders = [...(t.arsip_folder || [])].sort((a, b) => (a.urutan || 0) - (b.urutan || 0))
        return (
          <div key={t.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mt-2">
            <button
              onClick={() => setOpenId(isOpen ? null : t.id)}
              className="w-full flex justify-between items-center gap-3 p-3 px-4 text-left font-semibold text-gray-700 hover:bg-amber-50 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400"
            >
              <span className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Tahun {t.tahun}
              </span>
              <span className="flex items-center gap-2 text-gray-400 text-xs">
                Lihat arsip
                <Chevron open={isOpen} />
              </span>
            </button>
            <Accordion open={isOpen}>
              <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {folders.map((sub) => (
                    <a
                      key={sub.id}
                      href={sub.link}
                      target="_blank"
                      rel="noopener"
                      className="flex items-center gap-2 bg-white hover:bg-amber-500 hover:text-white hover:border-amber-500 border border-gray-200 p-2.5 rounded-lg text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <IconDoc />
                      <span className="truncate">{sub.nama}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Accordion>
          </div>
        )
      })}
    </>
  )
}

function TimBlock({ timList }) {
  const [openId, setOpenId] = useState(null)

  return (
    <>
      {(timList || []).map((tim) => {
        const isOpen = openId === tim.id
        return (
          <div key={tim.id} className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden shadow-sm mt-3">
            <button
              onClick={() => setOpenId(isOpen ? null : tim.id)}
              className="w-full flex justify-between items-center p-3 px-4 text-left font-semibold text-indigo-800 hover:bg-indigo-50 transition border-b border-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-400"
            >
              <span className="flex items-center gap-2">
                <IconTeam />
                {tim.nama_tim}
              </span>
              <Chevron open={isOpen} />
            </button>
            <Accordion open={isOpen}>
              <div className="p-3 bg-white space-y-2">
                <TahunBlock tahunList={tim.arsip_tahunan} />
              </div>
            </Accordion>
          </div>
        )
      })}
    </>
  )
}

function BidangCard({ bidang }) {
  const [open, setOpen] = useState(false)
  const hasTim = bidang.tim_kerja && bidang.tim_kerja.length > 0

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition hover:shadow-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-4 p-5 text-left hover:bg-blue-50/40 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400"
      >
        <div className="flex items-start gap-3 min-w-0">
          <span className="mt-0.5">
            <IconFolder />
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-lg text-gray-800 truncate">{bidang.nama_bidang}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{bidang.deskripsi}</p>
          </div>
        </div>
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 shrink-0">
          <Chevron open={open} />
        </span>
      </button>
      <Accordion open={open}>
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {hasTim ? <TimBlock timList={bidang.tim_kerja} /> : <TahunBlock tahunList={bidang.arsip_tahunan} />}
        </div>
      </Accordion>
    </div>
  )
}

export default function DataCenterClient({ direktoriDinas }) {
  if (!direktoriDinas || direktoriDinas.length === 0) {
    return (
      <div className="text-center py-16 bg-white border border-dashed border-gray-300 rounded-xl">
        <p className="text-gray-500 text-sm font-medium">Data direktori belum tersedia</p>
        <p className="text-gray-400 text-xs mt-1">Hubungi admin untuk menambahkan data bidang.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {direktoriDinas.map((bidang) => (
        <BidangCard key={bidang.id} bidang={bidang} />
      ))}
    </div>
  )
}
