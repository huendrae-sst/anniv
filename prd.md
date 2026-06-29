
# 1. Product Requirement Document (PRD)

## Project Overview

-   **Nama Project:**  2nd Wedding Anniversary Interactive Mobile Web
    
-   **Target Pengguna:**  Istri (Personal)
    
-   **Platform:**  Mobile Web Browser (Responsive)
    
-   **Tech Stack Utama:**  React (Vite), Framer Motion, Tailwind CSS
    

## Fitur Utama & User Flow

```
[Welcome Screen] ➔ [Interactive Input Quiz (10 Soal)] ➔ [Grand Finale (Ucapan & Foto)]

```

### 1. Welcome Screen (Halaman Pembuka)

-   **Deskripsi:**  Halaman estetik dengan nuansa romantis, bersih, dan minimalis.
    
-   **Elemen UI:**
    
    -   Judul pembuka yang hangat (misal:  _"Our 2 Years Journey"_).
        
    -   Tombol utama: "Mulai Nostalgia".
        
-   **Animasi:**  Efek  _fade-in_  lembut pada teks dan tombol saat halaman dimuat.
    

### 2. Quiz Screen (Interactive Input)

-   **Deskripsi:**  Halaman teka-teki berisi 10 pertanyaan isian singkat seputar memori berdua.
    
-   **Elemen UI:**
    
    -   _Progress Indicator:_  Ikon hati yang bergerak maju seiring bertambahnya nomor soal.
        
    -   _Text Input:_  Kolom pengisian jawaban yang bersih dengan tombol "Cek Jawaban".
        
-   **Logika & Validasi:**
    
    -   Sistem menggunakan fungsi  `.toLowerCase().trim()`  untuk mengabaikan huruf besar/kecil dan spasi tidak sengaja.
        
    -   **Jika Jawaban Salah:**  Kolom input/tombol bergetar (_shake animation_) dan muncul teks petunjuk/clue kecil yang jenaka di bawahnya. Istri tidak bisa lanjut ke soal berikutnya sebelum jawaban benar.
        
    -   **Jika Jawaban Benar:**  Efek transisi  _slide-out_  untuk soal lama dan  _slide-in_  untuk soal berikutnya.
        

### 3. Grand Finale (Halaman Ucapan & Foto)

-   **Deskripsi:**  Puncak acara setelah soal ke-10 berhasil dijawab.
    
-   **Elemen UI:**
    
    -   Animasi amplop surat digital yang terbuka perlahan.
        
    -   Teks ucapan utama:  _"Happy 2nd Wedding Anniversary"_.
        
    -   _Letter/Message:_  Pesan personal yang muncul dengan efek animasi mengetik (_typing effect_).
        
    -   _Cinematic Gallery:_  Galeri foto berdua yang rapi ke bawah (_vertical scroll_  atau  _carousel layout_) dengan transisi  _soft fade-in_  saat di-scroll.
        

## Ketentuan Non-Fungsional (Aesthetic & Performance)

-   **Desain:**  Minimalis, kontemporer, dan bersih (menggunakan warna dasar hangat seperti  _stone_,  _off-white_, dengan aksen rose gold atau amber lembut).
    
-   **Responsivitas:**  Wajib dioptimalkan sepenuhnya untuk layar  _smartphone_  (Mobile-First).
    
-   **Performa Transisi:**  Animasi harus terasa ringan dan  _fluid_  (tidak patah-patah di Google Chrome mobile atau Safari).
    

# 2. Daftar Pertanyaan Isian & Struktur Data (JSON)

Berikut adalah struktur data pertanyaan yang siap dimasukkan ke dalam kode React Anda. Anda tinggal mengganti nilai pada properti  `jawabanBenar`  dan  `clueSalah`  sesuai dengan memori asli kalian.

JSON

```
[
  {
    "id": 1,
    "pertanyaan": "Ingat gak, apa nama tempat atau kafe tempat kita pertama kali jalan berdua (first date)?",
    "jawabanBenar": "Isi_Di_Sini",
    "clueSalah": "Masa lupa sih? Tempatnya yang ada menu favorit kamu itu lho..."
  },
  {
    "id": 2,
    "pertanyaan": "Waktu pertama kali kita nge-date itu, kita pergi naik kendaraan apa?",
    "jawabanBenar": "Isi_Di_Sini",
    "clueSalah": "Coba ingat lagi, waktu itu belum naik kendaraan yang sekarang kita pakai."
  },
  {
    "id": 3,
    "pertanyaan": "Apa panggilan sayang atau sebutan unik pertama dari aku buat kamu pas kita masih pacaran?",
    "jawabanBenar": "Isi_Di_Sini",
    "clueSalah": "Hampir tepat, panggilan yang sedikit manja itu lho..."
  },
  {
    "id": 4,
    "pertanyaan": "Bulan apa kita berdua melangsungkan acara lamaran resmi?",
    "jawabanBenar": "Isi_Di_Sini",
    "clueSalah": "Ayo diingat-ingat lagi, beberapa bulan sebelum hari akad kita."
  },
  {
    "id": 5,
    "pertanyaan": "Apa warna dominan dari baju atau kebaya yang kamu pakai saat akad nikah kita?",
    "jawabanBenar": "Isi_Di_Sini",
    "clueSalah": "Warna yang bikin kamu kelihatan paling anggun hari itu!"
  },
  {
    "id": 6,
    "pertanyaan": "Ke kota atau daerah mana kita pertama kali pergi liburan/bulan madu setelah sah jadi suami istri?",
    "jawabanBenar": "Isi_Di_Sini",
    "clueSalah": "Tempat yang suasananya romantis banget waktu itu."
  },
  {
    "id": 7,
    "pertanyaan": "Apa menu makanan pertama yang kamu masak buat aku setelah kita tinggal satu rumah?",
    "jawabanBenar": "Isi_Di_Sini",
    "clueSalah": "Masakan simpel tapi rasanya paling juara sedunia."
  },
  {
    "id": 8,
    "pertanyaan": "Apa barang atau benda milikku yang paling sering aku lupain taruhnya sampai harus kamu yang nemuin?",
    "jawabanBenar": "Isi_Di_Sini",
    "clueSalah": "Benda kecil yang kalau gak ada bikin aku pusing nyarinya."
  },
  {
    "id": 9,
    "pertanyaan": "Kalau kita lagi nonton film berdua di rumah, siapa di antara kita yang biasanya paling cepat ketiduran?",
    "jawabanBenar": "Isi_Di_Sini",
    "clueSalah": "Isi antara 'aku' atau 'kamu'. Yang baru main film 15 menit matanya sudah merem!"
  },
  {
    "id": 10,
    "pertanyaan": "Gak terasa kita sudah berjalan bersama sejauh ini. Tahun ini adalah perayaan Wedding Anniversary kita yang ke-berapa?",
    "jawabanBenar": "2",
    "clueSalah": "Masa yang ini salah juga? Ketik angka saja ya!"
  }
]
```