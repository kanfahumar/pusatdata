const dataFolderDinas = [
    {
        namaBidang: "Penanaman Modal (PM)",
        deskripsi: "Arsip kegiatan, SPJ, data, dan keuangan.",
        folderUtama: "LINK_GDRIVE_UTAMA_PM",
        tahunan: [
            {
                tahun: "2026",
                subFolder: [
                    { nama: "Dokumentasi", link: "LINK_GDRIVE_DOKUMENTASI_2026" },
                    { nama: "SPJ", link: "LINK_GDRIVE_SPJ_2026" },
                    { nama: "Data", link: "LINK_GDRIVE_DATA_2026" },
                    { nama: "Keuangan", link: "LINK_GDRIVE_KEUANGAN_2026" }
                ]
            },
            {
                tahun: "2025",
                subFolder: [
                    { nama: "Dokumentasi", link: "LINK_GDRIVE_DOKUMENTASI_2025" },
                    { nama: "SPJ", link: "LINK_GDRIVE_SPJ_2025" }
                ]
            }
            // Nanti jika ingin tambah tahun 2027, cukup copy-paste blok tahun di atas ke sini dengan sangat mudah!
        ]
    },
    {
        namaBidang: "Perencanaan & Keuangan",
        deskripsi: "Pusat data anggaran dan perencanaan.",
        folderUtama: "LINK_GDRIVE_KEUANGAN",
        tahunan: [] // Bisa diisi dengan pola yang sama jika ada subfolder tahunan
    }
    // Bidang lain (Umum, PTSP 1, PTSP 2) tinggal ditambahkan di sini
];
