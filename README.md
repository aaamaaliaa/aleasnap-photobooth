# MatchaBox 🍵 — Online Korean Photobooth

Aesthetic & Cute Korean Online Photobooth with Matcha Green visual identity. Ambil foto secara langsung melalui kamera laptop maupun smartphone, pilih layout foto, gunakan berbagai tema frame yang lucu, tambahkan filter/stiker, dan unduh hasil photo strip dengan QR Code.

---

## 🍵 Fitur Utama & Rencana Tahapan

1. **Tahap 1 — Project Initialization & Setup** ✅ *(Selesai)*
   - Struktur folder rapi, modular, dan terstandardisasi.
   - Setup React 18 + Vite 6 (JavaScript).
   - Palet Matcha Green, Sage, Cream, & typography Google Fonts (`Fredoka` & `Plus Jakarta Sans`).
   - Navbar & Footer responsif.
2. **Tahap 2 — Website Landing Page** ⏳ *(Tahap berikutnya)*
   - Home, About, How It Works, dan Gallery frame photobooth.
3. **Tahap 3 — Photobooth Interface** ⏳
   - Kamera (Webcam/Mobile), live preview, mirror camera, countdown, dan auto snapshot.
4. **Tahap 4 — Frame Collection** ⏳
   - Koleksi frame lucu (Cute, Y2K, Floral, Vintage, Minimalist, dll.) dan fitur Random Frame.
5. **Tahap 5 — Photo Editor & Canvas Processing** ⏳
   - Filter foto, brightness, contrast, stickers, dan rendering photo strip dengan HTML5 Canvas.
6. **Tahap 6 — Cloud Storage & QR Code** ⏳
   - Upload sementara ke Cloudinary dan generate QR Code instan untuk download di smartphone.
7. **Tahap 7 — Testing & Responsive Optimization** ⏳
   - Pengujian end-to-end lintas perangkat.
8. **Tahap 8 — Deployment** ⏳
   - Persiapan Vercel Hobby Plan & CI/CD GitHub.

---

## 🚀 Cara Menjalankan Project Secara Lokal

1. **Pastikan Node.js terinstal** (v18+ direkomendasikan).
2. **Instal dependensi** (jika clone dari repository):
   ```bash
   npm install
   ```
3. **Jalankan local development server**:
   ```bash
   npm run dev
   ```
   Aplikasi akan terbuka otomatis di browser pada `http://localhost:3000`.

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

5. **Preview hasil build**:
   ```bash
   npm run preview
   ```

---

## 📁 Struktur Direktori

```text
PhotoBox/
├── public/
│   ├── favicon.svg             # Favicon kamera matcha cute
│   └── frames/                 # Aset frame photobooth (Tahap 4)
├── src/
│   ├── assets/                 # Aset gambar & stiker
│   ├── components/
│   │   ├── common/             # Navbar, Footer, Button reusable
│   │   ├── home/               # Komponen Landing Page (Tahap 2)
│   │   ├── photobooth/         # Live camera & countdown (Tahap 3)
│   │   ├── gallery/            # Katalog frame (Tahap 4)
│   │   └── editor/             # Canvas editor & filter (Tahap 5)
│   ├── constants/              # Route constants & konfigurasi
│   ├── styles/                 # Theme tokens (variables.css) & global.css
│   ├── utils/                  # Helper fungsi canvas & formatters
│   ├── App.jsx                 # Layout utama & state routing
│   └── main.jsx                # Entry point React
├── index.html                  # HTML template dengan Google Fonts
├── package.json                # Dependensi & skrip Vite
└── vite.config.js              # Konfigurasi Vite
```
