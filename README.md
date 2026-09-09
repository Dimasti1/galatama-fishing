# Mini Fishing Leaderboard Simulator — Galatama

Mini web application untuk mensimulasikan leaderboard kompetisi memancing **Galatama** secara real-time.

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* React Hooks
* npm

Tidak menggunakan backend, database, API, Redux, Zustand, atau library UI tambahan.

## Cara Menjalankan

Pastikan **Node.js** dan **npm** sudah terinstall.

```bash
npm install
npm run dev
```

Kemudian buka alamat yang diberikan Vite, biasanya:

```text
http://localhost:5173
```

Untuk membuat production build:

```bash
npm run build
```

Untuk menjalankan hasil build:

```bash
npm run preview
```

## Link Deploy
https://galatama-fishing-mht3.vercel.app/

## Cara Kerja

* Session berlangsung selama **60 detik**.
* Terdapat 5 pemain virtual: **Bot 1–5**.
* Bot mendapatkan ikan secara acak setiap **3–6 detik**.
* Berat ikan berada pada rentang **0.5–10.0 kg**.
* Leaderboard diperbarui setiap kali terjadi tangkapan.
* Urutan ranking berdasarkan:

  1. Total berat terbesar
  2. Jumlah tangkapan terbanyak
  3. Nama pemain secara alfabetis
* Tangkapan terberat ditampilkan secara terpisah.
* 10 tangkapan terbaru ditampilkan pada bagian Recent Catches.
* Tangkapan di atas **7 kg** mendapatkan visual feedback khusus.

## Keputusan Desain

### 1. Recursive `setTimeout`

Simulasi tangkapan menggunakan recursive `setTimeout`, bukan `setInterval`.

Alasannya, setiap tangkapan memiliki jeda acak 3–6 detik sehingga lebih mudah dikontrol dan dihentikan ketika session berakhir.

### 2. Custom Hook

Logic session dipisahkan ke:

```text
src/hooks/useFishingSession.ts
```

Hook tersebut menangani timer, simulasi tangkapan, leaderboard state, notification, reset, dan cleanup.

Dengan demikian komponen UI tetap fokus pada rendering.

### 3. Pure Functions

Logic utama dibuat sebagai fungsi terpisah:

```text
formatTime()
getRandomPlayer()
generateFishWeight()
generateCatch()
applyCatch()
sortLeaderboard()
```

Hal ini membuat logic lebih mudah diuji, dipahami, dan dikembangkan.

### 4. Immutable State

State React tidak dimutasi secara langsung. Update player, catch history, dan leaderboard dibuat menggunakan immutable update.

### 5. Responsive UI

Leaderboard menggunakan responsive table layout tanpa memaksakan horizontal scrolling pada mobile.

Informasi yang paling penting tetap terlihat pada layar kecil:

* Ranking
* Nama pemain
* Jumlah tangkapan
* Total berat

### 6. Race Condition Protection

Session menggunakan `sessionId` dan pengecekan status untuk memastikan callback asynchronous yang sudah terjadwal tidak menambahkan tangkapan setelah session berakhir atau di-reset.

## Bagian yang Masih Bisa Diperbaiki

Beberapa hal masih dapat dikembangkan jika aplikasi ini dilanjutkan:

1. **Unit testing**
   Pure functions seperti `sortLeaderboard`, `generateFishWeight`, dan `applyCatch` dapat diberikan automated test.

2. **Animasi leaderboard**
   Perubahan posisi ranking dapat menggunakan layout animation agar perpindahan pemain terasa lebih natural.

3. **Statistik session**
   Bisa ditambahkan statistik seperti rata-rata berat ikan, total ikan, dan catch rate.

4. **Konfigurasi session**
   Durasi session, jumlah bot, dan interval tangkapan dapat dibuat configurable.

5. **Testing asynchronous logic**
   Custom hook dapat diberikan integration test untuk memastikan timer, timeout, reset, dan session ending bekerja sesuai ekspektasi.

6. **Production hardening**
   Error boundary, automated linting/formatting, dan CI pipeline dapat ditambahkan untuk project yang akan digunakan secara production.
