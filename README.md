[README.md](https://github.com/user-attachments/files/25658529/README.md)
# CBT Online PWA 🎓

Progressive Web App (PWA) shell untuk sistem ujian online berbasis Google Apps Script.

## Fitur
- ✅ Installable ke homescreen (Android & iOS)
- ✅ 6 pilihan tema warna (Biru, Hijau, Ungu, Rose, Amber, Cyan)
- ✅ Service Worker (cache aset statis)
- ✅ Indikator status koneksi internet
- ✅ Menyimpan URL GAS di localStorage
- ✅ Redirect otomatis ke Google Apps Script

## Cara Deploy ke GitHub Pages

1. Fork / clone repo ini
2. Buka **Settings** → **Pages**
3. Set Source: `Deploy from a branch` → `main` → `/ (root)`
4. Tunggu beberapa menit, GitHub Pages akan aktif
5. URL GitHub Pages Anda: `https://USERNAME.github.io/REPO-NAME/`

## Cara Pakai

1. Buka URL GitHub Pages di browser HP
2. Tempel URL Google Apps Script Anda
3. Pilih tema warna favorit
4. Klik **Simpan URL**
5. Klik **Mulai CBT**
6. Saat muncul banner "Install ke Homescreen" → klik untuk install

## Mendapatkan URL Google Apps Script

1. Buka [script.google.com](https://script.google.com)
2. Buka project CBT Anda
3. Klik **Deploy** → **Manage deployments**
4. Copy URL yang tertera

## Struktur File

```
├── index.html        # Halaman utama PWA
├── manifest.json     # PWA manifest
├── sw.js             # Service Worker
├── icons/            # Icon aplikasi (buat manual atau gunakan generator)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## Membuat Icon

Gunakan salah satu tools berikut untuk generate icon dari logo sekolah:
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
- [Favicon.io](https://favicon.io)
- [RealFaviconGenerator](https://realfavicongenerator.net)

Simpan hasilnya di folder `icons/`.

## Catatan

- File HTML ujian (`Index.html`, `Ujian.html`, dll) tetap berada di **Google Apps Script**
- PWA ini hanya berfungsi sebagai **launcher/pintu masuk** ke GAS
- Semua data tetap tersimpan di **Google Spreadsheet**

---
© 2025 CBT Online • Sistem Ujian Online
