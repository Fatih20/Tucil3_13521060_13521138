# Implementasi Algoritma UCS dan A\* untuk Menentukan Lintasan Terpendek

## Deskripsi Program

Program ini merupakan pencari rute terpendek dalam sebuah _directed graph_ (walaupun spek hanya meminta _undirected graph_, _thank you so much_ sheet QnA :blush:). Program ini menggunakan algoritma Uniform Cost Search (UCS) dan A\* untuk menyelesaikan permasalahan tersebut. Program ini dibuat untuk memenuhi tugas kecil 3 mata kuliah IF2211 Strategi Algoritma.

## _Tech Stack_

`TypeScript`
`next.js`
`react-leaflet`

## Cara Penggunaan Program

- Program dapat digunakan melalui tautan [berikut](https://chimerical-khapse-d2481e.netlify.app/).
- Format file masukan yang dapat dibaca oleh program:

(kalimat yang diikuti tanda pagar hanyalah komentar pada contoh dan tidak diterima oleh program)

```
N                                                 # Angka yang menyatakan jumlah simpul pada file
NamaSimpul1 LatitudeSimpul1 LongitudeSimpul1      # Informasi-informasi simpul
NamaSimpul2 LatitudeSimpul2 LongitudeSimpul2      # Format Latitude dan Longitude mengikuti format Decimal Degree
...
NamaSimpulN LatitudeSimpulN LongitudeSimpulN
Bobot_1_1 Bobot_1_2 ... Bobot_1_N                 # Bobot_i_j menyatakan bobot dari simpul ke-i menuju simpul ke-j
Bobot_2_1 Bobot_2_2 ... Bobot_2_N                 # Format Bobot menggunakan bilangan ril non-negatif
...                                               # Jika tidak terdapat sisi antara dua buah simpul, isi dengan simbol "-"
Bobot_N_1 Bobot_N_2 ... Bobot_N_N
```

## Catatan Penggunaan Program

- Perhitungan heuristik A\* didasari oleh posisi simpul pada dunia nyata, dan menggunakan rumus 'Haversine' yang dimodifikasi agar menghasilkan jarak terpendek. **_Perhatikan bahwa bobot antar simpul harus setidaknya lebih besar dari lintasan garis lurus pada permukaan bumi agar pencarian A\* dapat bekerja_**
- Ketika pertama kali memilih awal dan tujuan pencarian, perlu diperhatikan bahwa jika yang dipilih adalah lokasi yang ada di opsi teratas, maka perlu dipilih lokasi lain terlebih dahulu kemudian dapat memilih lokasi yang paling atas tersebut.
- Pada kasus dengan simpul-simpul yang masih sederhana, UCS dapat menghasilkan hasil yang sama persis dengan A\* (termasuk dalam kasus uji yang dilampirkan di folder `test`). Untuk benar-benar menguji perbedaan antar mereka, diperlukan himpunan simpul yang kompleks.

## Author

Program ini dibuat oleh:

- 13521060 - Fatih Nararya R.I.
- 13521138 - Johann C. K.

## Credits

- http://www.movable-type.co.uk/scripts/latlong.html for providing insight on haversine formula
