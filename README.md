# Happy Birthday — Django + Vercel

Konversi halaman ucapan ulang tahun (semula 1 file HTML) menjadi struktur project Django, siap di-deploy ke Vercel.

## Struktur folder

```
.
├── manage.py
├── requirements.txt
├── vercel.json          # konfigurasi deploy Vercel
├── build_files.sh        # script build (install deps + collectstatic)
├── core/                  # project Django (settings, urls, wsgi)
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py            # entrypoint yang dipakai Vercel
│   └── asgi.py
└── birthday/              # app utama
    ├── views.py
    ├── urls.py
    ├── templates/birthday/index.html
    └── static/birthday/
        ├── css/style.css
        └── js/main.js      # berisi SETTINGS (nama, foto, pesan, password)
```

## Menjalankan di lokal

```bash
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Buka `http://127.0.0.1:8000/`.

## Menaruh foto (untuk galeri & slideshow)

Ada 2 opsi:

**Opsi A — file lokal di project (disarankan)**

1. Taruh file foto di folder:
   ```
   birthday/static/birthday/photos/
   ```
2. Buka `birthday/static/birthday/js/main.js`, cari `SETTINGS.photos`, isi `src` dengan path static-nya:
   ```js
   photos: [
     { src: "/static/birthday/photos/foto1.jpg", caption: "momen 01" },
     { src: "/static/birthday/photos/foto2.jpg", caption: "momen 02" },
     ...
   ]
   ```
   Array `photos` ini dipakai untuk slideshow otomatis di section "Momen-momen Favorit".
3. Redeploy — foto ikut ter-collect oleh `collectstatic` saat build dan disajikan lewat whitenoise, aman untuk Vercel.

**Opsi B — link hosting eksternal**

Upload foto ke Google Drive/Imgur/hosting gambar lain (pastikan link-nya langsung ke file gambar, bukan halaman preview), lalu tempel URL-nya ke `src`, contoh:
```js
src: "https://i.imgur.com/xxxxxxx.jpg"
```

> Kamu juga bisa atur kecepatan pergantian slide lewat `SETTINGS.slideshowIntervalMs` (dalam milidetik, default 3500 = 3.5 detik).

## Mengubah konten (nama, foto, pesan, password)

Semua pengaturan konten ada di satu tempat, sama seperti versi HTML aslinya:

`birthday/static/birthday/js/main.js` → cari komentar **"PENGATURAN UTAMA"**:

```js
const SETTINGS = {
  password: "131005",
  name: "Sayang",
  heroSubtitle: "...",
  photos: [ { src: "...", caption: "..." }, ... ],
  slideshowIntervalMs: 3500,
  message: "...",
  signature: "— Dengan sayang"
};
```

Ganti nilai-nilainya, lalu jalankan ulang / redeploy.

> Catatan: karena ini file statis di sisi client, password di sini hanya proteksi ringan (bukan keamanan sungguhan) — sama seperti versi HTML asli.

## Deploy ke Vercel

1. Push folder ini ke repo GitHub/GitLab/Bitbucket.
2. Di Vercel dashboard: **Add New Project** → import repo tersebut.
3. Vercel akan otomatis mendeteksi `vercel.json`. Pastikan:
   - Build Command / Output Directory dibiarkan default (sudah diatur lewat `vercel.json` + `build_files.sh`).
4. Tambahkan Environment Variables (opsional tapi disarankan):
   - `SECRET_KEY` → isi dengan string acak panjang untuk production.
   - `DEBUG` → `False`.
5. Klik **Deploy**.

Atau lewat CLI:

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Catatan penting soal Vercel + Django

- Vercel adalah platform **serverless**, jadi setiap request dijalankan di fungsi sementara. Halaman ini tidak memakai database sama sekali (tidak ada model/form), jadi ini cocok untuk hosting jenis ini.
- `db.sqlite3` **tidak akan persisten** di Vercel (filesystem read-only saat runtime). Jangan gunakan untuk menyimpan data — project ini memang tidak membutuhkannya.
- File statis (CSS/JS) disajikan lewat kombinasi `whitenoise` + route `/static/(.*)` di `vercel.json`, dikumpulkan otomatis oleh `build_files.sh` (`collectstatic`) saat proses build.
- Kalau nanti butuh upload foto sungguhan alih-alih link `placehold.co`, taruh URL foto (Imgur/Google Drive/hosting lain) di `SETTINGS.photos`, karena upload file langsung ke Vercel tidak persisten.
