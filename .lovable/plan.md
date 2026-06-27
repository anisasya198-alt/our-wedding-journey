## Revisi Undangan

**Halaman 1 (Cover) — `src/routes/index.tsx`**
- Hapus input nama tamu (overlay nama tamu) — tetap support `?to=` via URL untuk personalisasi di halaman 2.
- Container cover dibatasi aspect-ratio 9:16 (max-height 100vh, centered) supaya tampil seperti tampilan HP meskipun dibuka di desktop.
- Tombol "Buka Undangan": background coklat (#6B4423), teks putih, rounded ~5px, dengan ikon amplop (Lucide `Mail`) putih di samping kiri teks.

**Halaman 2 (Invitation) — `src/routes/invitation.tsx`**
- Wrapper dipaksa lebar desktop (mis. `min-w-[1280px]` atau `width: 1280px` centered + horizontal scroll di HP) supaya HP tetap menampilkan versi website, bukan mobile.
- Section 1: hapus teks "Kepada Yth. Tamu Undangan" dan placeholder "your app will live here…" (img blank-app SVG). Perbesar asset doa/Ar-Rum (isi_section_satu) — lebar ditingkatkan (mis. `max-w-2xl` → lebih besar) tetap dengan latar cream natural background.
- Section 2:
  - Hapus subteks "Adventure Ultimate".
  - Judul "The Bride & Groom" warna putih.
  - Urutan: **Groom di atas, Bride di bawah** (tukar `isi2Atas`/`isi2Bawah` peruntukannya).
  - Tombol IG dibungkus shape pill warna beige (`#E8D9C0`-ish) dengan ikon + handle.
  - Groom → `https://www.instagram.com/adam_adol?igsh=...` label `@adam_adol`.
  - Bride → `https://www.instagram.com/kyzhasc?igsh=...` label `@kyzhsc`.
- Section 5 (Gallery): hapus judul "Wedding Gallery". Upload 7 foto user ke `src/assets/wedding/gallery/1.jpg`–`7.jpg` lewat lovable-assets, ganti array `photos` ke 7 asset tersebut. Tetap interaktif (lightbox + hover).
- Section 7 (RSVP): ganti src iframe ke `https://www.canva.com/design/DAHNuSP1bKo/KulvKCn_7tMGlfTIYXkSgg/view?embed`.
- Section 8: hapus overlay putih (`bg-white/40 backdrop-blur`) — gambar tampil langsung di atas background.
- Musik: upload `AUD-20260622-WA0001_1.mp3` via lovable-assets, ganti `MUSIC_URL` ke URL asset tersebut.

**Aset baru (lovable-assets)**
- 7 foto galeri dari `/mnt/user-uploads/1.jpg` … `7.jpg`
- File MP3 dari `/mnt/user-uploads/AUD-20260622-WA0001_1.mp3`

Tidak ada perubahan struktur routing, framework, atau dependencies.
