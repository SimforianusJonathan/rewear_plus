# ReWear Plus 🌿

> **Fashion Berkelanjutan yang Peduli Sesama**  
> Marketplace preloved dengan sistem donasi transparan melalui yayasan terverifikasi.

[![Built with Next.js](https://img.shields.io/badge/Next.js-16.0.10-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 Daftar Isi

- [Tentang ReWear Plus](#-tentang-rewear-plus)
- [Fitur Utama](#-fitur-utama)
- [Teknologi](#-teknologi)
- [Instalasi & Menjalankan](#-instalasi--menjalankan)
- [Akun Demo](#-akun-demo)
- [Struktur Project](#-struktur-project)
- [Panduan Demo untuk Juri](#-panduan-demo-untuk-juri)
- [Screenshots](#-screenshots)

---

## 🌟 Tentang ReWear Plus

ReWear Plus adalah platform marketplace fashion berkelanjutan yang menggabungkan jual-beli pakaian preloved dengan sistem donasi yang transparan. 

### Masalah yang Diselesaikan:
- 👕 **Pakaian layak pakai menumpuk** di lemari tanpa digunakan
- 🌍 **Fast fashion merusak lingkungan** dengan limbah tekstil berlebihan
- 🤝 **Donasi tradisional kurang transparan**, tidak tahu kemana pakaian disalurkan

### Solusi ReWear Plus:
- ✅ **3 Mode Kontribusi dalam 1 Platform**: ReWear (jual-beli), DoWear (donasi langsung), DoWear+ (donasi untuk dijual)
- ✅ **Otomatis Ber-dampak**: 7% dari setiap transaksi otomatis masuk donation fund
- ✅ **100% Transparan**: Semua donasi melalui yayasan terverifikasi dengan nomor registrasi AHU
- ✅ **Laporan Lengkap**: Tracking distribusi dengan foto bukti, lokasi penerima, dan jumlah items

---

## 🎯 Fitur Utama

### 1. **Tiga Mode Kontribusi**

#### 🔵 ReWear (Belanja Preloved)
- Marketplace jual-beli pakaian preloved berkualitas
- **7% otomatis didonasikan** dari setiap transaksi
- Kurasi admin untuk quality control
- Filter berdasarkan kategori, ukuran, harga, kondisi

#### 🟢 DoWear (Donasi Langsung)
- Donasi pakaian **langsung ke penerima manfaat** 
- Pilih campaign spesifik (bencana, pendidikan, orphanage)
- Track status real-time dari pickup hingga distribusi
- Laporan foto bukti penyaluran

#### 🟡 DoWear+ (Donasi Fund)
- Donasi pakaian untuk **dijual platform**
- **100% hasil penjualan** masuk donation fund
- Harga ditetapkan admin (fair & transparan)
- Mendukung banyak campaign sekaligus

### 2. **Role-Based Access Control**

#### 👤 Buyer
- Belanja produk preloved
- Wishlist & cart management
- Histori pembelian
- Tracking kontribusi donasi

#### 🏪 Seller  
- Upload item untuk dijual (ReWear)
- Upload item untuk donasi (DoWear/DoWear+)
- Track approval status
- Lihat histori penjualan & donasi

#### 🛡️ Admin
- Review & approve/reject listings
- Set harga untuk DoWear+ items
- Manage donation campaigns
- Dashboard analytics

### 3. **Transparansi Donasi 100%**

- ✅ **3 Yayasan Mitra Terverifikasi**
  - Yayasan Peduli Bencana Indonesia
  - Yayasan Pendidikan Harapan
  - Rumah Yatim Indonesia

- ✅ **Info Lengkap Yayasan**
  - Nomor registrasi AHU (resmi)
  - Alamat lengkap
  - Kontak: telepon, email, website
  - Statistik: program aktif & total penerima

- ✅ **Detail Penerima Manfaat**
  - Nama lokasi spesifik (desa/sekolah/panti)
  - Jumlah penerima manfaat
  - Kategori (disaster-victims, students, orphanage)

- ✅ **Laporan Distribusi**
  - Tanggal distribusi
  - Jumlah items yang disalurkan
  - Nilai donasi yang digunakan
  - Foto bukti penyaluran
  - Deskripsi lengkap kegiatan

### 4. **User Interface & Experience**

- 🎨 Modern design dengan shadcn/ui components
- 📱 Responsive untuk mobile, tablet, desktop
- 🌙 Theme customization (rewear/dowear/dowear-plus modes)
- ⚡ Fast navigation dengan Next.js App Router
- 🔍 Advanced filtering & search
- 📊 Impact tracking dashboard

---

## 🛠️ Teknologi

### Framework & Library
- **Next.js 16.0.10** - React framework dengan App Router & Turbopack
- **TypeScript** - Static typing untuk code quality
- **React 19** - UI library

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide Icons** - Icon library
- **oklch** - Modern color space

### State Management & Storage
- **LocalStorage** - Demo data persistence
- **Custom Hooks** - useDemoUser, useCart, useChat

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 🚀 Instalasi & Menjalankan

### Prerequisites
- Node.js 18+ 
- pnpm (atau npm/yarn)

### 1. Clone Repository
```bash
git clone <repository-url>
cd rewear_plus
```

### 2. Install Dependencies
```bash
pnpm install
# atau
npm install
```

### 3. Jalankan Development Server
```bash
pnpm dev
# atau
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:3000**

⚠️ **Jika port 3000 sudah digunakan:**
```bash
pnpm dev -p 3001
# atau port lain
```

### 4. Build untuk Production
```bash
pnpm build
pnpm start
```

---

## 👥 Akun Demo

Untuk keperluan evaluasi, kami menyediakan **3 akun demo** dengan role berbeda:

### 🔵 Demo Buyer
- **Nama**: Anisa Rahmawati
- **Email**: anisa@email.com
- **Akses**: 
  - Belanja produk preloved
  - Lihat histori pembelian
  - Track kontribusi donasi
  - Wishlist & cart

### 🟢 Demo Seller
- **Nama**: Budi Santoso
- **Email**: budi@email.com
- **Akses**:
  - Upload item untuk dijual (ReWear)
  - Upload item untuk donasi (DoWear/DoWear+)
  - Track approval status
  - Lihat histori penjualan

### 🔴 Demo Admin
- **Nama**: Rina Pratama
- **Email**: admin@rewear.com
- **Akses**:
  - Review & approve/reject listings
  - Set harga DoWear+ items
  - Manage donation campaigns
  - Dashboard admin (tidak terlihat untuk buyer/seller)

### Cara Login Demo:
1. Buka halaman `/auth`
2. Klik salah satu tombol "Login sebagai [Role]"
3. Otomatis login dan redirect ke homepage

### Switch Role:
Gunakan **Demo User Banner** di bagian atas halaman untuk switch antar role tanpa logout:
- Klik tombol **Buyer**, **Seller**, atau **Admin**
- Data demo bisa di-reset dengan tombol **Reset**

---

## 📁 Struktur Project

```
rewear_plus/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 🏠 Homepage (landing page)
│   ├── auth/page.tsx             # 🔐 Login/Demo accounts
│   ├── listings/page.tsx         # 🛍️ Browse produk preloved
│   ├── listing/[id]/page.tsx     # 📦 Detail produk
│   ├── donate/page.tsx           # ❤️ Donation hub
│   ├── events/[id]/page.tsx      # 🎯 Detail campaign
│   ├── profile/page.tsx          # 👤 User profile & history
│   ├── sell/page.tsx             # 📤 Upload item (sell/donate)
│   ├── admin/page.tsx            # 🛡️ Admin dashboard
│   ├── cart/page.tsx             # 🛒 Shopping cart
│   ├── faq/page.tsx              # ❓ FAQ & panduan
│   ├── calendar/page.tsx         # 📅 Event calendar
│   ├── chat/page.tsx             # 💬 Chat support
│   ├── certificate/page.tsx      # 🏆 Donation certificate
│   ├── layout.tsx                # Layout root
│   └── globals.css               # Global styles
│
├── components/                   # React Components
│   ├── navbar.tsx                # Navigation bar
│   ├── demo-user-banner.tsx      # Demo mode switcher
│   ├── quick-start-guide.tsx     # Role-based panduan
│   ├── product-card.tsx          # Card produk
│   ├── event-card.tsx            # Card campaign
│   ├── donation-fund-widget.tsx  # Widget dana komunitas
│   ├── review-section.tsx        # Review & rating
│   ├── wishlist-button.tsx       # Tombol wishlist
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       └── ... (30+ components)
│
├── hooks/                        # Custom React Hooks
│   ├── use-demo-user.ts          # Demo user management
│   ├── use-cart.ts               # Shopping cart logic
│   ├── use-chat.ts               # Chat functionality
│   └── use-toast.ts              # Toast notifications
│
├── lib/                          # Utilities & Data
│   ├── mock-data.ts              # 📊 Mock data (products, events, foundations)
│   ├── storage.ts                # 💾 LocalStorage helpers
│   ├── types.ts                  # TypeScript interfaces
│   └── utils.ts                  # Utility functions
│
├── public/                       # Static assets
│   └── rewear-logo.png
│
├── README.md                     # 📖 Dokumentasi (file ini)
├── package.json                  # Dependencies
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript config
└── next.config.mjs               # Next.js config
```

---

## 🎬 Panduan Demo untuk Juri

### Skenario Demo (7-10 menit)

#### **Menit 1-2: Value Proposition**
1. Buka homepage `localhost:3000`
2. Scroll hero section:
   - Tunjukkan **Problem Statement** (pakaian menumpuk, fast fashion, donasi kurang transparan)
   - Tunjukkan **Solusi** (3 mode, otomatis 7%, transparan 100%)
3. Scroll ke **"Kenapa Pilih ReWear Plus"**:
   - Otomatis Berdampak
   - 100% Transparan
   - 3 Mode Kontribusi
   - Kurasi Berkualitas
4. Scroll ke **"Cara Kerja"** (3 langkah sederhana)

#### **Menit 3-4: Demo Buyer Flow**
1. Klik **"Daftar Sekarang"** atau langsung ke `/auth`
2. Klik **"Login sebagai Buyer"** (Anisa)
3. Perhatikan **Demo User Banner** muncul di atas
4. Lihat **Quick Start Guide** di sidebar (panduan 3 langkah)
5. Klik **"Lihat Listings"** atau menu **Listings**
6. Filter produk (contoh: filter by "Batik" atau price range)
7. Klik salah satu produk → Detail page
8. Klik **"Add to Cart"**
9. Klik icon cart (navbar) → **Checkout**
10. Tunjukkan: **"7% dari transaksi akan didonasikan: Rp X"**

#### **Menit 5-6: Demo Seller Flow**
1. **Switch role** di Demo Banner: klik **"Seller"**
2. Notice menu **"Sell/Donate"** sekarang terlihat
3. Klik **"Sell/Donate"** 
4. Pilih **"DoWear+"** (untuk donasi fund)
5. Isi form:
   - Upload foto (simulasi)
   - Pilih kategori, ukuran, kondisi
   - Tidak perlu set harga (admin yang set)
6. Klik **"Submit for Review"**
7. Ke **Profile** → tab **"Donations"**
8. Tunjukkan status **"Pending Approval"**

#### **Menit 7-8: Demo Admin Flow**
1. **Switch role** di Demo Banner: klik **"Admin"**
2. Notice menu **"Admin"** sekarang terlihat (buyer/seller tidak bisa lihat)
3. Klik menu **"Admin"**
4. Tunjukkan **dashboard** dengan:
   - Pending Listings (item yang perlu review)
   - Pending Events
5. Klik **"View Details"** pada salah satu pending item
6. Review foto & detail
7. Klik **"Approve"** atau **"Reject"** dengan reason
8. Kembali ke dashboard, item hilang dari pending

#### **Menit 9: Transparansi Donasi**
1. Klik menu **"Donate"**
2. Scroll ke section **"Yayasan Mitra Terpercaya"**
3. Tunjukkan 3 yayasan dengan badge **"Verified"**
4. Klik salah satu event/campaign (misalnya "Flood Relief")
5. Tunjukkan section **"Disalurkan Melalui Yayasan Terpercaya"**:
   - Nama yayasan + badge verified
   - **Nomor Registrasi AHU** (resmi)
   - Alamat lengkap
   - Kontak (telepon, email, website)
   - Statistik: program aktif, total penerima
6. Scroll ke **"Penerima Donasi"**:
   - Nama lokasi spesifik (Desa Sukamaju, Purwakarta)
   - Jumlah penerima (120 orang)
7. Jika ada **"Laporan Penyaluran"** (untuk event completed):
   - Tanggal distribusi
   - Jumlah items tersalurkan
   - Foto bukti (placeholder)
   - Nilai donasi digunakan

#### **Menit 10: FAQ & Closing**
1. Klik menu **"FAQ"**
2. Tunjukkan 4 sections:
   - Akun & Role
   - Belanja & Listing
   - Donasi (DoWear/DoWear+)
   - Profile & Dampak
3. Expand 1-2 pertanyaan
4. **Closing statement**:
   > "ReWear Plus menggabungkan marketplace preloved dengan dampak sosial terukur. Setiap transaksi otomatis menyisihkan 7% untuk donasi, dan user bisa tracking kemana donasi tersalur melalui yayasan terverifikasi dengan laporan lengkap. Ada 3 cara berkontribusi dalam 1 platform: belanja (ReWear), donasi langsung (DoWear), atau donasi untuk dijual (DoWear+). Semua fitur sudah functional dan bisa dicoba dengan 3 demo accounts."

---

### ✅ Testing Checklist

Sebelum demo, pastikan:

**Functionality:**
- [ ] Build successful (`pnpm build`)
- [ ] Dev server running (`pnpm dev`)
- [ ] All pages accessible (no 404)
- [ ] Demo banner switch role works
- [ ] Cart add/remove works
- [ ] Profile shows correct data per role
- [ ] Admin menu only visible for admin
- [ ] FAQ collapsible works

**Data:**
- [ ] Products visible di listings
- [ ] Events visible di donate page
- [ ] Foundations info complete
- [ ] Distribution reports on completed events
- [ ] Impact logs showing verified badge

**UI:**
- [ ] Tombol "Pelajari Lebih Lanjut" terlihat jelas (putih dengan border)
- [ ] Demo banner responsive
- [ ] Quick Start Guide visible di homepage
- [ ] Mobile responsive (test di 375px width)

---

## 📸 Screenshots

### Homepage
![Homepage Hero](docs/screenshots/home-hero.png)
*Value proposition dengan problem-solution statement*

### Demo Accounts
![Demo Auth](docs/screenshots/demo-auth.png)
*3 demo accounts untuk evaluasi fitur*

### Donation Transparency
![Foundation Details](docs/screenshots/foundation-transparency.png)
*Detail yayasan terverifikasi dengan nomor registrasi AHU*

### Admin Dashboard
![Admin Dashboard](docs/screenshots/admin-dashboard.png)
*Review & approve/reject listings*

---

## 🐛 Troubleshooting

### Port 3000 sudah digunakan
```bash
# Gunakan port alternatif
pnpm dev -p 3001
```

### Build error - module not found
```bash
# Clear cache dan reinstall
rm -rf node_modules .next
pnpm install
pnpm build
```

### Demo data tidak muncul
```bash
# Reset demo data
# Klik tombol "Reset" di Demo User Banner
# Atau clear browser localStorage dan refresh
```

### TypeScript errors
```bash
# Regenerate types
pnpm build
```

---

## 📝 License

This project is for educational purposes (Final Project - PPL).

---

## 👥 Tim Pengembang

**Universitas Indonesia - Fakultas Ilmu Komputer**  
Mata Kuliah: Proyek Perangkat Lunak (PPL)
Tahun: 2026

---

## 🙏 Acknowledgments

- Next.js & Vercel untuk framework
- shadcn/ui untuk component library
- Lucide untuk icon library
- Tailwind CSS untuk styling system

---

## 📞 Kontak & Support

Untuk pertanyaan atau feedback, silakan hubungi:
- **Repository**: [GitHub URL]
- **Demo**: http://localhost:3000
- **Documentation**: README.md (file ini)

---

**Built with ❤️ for sustainable fashion and social impact**

🌿 **Wear Again, Care Again** 🌿
```
