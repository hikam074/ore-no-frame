# SisiFrame

## Deskripsi
SisiFrame adalah sebuah aplikasi web berbasis Next.js yang menyediakan platform informasi dan konten seputar Anime dan Manga. Aplikasi ini dilengkapi dengan sistem autentikasi pengguna, dashboard personal, serta fitur manajemen dan pembuatan artikel interaktif (Rich Text Editor). 

## Fitur Utama
* **Sistem Autentikasi**: Terintegrasi dengan Supabase untuk manajemen login dan sesi pengguna.
* **Eksplorasi Konten Publik**: Halaman khusus untuk menjelajahi direktori `/anime` dan `/manga`.
* **Pencarian Interaktif**: Fitur pencarian konten yang dapat diakses publik.
* **Dashboard Pengguna**: Halaman terproteksi bagi pengguna untuk mengelola profil dan melihat daftar artikel mereka.
* **Manajemen Artikel**: Fitur *Create* dan *Edit* artikel lengkap dengan integrasi editor teks (Tiptap Editor).
* **Pemisahan Akses (Routing)**: Menggunakan struktur `(public)` dan `(protected)` untuk mengamankan rute aplikasi.

## Tech Stack
* **Framework:** Next.js (v16.1.4)
* **Bahasa:** TypeScript
* **Styling:** Tailwind CSS & Framer Motion
* **State Management:** React
* **Backend / BaaS:** Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
* **Rich Text Editor:** Tiptap

## Struktur Direktori Utama
Berikut adalah gambaran ringkas mengenai struktur direktori proyek ini:

```text
├── public/                 # Aset statis (gambar, ikon SVG, dll)
├── src/
│   ├── app/                # App Router Next.js
│   │   ├── (protected)/    # Rute yang memerlukan autentikasi (dashboard, create-artikel, dll)
│   │   └── (public)/       # Rute yang bisa diakses publik (anime, manga, login, search)
│   ├── components/         # Komponen UI yang dapat digunakan kembali (navbar, footer, auth, editor)
│   ├── hooks/              # Custom React Hooks (useArtikelSubmit, useTags, dll)
│   ├── lib/                # Konfigurasi library pihak ketiga (Supabase client/server, API fetcher)
│   ├── services/           # Modul untuk memanggil API endpoint
│   ├── types/              # Definisi tipe dan antarmuka TypeScript (enums, modules)
│   └── utils/              # Fungsi helper dan utilitas (format tanggal, sanitize, dll)
├── .env.example            # Template environment variables
├── package.json            # Daftar dependensi dan scripts proyek
└── tailwind.config.ts      # Konfigurasi Tailwind CSS
```

## Instalasi

Pastikan Anda sudah menginstal Node.js di sistem Anda. Clone repositori ini, lalu jalankan perintah berikut untuk menginstal semua dependensi:

```text
npm install
# atau
yarn install
# atau
pnpm install
```

## Setup Environment

Buat file .env.local atau .env di root direktori proyek Anda (sejajar dengan package.json), lalu salin dan isi variabel berikut berdasarkan file .env.example:

```text
NEXT_PUBLIC_FRONTEND_URL=http://localhost:2000
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

(Catatan: Sesuaikan URL dan Key Supabase dengan kredensial dari dashboard Supabase Anda).

## Cara Menjalankan

Untuk menjalankan proyek di lingkungan development, gunakan script berikut:

```text
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Server pengembangan akan berjalan secara default di port 2000 (berdasarkan konfigurasi script next dev -p 2000 di package.json). Buka http://localhost:2000 di browser Anda untuk melihat hasilnya.

Untuk membangun aplikasi untuk production:

```text
npm run build
npm run start
```