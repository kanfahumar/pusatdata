# Data Center & Monitoring Bidang — DPMPTSP Gunungkidul

Fase 1: autentikasi Supabase + halaman Data Center yang sudah dilindungi login.

## 1. Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, jalankan isi file `supabase_migration.sql` (dari diskusi sebelumnya) dari atas sampai bawah.
3. Buka **Authentication > Users**, klik **Invite user** untuk tiap pegawai. Baris di tabel `profiles` akan otomatis terbuat lewat trigger.
4. Buka tabel `profiles` di **Table Editor**, lengkapi `nama`, `nip`, `jabatan`, `bidang_id`, dan `role` (`pegawai` / `approver` / `superuser`) untuk tiap akun.
5. Untuk tiap bidang yang punya kabid, isi `bidang.default_approver_id` dengan `id` (uuid) dari profil kabid tersebut.
6. Buka **Project Settings > API**, salin `Project URL` dan `anon public key`.

## 2. Jalankan lokal

```bash
npm install
cp .env.example .env.local
# isi .env.local dengan URL dan anon key dari Supabase
npm run dev
```

Buka `http://localhost:3000` — otomatis redirect ke `/login`.

## 3. Push ke GitHub

```bash
git init
git add .
git commit -m "Setup awal: auth Supabase + Data Center"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA_REPO.git
git push -u origin main
```

## 4. Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com), **Add New Project**, pilih repo GitHub ini.
2. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Klik **Deploy**.

Setiap kali push ke `main`, Vercel otomatis build ulang.

## Struktur folder penting

```
app/
  login/page.jsx              -> halaman login
  (protected)/layout.jsx      -> header, nav, proteksi sesi (shell setelah login)
  (protected)/data-center/    -> halaman Data Center (fetch dari Supabase)
  (protected)/cuti/           -> stub Ajukan Cuti (dikembangkan di Fase 3)
lib/supabase/
  client.js                   -> Supabase client sisi browser
  server.js                   -> Supabase client sisi server (Server Component)
  middleware.js                -> logic cek sesi & redirect
middleware.js                 -> entry point middleware Next.js
```

## Catatan keamanan

- Tidak ada pendaftaran akun publik — semua akun dibuat admin lewat Supabase Dashboard.
- Proteksi berlapis: middleware Next.js mengecek sesi di setiap request, dan Row Level Security (RLS) di database menolak query dari user yang tidak berhak, bahkan jika ada celah di frontend.
- Link Google Drive di data arsip masih diakses langsung begitu pegawai login — pastikan pengaturan share link di Google Drive juga sudah dibatasi (idealnya "Restricted" + akun instansi), bukan hanya mengandalkan lapisan login di aplikasi ini.
