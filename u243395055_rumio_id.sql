-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 30, 2026 at 09:02 PM
-- Server version: 11.8.8-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u243395055_rumio_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `addonplan`
--

CREATE TABLE `addonplan` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `priceSuffix` varchar(191) DEFAULT NULL,
  `imageUrl` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addonplan`
--

INSERT INTO `addonplan` (`id`, `name`, `description`, `price`, `priceSuffix`, `imageUrl`, `createdAt`) VALUES
('drone', 'Foto Drone', 'Foto udara untuk menampilkan lokasi & lingkungan sekitar properti.', 500000, NULL, 'https://images.unsplash.com/photo-1504890001746-a9a68eda46e2?q=80&w=1574', '2026-06-25 03:57:35.315'),
('featured', 'Featured Listing', 'Tampilkan properti Anda di halaman beranda Rumio selama 7 hari.', 250000, '/lantai', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop', '2026-06-25 03:57:35.327'),
('floor-plan', 'Floor Plan 2D', 'Denah 2D untuk memudahkan calon pembeli memahami layout properti.', 250000, NULL, 'https://plus.unsplash.com/premium_photo-1726877098040-3745503673b4?q=80&w=1740&fit=crop', '2026-06-25 03:57:35.324'),
('hosting', 'Perpanjangan Hosting', 'Perpanjangan masa tayang landing page setelah periode paket berakhir.', 100000, '/bulan', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop', '2026-06-25 03:57:35.329'),
('video', 'Video Cinematic', 'Video profesional berdurasi 1-2 menit untuk promosi maksimal.', 1000000, NULL, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', '2026-06-25 03:57:35.319');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(191) NOT NULL,
  `featuredImage` varchar(191) DEFAULT NULL,
  `viewCount` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `category` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `slug`, `content`, `author`, `featuredImage`, `viewCount`, `createdAt`, `category`) VALUES
('cmqsz1e7q0033v5rw00u2tbd6', 'Keuntungan dan Risiko Investasi Tanah Kavling', 'keuntungan-dan-risiko-investasi-tanah-kavling', '<p>Jika Anda mencari instrumen investasi jangka panjang yang cenderung aman dan tidak merepotkan, investasi tanah kavling bisa menjadi pilihan yang sangat menarik. Berbeda dengan rumah atau apartemen yang membutuhkan biaya perawatan rutin, tanah kosong memiliki kebutuhan pemeliharaan yang sangat minim.</p><p>Namun, seperti investasi lainnya, tanah kavling juga memiliki risiko yang perlu dipahami sebelum Anda memutuskan untuk membeli.</p><h2>Keuntungan Investasi Tanah Kavling</h2><h3>1. Capital Gain yang Tinggi</h3><p>Nilai tanah cenderung meningkat setiap tahun, terutama jika berada di lokasi strategis seperti:</p><ul><li><p>Area dekat pembangunan jalan tol</p></li><li><p>Kawasan pusat pemerintahan baru</p></li><li><p>Dekat kampus atau pusat pendidikan</p></li><li><p>Wilayah yang sedang berkembang pesat</p></li></ul><h3>2. Biaya Perawatan Minim</h3><p>Tanah kavling tidak membutuhkan perawatan seperti bangunan. Anda hanya perlu:</p><ul><li><p>Membersihkan rumput liar secara berkala</p></li><li><p>Menjaga batas lahan dengan pagar atau patok</p></li></ul><p>Tidak ada biaya listrik, air, atau perbaikan struktur bangunan.</p><h3>3. Fleksibilitas Penggunaan</h3><p>Tanah kavling dapat dimanfaatkan sesuai kebutuhan Anda, seperti:</p><ul><li><p>Disimpan sebagai investasi jangka panjang</p></li><li><p>Dibangun rumah untuk disewakan</p></li><li><p>Dijadikan lahan usaha seperti parkir atau kios</p></li></ul><h2>Risiko yang Harus Diwaspadai</h2><h3>1. Likuiditas Rendah</h3><p>Tanah tidak mudah dijual dalam waktu singkat. Proses penjualan bisa memakan waktu berbulan-bulan hingga bertahun-tahun tergantung lokasi dan harga.</p><h3>2. Sengketa Lahan</h3><p>Risiko konflik kepemilikan tanah masih sering terjadi. Pastikan Anda:</p><ul><li><p>Memeriksa keaslian sertifikat (SHM/HGB)</p></li><li><p>Melakukan pengecekan di Badan Pertanahan Nasional (BPN)</p></li><li><p>Menghindari transaksi tanpa legalitas jelas</p></li></ul><h3>3. Risiko Zonasi</h3><p>Perhatikan status zonasi tanah. Pastikan tanah berada di:</p><ul><li><p>Zona pemukiman, atau</p></li><li><p>Zona komersial</p></li></ul><p>Hindari tanah di zona hijau atau area yang tidak diperbolehkan untuk pembangunan.</p><h2>Tips Membeli Tanah Kavling yang Aman</h2><p>Sebelum melakukan pembayaran, pastikan Anda mengecek beberapa hal berikut:</p><ul><li><p>Akses jalan yang dapat dilalui kendaraan (minimal mobil)</p></li><li><p>Ketersediaan listrik dan air bersih</p></li><li><p>Kondisi lingkungan bebas banjir</p></li><li><p>Legalitas sertifikat yang jelas</p></li></ul><p>Tanah kavling di kawasan perumahan (<em>cluster</em>) biasanya lebih aman karena sudah memiliki legalitas yang terstruktur dibandingkan tanah kavling lepas.</p><h2>Kesimpulan</h2><p>Investasi tanah kavling merupakan pilihan yang menarik untuk jangka panjang karena nilai yang cenderung terus naik dan biaya perawatan yang rendah. Namun, keberhasilan investasi ini sangat bergantung pada pemilihan lokasi dan pengecekan legalitas yang cermat.</p><p>Dengan riset yang tepat, tanah kavling bisa menjadi aset yang sangat menguntungkan di masa depan.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80', 75, '2026-06-25 03:57:35.414', 'Tips Properti'),
('cmqsz1e7u0034v5rw2k57i8u0', 'Cara Membuat Deskripsi dan Foto Listing Properti yang Menarik', 'cara-membuat-deskripsi-dan-foto-listing-properti-yang-menarik', '<p>Portal properti dipenuhi oleh ribuan iklan setiap harinya. Untuk menarik perhatian di tengah lautan informasi tersebut, listing properti Anda harus terlihat menonjol. Dua pilar utama yang menentukan keberhasilan listing adalah <strong>foto yang memikat</strong> dan <strong>deskripsi yang informatif serta persuasif</strong>.</p><h2>1. Rahasia Foto Listing yang Menggoda</h2><p>Sebagian besar calon pembeli memutuskan untuk mengklik sebuah iklan karena terpikat oleh gambar utama (<em>featured image</em>). Berikut beberapa tips praktis untuk mengambil foto properti:</p><ul><li><p><strong>Ambil Foto Saat Golden Hour</strong><br>Waktu terbaik adalah pagi hari (sekitar 08.00–10.00) atau sore hari (16.00–17.00). Cahaya matahari yang hangat membuat ruangan terlihat lebih hidup dan mewah.</p></li><li><p><strong>Gunakan Sudut Lebar (Wide Angle)</strong><br>Gunakan lensa wide angle untuk memberikan kesan ruangan yang lebih luas, tetapi hindari distorsi berlebihan seperti efek <em>fisheye</em>.</p></li><li><p><strong>Fokus pada Fitur Unik</strong><br>Jika rumah memiliki taman belakang, dapur modern, atau balkon dengan pemandangan bagus, pastikan fitur tersebut mendapatkan porsi foto yang cukup.</p></li></ul><h2>2. Menulis Deskripsi yang Menjual (Bukan Sekadar Spesifikasi)</h2><p>Banyak agen hanya menuliskan data teknis seperti jumlah kamar atau luas tanah. Padahal, pembeli lebih tertarik pada <strong>gaya hidup dan kenyamanan</strong>, bukan sekadar angka.</p><p>Gunakan pendekatan berikut:</p><h3>Headline yang Kuat</h3><p>Sebutkan keunggulan utama di judul.</p><ul><li><p>❌ Buruk: <em>\"Dijual Rumah di Banyumas\"</em></p></li><li><p>✅ Baik: <em>\"Rumah Modern Minimalis Siap Huni, Dekat Tol &amp; Bebas Banjir\"</em></p></li></ul><h3>Jual Keuntungan, Bukan Hanya Fitur</h3><p>Ubah deskripsi teknis menjadi manfaat nyata bagi pembeli.</p><ul><li><p>❌ “Taman belakang 3x4 meter”</p></li><li><p>✅ “Taman belakang asri, cocok untuk area bermain anak atau BBQ keluarga”</p></li></ul><h3>Call to Action (CTA) yang Jelas</h3><p>Arahkan pembaca untuk segera bertindak.</p><p>Contoh:</p><blockquote><p>Unit terbatas! Hubungi kami sekarang via WhatsApp untuk menjadwalkan survei sebelum terjual.</p></blockquote><h2>Kesimpulan</h2><p>Dengan mengombinasikan foto berkualitas tinggi dan deskripsi yang menyentuh sisi emosional pembeli, listing properti Anda akan lebih menonjol di tengah persaingan dan berpotensi mendapatkan lebih banyak respon positif serta closing lebih cepat.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80', 60, '2026-06-25 03:57:35.418', 'Tips Properti'),
('cmqsz1e800035v5rw95qc8nae', 'Cara Agen Properti Meningkatkan Omset Penjualan dengan Virtual Tour', 'cara-agen-properti-meningkatkan-omset-penjualan-dengan-virtual-tour', '<p>Dalam industri real estate yang kompetitif, agen properti dituntut untuk selalu beradaptasi dengan teknologi terbaru. Salah satu inovasi yang terbukti meningkatkan omset penjualan secara signifikan adalah <strong>Virtual Tour 360°</strong>. Bukan lagi sekadar tren, teknologi ini mengubah cara calon pembeli menyurvei rumah impian mereka.</p><h2>Mengapa Virtual Tour Sangat Efektif?</h2><p>Bagi calon pembeli, waktu adalah hal yang sangat berharga. Virtual tour memangkas waktu survei fisik yang melelahkan. Agen tidak perlu lagi menemani calon pembeli ke 5–10 lokasi berbeda hanya untuk melihat layout dasar.</p><p>Berikut beberapa alasan mengapa virtual tour bisa meningkatkan penjualan:</p><h3>1. Menyaring Calon Pembeli yang Serius</h3><p>Pembeli yang menghubungi Anda setelah melihat virtual tour biasanya adalah <em>hot leads</em> yang sudah 80% menyukai kondisi rumah.</p><h3>2. Jangkauan Pasar Lebih Luas</h3><p>Calon pembeli dari luar kota atau bahkan luar negeri bisa melihat detail rumah tanpa harus datang langsung.</p><h3>3. Meningkatkan Kepercayaan</h3><p>Virtual tour tidak dapat “memanipulasi sudut” seperti foto wide-angle. Ini memberikan kesan transparansi dan kejujuran dari pihak agen.</p><h2>Cara Memanfaatkan Virtual Tour untuk Closing Lebih Cepat</h2><p>Agar teknologi ini tidak sia-sia, berikut cara memaksimalkannya dalam aktivitas marketing:</p><ul><li><p><strong>Sematkan di Media Sosial</strong><br>Bagikan cuplikan virtual tour di Instagram Story atau TikTok untuk menarik perhatian audiens.</p></li><li><p><strong>Gunakan sebagai Alat Presentasi</strong><br>Saat bertemu klien, gunakan tablet atau VR headset untuk menampilkan portofolio rumah secara langsung.</p></li><li><p><strong>Kirim via WhatsApp</strong><br>Saat calon pembeli bertanya, kirimkan link virtual tour sebelum menjadwalkan survei langsung.</p></li></ul><h2>Kesimpulan</h2><p>Investasi pada teknologi virtual tour adalah langkah strategis bagi agen properti modern. Teknologi ini bukan hanya meningkatkan efisiensi, tetapi juga mempercepat proses <em>closing</em> dan memperluas jangkauan pasar.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', 54, '2026-06-25 03:57:35.424', 'Tips & Panduan'),
('cmqsz1e830036v5rwtot4ecaf', 'Mengenal Perbedaan SHM dan HGB Sebelum Membeli Properti', 'mengenal-perbedaan-shm-dan-hgb-sebelum-membeli-properti', '<p>Dalam dunia properti, istilah <strong>SHM (Sertifikat Hak Milik)</strong> dan <strong>HGB (Hak Guna Bangunan)</strong> sering kali menjadi pertimbangan utama sebelum membeli rumah, ruko, maupun apartemen. Keduanya merupakan bentuk hak atas tanah yang diakui secara hukum di Indonesia, tetapi memiliki karakteristik dan konsekuensi yang berbeda.</p><p>Memahami perbedaan SHM dan HGB sangat penting agar Anda dapat mengambil keputusan investasi properti yang tepat dan terhindar dari masalah hukum di kemudian hari.</p><h2>1. Sertifikat Hak Milik (SHM)</h2><p>SHM merupakan bentuk hak atas tanah yang paling kuat dan paling tinggi dalam sistem pertanahan Indonesia. Pemegang SHM memiliki hak penuh atas tanah tersebut tanpa batas waktu.</p><h3>Kelebihan SHM</h3><ul><li><p>Kepemilikan bersifat permanen dan tidak memiliki masa berlaku.</p></li><li><p>Memiliki kekuatan hukum paling tinggi dibanding jenis sertifikat lainnya.</p></li><li><p>Nilai tanah cenderung meningkat dari waktu ke waktu.</p></li><li><p>Lebih mudah digunakan sebagai jaminan kredit atau pinjaman bank.</p></li><li><p>Memiliki nilai jual kembali yang tinggi.</p></li></ul><h3>Batasan SHM</h3><ul><li><p>Hanya dapat dimiliki oleh Warga Negara Indonesia (WNI).</p></li><li><p>Warga Negara Asing (WNA) tidak diperbolehkan memiliki tanah dengan status SHM.</p></li></ul><h2>2. Hak Guna Bangunan (HGB)</h2><p>HGB adalah hak untuk mendirikan dan memiliki bangunan di atas tanah yang bukan merupakan hak milik pemegang sertifikat. Tanah tersebut dapat berupa tanah negara atau tanah milik pihak lain.</p><p>Status HGB banyak ditemukan pada perumahan skala besar, kawasan komersial, ruko, hingga apartemen.</p><h3>Kelebihan HGB</h3><ul><li><p>Harga properti biasanya lebih terjangkau dibandingkan properti berstatus SHM.</p></li><li><p>Banyak digunakan untuk kebutuhan bisnis dan investasi.</p></li><li><p>Dapat diperpanjang sesuai ketentuan yang berlaku.</p></li><li><p>Umum digunakan oleh pengembang properti besar.</p></li></ul><h3>Batasan HGB</h3><ul><li><p>Memiliki jangka waktu tertentu.</p></li><li><p>Harus diperpanjang sebelum masa berlaku berakhir.</p></li><li><p>Nilai jual kembali dapat terpengaruh apabila masa berlaku HGB semakin pendek.</p></li><li><p>Jika tidak diperpanjang, hak atas tanah dapat kembali kepada negara atau pemilik tanah asal.</p></li></ul><blockquote><p><strong>Tips:</strong> Jika membeli properti dengan status HGB, pastikan Anda memeriksa sisa masa berlaku sertifikat. Semakin panjang masa berlakunya, semakin baik nilai dan daya tarik properti tersebut.</p></blockquote><h2>Apakah HGB Bisa Diubah Menjadi SHM?</h2><p>Ya, dalam kondisi tertentu HGB dapat ditingkatkan menjadi SHM.</p><p>Peningkatan status ini umumnya dapat dilakukan untuk rumah tinggal yang memenuhi persyaratan dan diajukan melalui kantor Badan Pertanahan Nasional (BPN). Setelah proses administrasi dan persyaratan terpenuhi, status tanah dapat berubah dari HGB menjadi SHM.</p><p>Namun, tidak semua properti HGB dapat langsung ditingkatkan menjadi SHM. Oleh karena itu, penting untuk memastikan status tanah dan ketentuan yang berlaku sebelum melakukan pembelian.</p><h2>Kesimpulan</h2><p>SHM dan HGB sama-sama memberikan kepastian hukum atas properti yang dimiliki, tetapi memiliki perbedaan mendasar pada aspek kepemilikan dan jangka waktu.</p><p>Jika Anda mengutamakan kepemilikan penuh dalam jangka panjang, SHM merupakan pilihan terbaik. Namun, jika mencari properti dengan harga lebih terjangkau atau untuk tujuan investasi dan bisnis, HGB juga dapat menjadi opsi yang menarik selama masa berlakunya masih memadai.</p><p>Sebelum membeli properti, selalu periksa status sertifikat agar investasi yang Anda lakukan aman dan sesuai dengan tujuan keuangan Anda.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&q=80', 55, '2026-06-25 03:57:35.427', 'Tips & Panduan'),
('cmqsz1e860037v5rwjf7g7cv8', 'Langkah demi Langkah Proses Pengajuan KPR Rumah', 'langkah-demi-langkah-proses-pengajuan-kpr-rumah', '<h1>Panduan Lengkap Mengajukan KPR untuk Pembeli Rumah Pertama</h1><p>Membeli rumah secara tunai tentu menjadi impian banyak orang. Namun, bagi sebagian besar masyarakat Indonesia, memanfaatkan fasilitas <strong>Kredit Pemilikan Rumah (KPR)</strong> dari perbankan merupakan cara paling realistis untuk memiliki hunian sendiri.</p><p>Bagi Anda yang baru pertama kali mengajukan KPR, berikut panduan langkah demi langkah agar proses pengajuan berjalan lebih lancar.</p><h2>1. Persiapkan Uang Muka (<em>Down Payment</em> / DP)</h2><p>Meskipun saat ini banyak pengembang menawarkan promo \"DP 0%\", Anda tetap disarankan menyiapkan uang muka minimal 10–20% dari harga rumah.</p><p>Semakin besar DP yang Anda bayarkan, semakin kecil jumlah pinjaman yang harus diajukan ke bank. Hal ini akan membantu mengurangi cicilan bulanan sekaligus total bunga yang harus dibayar selama masa kredit.</p><h2>2. Pilih Bank dan Bandingkan Suku Bunga</h2><p>Jangan langsung mengajukan KPR ke satu bank tanpa melakukan perbandingan. Setiap bank memiliki kebijakan dan penawaran suku bunga yang berbeda.</p><h3>Bunga Tetap (<em>Fixed Rate</em>)</h3><p>Bunga cicilan tidak berubah selama periode tertentu, misalnya 1–5 tahun pertama. Jenis bunga ini memberikan kepastian jumlah cicilan setiap bulan.</p><h3>Bunga Mengambang (<em>Floating Rate</em>)</h3><p>Besaran bunga mengikuti kondisi pasar dan kebijakan suku bunga yang berlaku. Cicilan dapat naik maupun turun sesuai perubahan suku bunga.</p><blockquote><p><strong>Tips:</strong> Perhatikan tidak hanya besaran bunga awal, tetapi juga skema bunga setelah masa <em>fixed rate</em> berakhir.</p></blockquote><h2>3. Lengkapi Dokumen Persyaratan</h2><p>Secara umum, bank akan meminta beberapa dokumen berikut:</p><ul><li><p>Fotokopi KTP.</p></li><li><p>Fotokopi Kartu Keluarga (KK).</p></li><li><p>Fotokopi NPWP.</p></li><li><p>Slip gaji 3 bulan terakhir (untuk karyawan).</p></li><li><p>Surat Keterangan Kerja (SKK).</p></li><li><p>Rekening koran atau mutasi rekening 3 bulan terakhir.</p></li></ul><p>Pastikan seluruh dokumen masih berlaku dan data yang tercantum sesuai untuk mempercepat proses verifikasi.</p><h2>4. Proses BI Checking (<em>SLIK OJK</em>)</h2><p>Sebelum menyetujui pengajuan KPR, bank akan memeriksa riwayat kredit Anda melalui Sistem Layanan Informasi Keuangan (SLIK) OJK.</p><p>Riwayat pembayaran yang buruk, seperti tunggakan kartu kredit, cicilan kendaraan, pinjaman online, atau kredit lainnya dapat memengaruhi peluang persetujuan KPR.</p><p>Pastikan seluruh kewajiban kredit sebelumnya telah dibayar tepat waktu sebelum mengajukan KPR.</p><h2>5. Penilaian Properti (<em>Appraisal</em>) dan Persetujuan Kredit</h2><p>Setelah dokumen dan riwayat kredit dinyatakan memenuhi syarat, bank akan melakukan proses <em>appraisal</em> terhadap properti yang akan dibeli.</p><p>Tujuan proses ini adalah untuk memastikan nilai pasar rumah sesuai dengan harga yang diajukan.</p><p>Jika hasil penilaian dianggap layak, bank akan menerbitkan <strong>SP3K (Surat Persetujuan Pemberian Kredit)</strong> yang berisi:</p><ul><li><p>Plafon kredit yang disetujui.</p></li><li><p>Jangka waktu pinjaman.</p></li><li><p>Suku bunga.</p></li><li><p>Biaya administrasi.</p></li><li><p>Ketentuan kredit lainnya.</p></li></ul><h2>6. Akad Kredit</h2><p>Tahap terakhir adalah penandatanganan akad kredit yang dilakukan di hadapan notaris dan melibatkan pihak bank, pembeli, serta penjual atau pengembang.</p><p>Pada tahap ini seluruh dokumen hukum akan ditandatangani dan biaya terkait transaksi diselesaikan.</p><p>Setelah akad kredit selesai, bank akan mencairkan dana kepada penjual, dan Anda resmi menjadi pemilik rumah sekaligus mulai menjalankan kewajiban cicilan sesuai perjanjian.</p><hr><h2>Kesimpulan</h2><p>Mengajukan KPR bukanlah proses yang rumit jika dipersiapkan dengan baik. Mulailah dengan menyiapkan DP yang cukup, menjaga riwayat kredit tetap bersih, melengkapi seluruh dokumen, dan memilih bank dengan penawaran yang paling sesuai dengan kondisi keuangan Anda.</p><p>Dengan persiapan yang matang, peluang pengajuan KPR disetujui akan semakin besar dan impian memiliki rumah sendiri dapat terwujud lebih cepat.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80', 58, '2026-06-25 03:57:35.431', 'Tips & Panduan'),
('cmqsz1e890038v5rwh54bj215', 'Apakah Fitur Smart Home Bisa Meningkatkan Nilai Jual Rumah?', 'apakah-fitur-smart-home-bisa-meningkatkan-nilai-jual-rumah', '<p>Namun, apakah investasi memasang perangkat <em>smart home</em> ini benar-benar bisa menaikkan nilai jual rumah Anda secara finansial?</p><h2>Pengaruh Smart Home terhadap Nilai Properti</h2><p>Secara umum, memiliki fitur <em>smart home</em> memberikan keunggulan kompetitif yang kuat dibanding properti konvensional lainnya. Berikut adalah alasan mengapa fitur ini bernilai tinggi di mata calon pembeli:</p><h3>1. Efisiensi Energi (Penghematan Biaya)</h3><p><em>Thermostat</em> pintar dan pengontrol lampu otomatis dapat membantu mengurangi konsumsi energi, sehingga tagihan listrik menjadi lebih hemat. Ini menjadi nilai tambah bagi pembeli yang mencari efisiensi biaya hidup dalam jangka panjang.</p><h3>2. Keamanan Ekstra (<em>Security</em>)</h3><p>Penggunaan <em>smart CCTV</em>, detektor asap pintar, dan <em>smart lock</em> memberikan rasa aman lebih bagi penghuni. Keamanan sering kali menjadi faktor utama yang dipertimbangkan keluarga saat memilih rumah.</p><h3>3. Faktor Kemudahan (<em>Convenience</em>)</h3><p>Kemampuan mengontrol pintu, gerbang, lampu, atau AC melalui aplikasi ponsel maupun perintah suara memberikan pengalaman hidup yang lebih praktis. Fitur ini juga menciptakan <em>wow factor</em> saat calon pembeli melakukan survei rumah.</p><h2>Perangkat Smart Home yang Paling Menjual</h2><p>Jika Anda berencana meningkatkan daya tarik properti sebelum dijual, pilih perangkat yang benar-benar bermanfaat dan mudah digunakan.</p><h3>Smart Door Lock</h3><p>Kunci pintu digital dengan sidik jari, kartu akses, atau PIN memberikan kemudahan sekaligus meningkatkan keamanan. Pembeli juga tidak perlu khawatir kehilangan kunci fisik.</p><h3>Smart Lighting System</h3><p>Sistem lampu pintar memungkinkan pengguna mengatur jadwal menyala dan mati secara otomatis, serta mengontrol tingkat kecerahan sesuai kebutuhan.</p><h3>Video Doorbell</h3><p>Bel pintu berkamera yang terhubung ke ponsel pintar memungkinkan penghuni memantau tamu yang datang meskipun sedang berada di luar rumah.</p><blockquote><p><strong>Tips:</strong> Fokus pada perangkat yang mudah dipahami oleh pengguna umum. Sistem yang terlalu rumit justru dapat membuat calon pembeli merasa ragu untuk menggunakannya.</p></blockquote><h2>Kesimpulan</h2><p>Investasi <em>smart home</em> memang tidak selalu meningkatkan harga jual rumah secara drastis. Namun, fitur-fitur tersebut mampu memberikan nilai tambah yang membuat properti lebih menarik dibandingkan rumah lain di kelas yang sama.</p><p>Dengan kombinasi efisiensi energi, keamanan yang lebih baik, dan kemudahan penggunaan, rumah yang dilengkapi teknologi <em>smart home</em> memiliki peluang lebih besar untuk menarik perhatian calon pembeli dan terjual lebih cepat di pasaran.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200&q=80', 57, '2026-06-25 03:57:35.434', 'Tips Properti'),
('cmqsz1e8c0039v5rwyzpxnwte', '7 Tips Memaksimalkan Tampilan Properti agar Cepat Terjual', '7-tips-memaksimalkan-tampilan-properti-agar-cepat-terjual', '<h2>1. Perbaiki Kerusakan Kecil</h2><p>Sebelum mengambil foto atau menerima calon pembeli, pastikan semua kerusakan kecil sudah diperbaiki. Hal-hal sepele seperti keran yang bocor, engsel pintu yang berderit, atau cat dinding yang mengelupas bisa mengurangi nilai jual. Calon pembeli akan merasa rumah tersebut kurang terawat jika mereka melihat banyak kerusakan.</p><h2>2. Bersihkan Secara Menyeluruh (<em>Deep Cleaning</em>)</h2><p>Rumah yang bersih selalu terlihat lebih luas dan cerah. Bersihkan debu di setiap sudut, sela-sela jendela, karpet, hingga kamar mandi. Bila perlu, sewa jasa pembersih profesional untuk memastikan setiap jengkal rumah Anda terlihat tanpa noda.</p><h2>3. Buat Ruangan Terlihat Netral</h2><p>Setiap orang punya selera dekorasi yang berbeda. Namun, saat menjual properti, usahakan warna cat dan perabotan bersifat netral (seperti putih, krem, atau abu-abu muda). Ini membantu calon pembeli lebih mudah membayangkan barang-barang mereka sendiri di dalam rumah tersebut.</p><h2>4. Maksimalkan Pencahayaan</h2><p>Ruangan yang gelap memberi kesan sempit dan suram. Buka semua tirai dan biarkan cahaya matahari masuk sebanyak mungkin. Jika ada ruangan yang kurang cahaya alami, pasanglah lampu dengan warna terang (<em>cool white</em> atau <em>warm white</em>) untuk menonjolkan fitur terbaik ruangan tersebut.</p><h2>5. Gunakan Fotografi Profesional dan <em>Virtual Tour</em> 360°</h2><p>Di era digital, pembeli pertama kali melihat properti Anda secara <em>online</em>. Foto buram dan gelap akan membuat properti Anda diabaikan. Gunakan jasa fotografer properti dan teknologi <em>Virtual Tour</em> 360° agar calon pembeli bisa melihat seluruh sudut rumah secara interaktif.</p><blockquote><p><strong>Tahukah Anda?</strong></p><p><em>Listing</em> dengan <em>Virtual Tour</em> memiliki peluang 40% lebih tinggi untuk diklik oleh calon pembeli dibandingkan dengan <em>listing</em> yang hanya menggunakan foto biasa.</p></blockquote><h2>6. Rapi dan Kurangi Barang Pribadi (<em>Decluttering</em>)</h2><p>Singkirkan foto keluarga, koleksi pribadi, dan barang-barang yang berserakan. Rumah yang terlalu banyak barang akan terasa sesak. Menyimpan barang pribadi juga membantu menjaga privasi Anda selama proses jual beli.</p><h2>7. Percantik Tampilan Luar (<em>Curb Appeal</em>)</h2><p>Bagian luar rumah adalah hal pertama yang dilihat oleh pembeli saat berkunjung. Rapikan rumput, pangkas tanaman yang terlalu rimbun, bersihkan jalan masuk, dan pastikan pagar serta nomor rumah terlihat jelas. Sedikit sentuhan seperti pot bunga baru di depan pintu dapat memberikan kesan hangat dan menyambut.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', 370058, '2026-06-25 03:57:35.437', 'Virtual Tour'),
('cmqth3f6g0000v5y45c28owfn', '10 Tips Fotografi Properti untuk Meningkatkan Penjualan', 'tips-fotografi-properti', 'Fotografi properti yang baik adalah kunci untuk menarik perhatian calon pembeli. Pastikan pencahayaan cukup, gunakan lensa wide, dan selalu rapikan ruangan sebelum mengambil foto. Gambar yang terang dan jernih dapat meningkatkan minat pembeli hingga 60%.', 'Admin Rumio', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800', 58, '2026-06-25 12:23:03.064', 'Tips Properti'),
('cmqth3f6k0001v5y48dauhfud', 'Memaksimalkan Penggunaan Virtual Tour 360', 'memaksimalkan-virtual-tour', 'Virtual tour 360 memberikan pengalaman interaktif bagi calon pembeli tanpa harus datang ke lokasi. Dengan teknologi ini, agen properti dapat menyaring klien yang benar-benar serius, menghemat waktu survei, dan mempercepat proses closing.', 'Admin Rumio', 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&q=80&w=800', 54, '2026-06-25 12:23:03.069', 'Virtual Tour'),
('cmqth3f6r0002v5y4dh1o6g2w', 'Strategi Marketing Properti di Era Digital', 'strategi-marketing-digital', '<p>Perkembangan teknologi telah mengubah cara masyarakat mencari dan membeli properti. Jika dahulu pemasaran mengandalkan brosur, spanduk, atau iklan di media cetak, kini sebagian besar calon pembeli memulai pencarian melalui internet. Oleh karena itu, agen dan pengembang properti perlu mengadopsi strategi pemasaran digital agar dapat menjangkau lebih banyak calon pelanggan.</p><p>Dengan memanfaatkan berbagai platform digital secara optimal, Anda tidak hanya meningkatkan visibilitas properti, tetapi juga membangun kepercayaan dan memperbesar peluang terjadinya transaksi.</p><h2>1. Maksimalkan Media Sosial</h2><p>Media sosial menjadi salah satu saluran pemasaran paling efektif karena mampu menjangkau audiens dalam jumlah besar dengan biaya yang relatif terjangkau.</p><p>Platform yang dapat dimanfaatkan antara lain:</p><ul><li><p>Instagram</p></li><li><p>Facebook</p></li><li><p>TikTok</p></li><li><p>YouTube</p></li><li><p>LinkedIn (untuk properti komersial)</p></li></ul><p>Unggah konten secara konsisten, mulai dari foto berkualitas tinggi, video tur properti, hingga testimoni pelanggan agar akun terlihat aktif dan profesional.</p><h2>2. Buat Konten Video Pendek</h2><p>Konten video singkat seperti <strong>Instagram Reels</strong>, <strong>TikTok</strong>, dan <strong>YouTube Shorts</strong> terbukti memiliki jangkauan yang sangat luas.</p><p>Beberapa ide konten yang bisa dibuat:</p><ul><li><p>House tour berdurasi 30–60 detik.</p></li><li><p>Before &amp; after renovasi rumah.</p></li><li><p>Menampilkan fasilitas unggulan di sekitar properti.</p></li><li><p>Tips membeli rumah pertama.</p></li><li><p>Proses serah terima rumah kepada pembeli.</p></li></ul><p>Pastikan video diawali dengan tampilan yang menarik agar penonton tertarik untuk menyaksikan hingga selesai.</p><h2>3. Optimalkan Website dengan SEO</h2><p>Website yang dioptimalkan menggunakan teknik <strong>Search Engine Optimization (SEO)</strong> akan lebih mudah ditemukan oleh calon pembeli melalui mesin pencari seperti Google.</p><p>Beberapa langkah yang dapat dilakukan:</p><ul><li><p>Gunakan kata kunci yang relevan.</p></li><li><p>Buat artikel informatif seputar properti.</p></li><li><p>Optimalkan kecepatan website.</p></li><li><p>Gunakan foto berkualitas dengan ukuran yang sesuai.</p></li><li><p>Lengkapi setiap listing dengan deskripsi yang jelas.</p></li></ul><p>SEO merupakan strategi jangka panjang yang dapat mendatangkan pengunjung secara organik tanpa harus selalu mengandalkan iklan berbayar.</p><h2>4. Pasang Listing di Platform Properti</h2><p>Selain website pribadi, manfaatkan platform listing properti untuk memperluas jangkauan pemasaran.</p><p>Pastikan setiap listing memiliki:</p><ul><li><p>Foto berkualitas tinggi.</p></li><li><p>Deskripsi yang informatif.</p></li><li><p>Harga yang jelas.</p></li><li><p>Spesifikasi lengkap.</p></li><li><p>Informasi kontak yang mudah dihubungi.</p></li></ul><p>Listing yang lengkap dan profesional akan meningkatkan minat calon pembeli untuk menghubungi Anda.</p><h2>5. Gunakan Iklan Digital</h2><p>Iklan digital memungkinkan Anda menjangkau target pasar yang lebih spesifik berdasarkan lokasi, usia, minat, hingga perilaku pengguna.</p><p>Beberapa platform iklan yang dapat dimanfaatkan meliputi:</p><ul><li><p>Google Ads</p></li><li><p>Meta Ads (Facebook &amp; Instagram)</p></li><li><p>TikTok Ads</p></li></ul><p>Dengan strategi yang tepat, iklan digital dapat menghasilkan prospek berkualitas dan meningkatkan peluang penjualan.</p><h2>6. Bangun Kepercayaan Melalui Konten Edukasi</h2><p>Tidak semua konten harus berisi promosi. Calon pembeli juga membutuhkan informasi yang membantu mereka mengambil keputusan.</p><p>Contoh konten edukatif:</p><ul><li><p>Cara memilih rumah pertama.</p></li><li><p>Tips mengajukan KPR.</p></li><li><p>Perbedaan rumah baru dan rumah bekas.</p></li><li><p>Panduan investasi properti.</p></li><li><p>Kesalahan yang sering dilakukan saat membeli rumah.</p></li></ul><p>Konten edukasi dapat meningkatkan kredibilitas Anda sebagai agen atau pengembang properti.</p><h2>7. Manfaatkan Virtual Tour</h2><p>Virtual Tour memberikan pengalaman kepada calon pembeli untuk menjelajahi setiap sudut properti secara online.</p><p>Keunggulannya antara lain:</p><ul><li><p>Memberikan pengalaman yang lebih interaktif.</p></li><li><p>Meningkatkan kepercayaan calon pembeli.</p></li><li><p>Menghemat waktu survei.</p></li><li><p>Menjangkau pembeli dari luar kota maupun luar negeri.</p></li></ul><p>Teknologi ini juga membantu menyaring calon pembeli yang benar-benar serius sebelum melakukan kunjungan langsung.</p><h2>8. Bangun Hubungan dengan Calon Pembeli</h2><p>Keberhasilan pemasaran digital tidak hanya bergantung pada jumlah pengunjung, tetapi juga pada bagaimana Anda menjaga komunikasi dengan calon pelanggan.</p><p>Beberapa cara yang dapat dilakukan:</p><ul><li><p>Respon pertanyaan dengan cepat.</p></li><li><p>Follow up secara profesional.</p></li><li><p>Berikan informasi yang lengkap dan jujur.</p></li><li><p>Bangun hubungan melalui email atau WhatsApp.</p></li></ul><p>Pelayanan yang baik akan meningkatkan kepercayaan dan peluang terjadinya closing.</p><h2>Penutup</h2><p>Di era digital, keberhasilan pemasaran properti tidak lagi hanya bergantung pada lokasi strategis atau harga yang kompetitif. Agen dan pengembang perlu memanfaatkan media sosial, SEO, platform listing, iklan digital, serta konten video pendek untuk menjangkau lebih banyak calon pembeli.</p><p>Dengan menggabungkan strategi pemasaran digital yang tepat dan pelayanan yang profesional, Anda dapat membangun kepercayaan, meningkatkan jumlah prospek berkualitas, dan memperbesar peluang closing di tengah persaingan pasar properti yang semakin kompetitif.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', 57, '2026-06-25 12:23:03.076', 'Marketing Properti'),
('cmqth3f6u0003v5y4nymwisw8', 'Panduan Memilih Properti untuk Investasi', 'panduan-investasi-properti', '<p>Investasi properti masih menjadi salah satu pilihan favorit bagi banyak orang karena nilainya yang cenderung meningkat dari waktu ke waktu. Selain berpotensi memberikan keuntungan melalui kenaikan harga (capital gain), properti juga dapat menghasilkan pendapatan pasif dari hasil sewa. Namun, agar investasi memberikan hasil yang optimal, Anda perlu memilih properti dengan cermat.</p><p>Berikut beberapa hal penting yang perlu diperhatikan sebelum membeli properti untuk investasi.</p><h2>1. Tentukan Tujuan Investasi</h2><p>Langkah pertama adalah menentukan tujuan investasi. Apakah Anda ingin memperoleh keuntungan dari kenaikan harga dalam jangka panjang, mendapatkan penghasilan rutin dari penyewaan, atau keduanya.</p><p>Dengan tujuan yang jelas, Anda akan lebih mudah menentukan jenis properti yang sesuai, seperti rumah, apartemen, ruko, atau tanah.</p><h2>2. Perhatikan Lokasi</h2><p>Lokasi merupakan faktor terpenting dalam investasi properti. Properti di lokasi yang strategis umumnya memiliki permintaan yang lebih tinggi dan nilai yang terus meningkat.</p><p>Pilih lokasi yang memiliki akses mudah ke:</p><ul><li><p>Jalan utama.</p></li><li><p>Transportasi umum.</p></li><li><p>Sekolah dan kampus.</p></li><li><p>Rumah sakit.</p></li><li><p>Pusat perbelanjaan.</p></li><li><p>Kawasan perkantoran atau industri.</p></li></ul><p>Semakin berkembang suatu kawasan, semakin besar pula potensi kenaikan nilai propertinya.</p><h2>3. Pelajari Potensi Pertumbuhan Wilayah</h2><p>Jangan hanya melihat kondisi saat ini, tetapi juga perhatikan rencana pengembangan wilayah di masa depan.</p><p>Beberapa indikator yang dapat meningkatkan nilai properti antara lain:</p><ul><li><p>Pembangunan jalan tol.</p></li><li><p>Stasiun atau terminal baru.</p></li><li><p>Kawasan bisnis.</p></li><li><p>Pusat pendidikan.</p></li><li><p>Fasilitas umum baru.</p></li></ul><p>Investasi di kawasan yang sedang berkembang sering kali memberikan keuntungan yang lebih besar dalam beberapa tahun ke depan.</p><h2>4. Sesuaikan dengan Anggaran</h2><p>Pastikan harga properti sesuai dengan kemampuan finansial Anda. Selain harga pembelian, perhitungkan juga biaya lain seperti:</p><ul><li><p>Pajak.</p></li><li><p>Biaya notaris.</p></li><li><p>Balik nama sertifikat.</p></li><li><p>Renovasi.</p></li><li><p>Perawatan.</p></li><li><p>Asuransi.</p></li></ul><p>Dengan perencanaan keuangan yang baik, investasi akan lebih aman dan tidak membebani kondisi finansial Anda.</p><h2>5. Periksa Legalitas Properti</h2><p>Legalitas merupakan aspek yang tidak boleh diabaikan. Pastikan seluruh dokumen kepemilikan lengkap dan sah sebelum melakukan transaksi.</p><p>Beberapa dokumen yang perlu diperiksa meliputi:</p><ul><li><p>Sertifikat hak atas tanah.</p></li><li><p>Izin Mendirikan Bangunan (IMB) atau Persetujuan Bangunan Gedung (PBG) sesuai ketentuan yang berlaku.</p></li><li><p>Bukti pembayaran Pajak Bumi dan Bangunan (PBB).</p></li><li><p>Dokumen pendukung lainnya.</p></li></ul><p>Legalitas yang jelas akan mengurangi risiko sengketa di kemudian hari.</p><h2>6. Analisis Potensi Keuntungan</h2><p>Sebelum membeli, lakukan perhitungan sederhana mengenai potensi keuntungan investasi.</p><p>Pertimbangkan beberapa aspek berikut:</p><ul><li><p>Perkiraan kenaikan harga properti.</p></li><li><p>Potensi pendapatan dari penyewaan.</p></li><li><p>Tingkat permintaan di lokasi tersebut.</p></li><li><p>Biaya operasional dan perawatan.</p></li></ul><p>Analisis ini membantu Anda mengetahui apakah investasi tersebut layak dilakukan.</p><h2>7. Pilih Pengembang yang Terpercaya</h2><p>Jika membeli properti baru, pastikan pengembang memiliki reputasi yang baik dan rekam jejak yang jelas.</p><p>Pengembang terpercaya biasanya menawarkan:</p><ul><li><p>Proyek selesai tepat waktu.</p></li><li><p>Kualitas bangunan yang baik.</p></li><li><p>Legalitas yang lengkap.</p></li><li><p>Layanan purna jual yang memadai.</p></li></ul><p>Hal ini akan memberikan rasa aman selama proses pembelian hingga serah terima properti.</p><h2>8. Jangan Terburu-buru Mengambil Keputusan</h2><p>Investasi properti merupakan keputusan jangka panjang. Karena itu, luangkan waktu untuk membandingkan beberapa pilihan sebelum membeli.</p><p>Lakukan survei lokasi, bandingkan harga dengan properti sejenis, dan konsultasikan dengan agen properti atau konsultan yang berpengalaman jika diperlukan.</p><h2>Kesalahan yang Perlu Dihindari</h2><p>Agar investasi lebih menguntungkan, hindari beberapa kesalahan berikut:</p><ul><li><p>Membeli hanya karena harga murah.</p></li><li><p>Mengabaikan legalitas properti.</p></li><li><p>Tidak melakukan survei lokasi.</p></li><li><p>Tidak menghitung seluruh biaya tambahan.</p></li><li><p>Mengikuti tren tanpa melakukan riset.</p></li></ul><p>Menghindari kesalahan-kesalahan tersebut dapat membantu meminimalkan risiko investasi.</p><h2>Penutup</h2><p>Memilih properti untuk investasi memerlukan perencanaan dan analisis yang matang. Faktor seperti lokasi, potensi perkembangan wilayah, legalitas, kondisi finansial, serta prospek keuntungan harus menjadi pertimbangan utama sebelum melakukan pembelian.</p><p>Dengan memilih properti yang tepat dan melakukan riset secara menyeluruh, Anda dapat membangun investasi yang berpotensi memberikan keuntungan jangka panjang sekaligus menjadi aset bernilai tinggi di masa depan.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800', 56, '2026-06-25 12:23:03.079', 'Investasi'),
('cmqth3f6x0004v5y4mxx6tuqx', 'Masa Depan Teknologi dalam Real Estate', 'teknologi-real-estate', '<h2>Masa Depan Teknologi dalam Real Estate</h2><p>Perkembangan teknologi terus membawa perubahan besar dalam industri real estate. Jika dahulu proses jual beli properti mengandalkan kunjungan langsung dan negosiasi tatap muka, kini berbagai inovasi digital membuat transaksi menjadi lebih cepat, mudah, dan efisien. Di masa depan, teknologi diperkirakan akan memainkan peran yang semakin penting dalam membantu pembeli, penjual, maupun agen properti.</p><p>Salah satu teknologi yang mulai banyak dimanfaatkan adalah <strong>Artificial Intelligence (AI)</strong>. AI mampu menganalisis data pasar dalam jumlah besar untuk membantu memprediksi tren dan fluktuasi harga properti. Dengan informasi tersebut, pembeli dapat menentukan waktu terbaik untuk membeli, sementara penjual dan investor dapat menyusun strategi yang lebih tepat berdasarkan kondisi pasar.</p><p>Selain AI, <strong>Virtual Reality (VR)</strong> juga menghadirkan pengalaman baru dalam mencari hunian. Melalui teknologi ini, calon pembeli dapat melakukan tur virtual dan melihat desain rumah secara realistis, bahkan sebelum proses pembangunan selesai. Hal ini memudahkan mereka memahami tata ruang, ukuran ruangan, hingga konsep desain tanpa harus datang langsung ke lokasi.</p><p>Beberapa manfaat teknologi dalam dunia real estate antara lain:</p><ul><li><p>Mempermudah pencarian properti yang sesuai dengan kebutuhan.</p></li><li><p>Membantu analisis harga dan tren pasar secara lebih akurat.</p></li><li><p>Menghemat waktu melalui tur virtual tanpa harus mengunjungi banyak lokasi.</p></li><li><p>Meningkatkan transparansi informasi mengenai kondisi dan spesifikasi properti.</p></li><li><p>Mempercepat proses pemasaran dan transaksi antara penjual dengan pembeli.</p></li></ul><p>Ke depannya, integrasi AI, VR, serta teknologi digital lainnya diperkirakan akan membuat pengalaman membeli dan menjual properti menjadi semakin praktis. Agen properti juga dapat memberikan layanan yang lebih personal melalui rekomendasi berbasis data, sementara pembeli memperoleh informasi yang lebih lengkap untuk mengambil keputusan.</p><p>Dengan semakin pesatnya perkembangan teknologi, industri real estate akan terus bertransformasi menjadi lebih modern, efisien, dan berorientasi pada kebutuhan pengguna. Mereka yang mampu memanfaatkan teknologi sejak dini akan memiliki keunggulan dalam menghadapi persaingan di masa depan.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', 139, '2026-06-25 12:23:03.082', 'Teknologi'),
('cmqth3f730006v5y4huf122vi', 'Cara Menata Interior Rumah Sempit', 'tips-interior-rumah', '<p>Memiliki rumah berukuran kecil bukan berarti Anda harus mengorbankan kenyamanan atau keindahan. Dengan penataan interior yang tepat, rumah sempit dapat terasa lebih luas, rapi, dan tetap fungsional untuk seluruh anggota keluarga.</p><p>Kuncinya bukan hanya memilih furnitur yang tepat, tetapi juga memanfaatkan setiap sudut ruangan secara maksimal. Berikut beberapa cara menata interior rumah sempit yang bisa Anda terapkan.</p><h2>1. Pilih Warna Cerah untuk Dinding</h2><p>Warna memiliki pengaruh besar terhadap kesan sebuah ruangan. Dinding dengan warna terang mampu memantulkan cahaya lebih baik sehingga ruangan terasa lebih lapang.</p><p>Pilihan warna yang cocok antara lain:</p><ul><li><p>Putih</p></li><li><p>Broken white</p></li><li><p>Cream</p></li><li><p>Beige</p></li><li><p>Abu-abu muda</p></li><li><p>Pastel</p></li></ul><p>Anda juga dapat menambahkan aksen warna pada dekorasi tanpa membuat ruangan terasa sesak.</p><h2>2. Gunakan Furnitur Multifungsi</h2><p>Pada rumah dengan ruang terbatas, setiap furnitur sebaiknya memiliki lebih dari satu fungsi.</p><p>Beberapa contohnya:</p><ul><li><p>Tempat tidur dengan laci penyimpanan.</p></li><li><p>Meja makan lipat.</p></li><li><p>Sofa bed.</p></li><li><p>Ottoman yang dapat digunakan sebagai tempat penyimpanan.</p></li><li><p>Meja kerja yang bisa dilipat ke dinding.</p></li></ul><p>Dengan furnitur multifungsi, ruang menjadi lebih efisien tanpa mengurangi kenyamanan.</p><h2>3. Maksimalkan Penyimpanan Vertikal</h2><p>Jangan hanya memanfaatkan area lantai. Gunakan dinding sebagai ruang penyimpanan tambahan.</p><p>Beberapa ide yang bisa diterapkan:</p><ul><li><p>Rak dinding.</p></li><li><p>Lemari hingga plafon.</p></li><li><p>Floating shelf.</p></li><li><p>Gantungan serbaguna.</p></li><li><p>Rak sudut.</p></li></ul><p>Penyimpanan vertikal membantu menjaga lantai tetap lega sehingga rumah terlihat lebih luas.</p><h2>4. Kurangi Dekorasi yang Berlebihan</h2><p>Dekorasi memang mempercantik rumah, tetapi terlalu banyak aksesori justru membuat ruangan terasa penuh.</p><p>Pilih beberapa dekorasi yang benar-benar menarik perhatian, misalnya:</p><ul><li><p>Lukisan sederhana.</p></li><li><p>Tanaman hias kecil.</p></li><li><p>Vas bunga minimalis.</p></li><li><p>Jam dinding modern.</p></li></ul><p>Konsep minimalis akan membuat ruangan terlihat lebih bersih dan elegan.</p><h2>5. Manfaatkan Cahaya Alami</h2><p>Rumah yang terang selalu terasa lebih luas dibandingkan rumah yang gelap.</p><p>Beberapa cara memaksimalkan pencahayaan alami:</p><ul><li><p>Gunakan jendela berukuran besar.</p></li><li><p>Hindari menutup jendela dengan furnitur tinggi.</p></li><li><p>Pilih tirai tipis yang tetap memberikan privasi.</p></li><li><p>Bersihkan kaca jendela secara rutin.</p></li></ul><p>Selain membuat rumah lebih nyaman, pencahayaan alami juga membantu menghemat penggunaan listrik di siang hari.</p><h2>6. Gunakan Cermin untuk Memberi Ilusi Ruang</h2><p>Cermin merupakan salah satu trik interior yang paling efektif untuk rumah sempit.</p><p>Letakkan cermin pada:</p><ul><li><p>Ruang tamu.</p></li><li><p>Area makan.</p></li><li><p>Lorong rumah.</p></li><li><p>Dekat jendela.</p></li></ul><p>Pantulan cahaya dari cermin akan membuat ruangan tampak dua kali lebih luas.</p><h2>7. Pilih Furnitur dengan Desain Minimalis</h2><p>Hindari furnitur yang terlalu besar atau memiliki banyak ornamen.</p><p>Sebaiknya pilih furnitur dengan ciri-ciri berikut:</p><ul><li><p>Bentuk sederhana.</p></li><li><p>Kaki yang ramping.</p></li><li><p>Warna netral.</p></li><li><p>Ukuran proporsional.</p></li></ul><p>Furnitur minimalis memberikan kesan ringan sehingga ruangan tidak terasa penuh.</p><h2>8. Gunakan Konsep Open Space</h2><p>Jika memungkinkan, gabungkan beberapa area tanpa sekat permanen.</p><p>Contohnya:</p><ul><li><p>Ruang tamu dengan ruang makan.</p></li><li><p>Ruang makan dengan dapur.</p></li><li><p>Area keluarga dengan ruang kerja kecil.</p></li></ul><p>Konsep open space membuat sirkulasi udara dan cahaya menjadi lebih baik sekaligus memberikan kesan luas.</p><h2>9. Jaga Kerapian Setiap Hari</h2><p>Interior yang rapi selalu terlihat lebih nyaman dibandingkan ruangan yang dipenuhi barang.</p><p>Biasakan untuk:</p><ul><li><p>Mengembalikan barang ke tempatnya.</p></li><li><p>Membersihkan permukaan meja.</p></li><li><p>Menyimpan barang yang jarang digunakan.</p></li><li><p>Melakukan decluttering secara berkala.</p></li></ul><p>Semakin sedikit barang yang terlihat, semakin lega pula kesan ruangan.</p><h2>10. Pilih Tirai dan Karpet yang Tepat</h2><p>Tirai dan karpet juga memengaruhi tampilan ruangan.</p><p>Tips memilihnya:</p><ul><li><p>Gunakan tirai panjang hingga menyentuh lantai agar plafon terlihat lebih tinggi.</p></li><li><p>Pilih warna senada dengan dinding.</p></li><li><p>Gunakan karpet berukuran proporsional.</p></li><li><p>Hindari motif yang terlalu ramai.</p></li></ul><p>Kombinasi ini mampu menciptakan tampilan interior yang lebih harmonis.</p><h2>Kesalahan yang Sebaiknya Dihindari</h2><p>Saat menata rumah sempit, hindari beberapa kesalahan berikut:</p><ul><li><p>Menggunakan terlalu banyak furnitur.</p></li><li><p>Memilih warna gelap pada seluruh ruangan.</p></li><li><p>Menempatkan barang di setiap sudut rumah.</p></li><li><p>Mengabaikan pencahayaan alami.</p></li><li><p>Membeli furnitur tanpa mengukur ukuran ruangan terlebih dahulu.</p></li></ul><p>Dengan menghindari kesalahan tersebut, rumah akan terasa jauh lebih nyaman untuk ditempati.</p><h2>Penutup</h2><p>Rumah berukuran kecil tetap dapat menjadi tempat tinggal yang nyaman dan menarik apabila ditata dengan baik. Pemilihan warna yang tepat, penggunaan furnitur multifungsi, pencahayaan alami, serta penyimpanan yang efisien merupakan beberapa langkah sederhana yang dapat memberikan perubahan besar pada tampilan rumah.</p><p>Yang terpenting, sesuaikan desain interior dengan kebutuhan dan gaya hidup penghuni. Dengan begitu, setiap sudut rumah dapat dimanfaatkan secara optimal tanpa mengurangi kenyamanan maupun estetika.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800', 71, '2026-06-25 12:23:03.087', 'Tips Properti'),
('cmqth3f760007v5y4c8gpr6b2', 'Mengapa Virtual Tour Meningkatkan Closing?', 'virtual-tour-closing', '<p>Di era digital, calon pembeli tidak lagi puas hanya melihat beberapa foto properti. Mereka ingin mendapatkan gambaran yang lebih jelas sebelum memutuskan untuk menghubungi agen atau melakukan survei langsung. Inilah alasan mengapa <strong>Virtual Tour</strong> menjadi salah satu strategi pemasaran properti yang efektif untuk meningkatkan peluang closing.</p><p>Melalui Virtual Tour, calon pembeli dapat menjelajahi setiap ruangan secara interaktif, seolah-olah sedang berada langsung di dalam rumah. Pengalaman ini memberikan tingkat transparansi yang lebih tinggi dibandingkan foto atau video biasa.</p><p>Beberapa alasan Virtual Tour mampu meningkatkan tingkat closing antara lain:</p><ul><li><p><strong>Membangun kepercayaan calon pembeli</strong> karena kondisi properti dapat dilihat secara menyeluruh tanpa banyak yang disembunyikan.</p></li><li><p><strong>Memberikan pengalaman yang lebih interaktif</strong>, sehingga calon pembeli lebih mudah membayangkan tata letak dan ukuran setiap ruangan.</p></li><li><p><strong>Menghemat waktu</strong> bagi pembeli maupun agen karena hanya calon pembeli yang benar-benar tertarik yang akan melanjutkan ke tahap survei.</p></li><li><p><strong>Menjangkau pembeli dari luar kota atau luar negeri</strong> yang tidak dapat mengunjungi properti secara langsung.</p></li><li><p><strong>Meningkatkan kualitas prospek (lead)</strong> karena calon pembeli sudah memiliki gambaran yang jelas sebelum menghubungi agen.</p></li></ul><p>Dengan transparansi yang lebih baik, calon pembeli merasa lebih yakin terhadap properti yang ditawarkan. Rasa percaya ini membuat proses pengambilan keputusan menjadi lebih cepat, sehingga peluang terjadinya transaksi atau closing pun meningkat.</p><p>Bagi agen maupun pengembang properti, Virtual Tour bukan hanya menjadi nilai tambah dalam pemasaran, tetapi juga investasi yang dapat membantu meningkatkan konversi penjualan, mempercepat proses negosiasi, dan memberikan pengalaman yang lebih profesional kepada setiap calon pembeli.</p>', 'Admin Rumio', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800', 78, '2026-06-25 12:23:03.090', 'Virtual Tour'),
('cmqth3f790008v5y4y2881snc', 'Copywriting Efektif untuk Iklan Properti', 'copywriting-iklan-properti', 'Kata-kata yang Anda gunakan dalam iklan properti sangat menentukan. Jangan hanya menjual spesifikasi seperti jumlah kamar, tapi juallah \'lifestyle\' atau gaya hidup yang akan didapatkan penghuni nantinya.', 'Admin Rumio', 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=800', 82, '2026-06-25 12:23:03.093', 'Marketing Properti');

-- --------------------------------------------------------

--
-- Table structure for table `inquiry`
--

CREATE TABLE `inquiry` (
  `id` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `transactionType` varchar(191) NOT NULL,
  `propertyType` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'NEW',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `budgetOrPrice` varchar(191) DEFAULT NULL,
  `details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inquiry`
--

INSERT INTO `inquiry` (`id`, `type`, `name`, `phone`, `transactionType`, `propertyType`, `location`, `status`, `createdAt`, `budgetOrPrice`, `details`) VALUES
('cmquhtqea0000l4049l481m6q', 'CARI_PROPERTI', '3434', '233e4342343223', 'Sewa', 'Tanah', '324233434', 'CONTACTED', '2026-06-26 05:31:15.769', '43243423 - 32423', ''),
('cmqz001x1111aaaa', 'CARI_PROPERTI', 'Andi Wijaya', '081122334455', 'Beli', 'Rumah', 'Bintaro', 'NEW', '2026-06-26 04:52:30.000', '2.500.000.000', 'Cari rumah minimalis dekat stasiun jurangmangu.'),
('cmqz002x2222bbbb', 'TITIP_JUAL', 'Dewi Lestari', '081299887766', 'Jual', 'Tanah', 'Bogor', 'CONTACTED', '2026-06-26 04:52:30.000', '450.000.000', 'Luas 120m2, sertifikat SHM, lokasi dekat pintu tol.'),
('cmqz003x3333cccc', 'CARI_PROPERTI', 'Rian Hidayat', '087855554433', 'Sewa', 'Apartemen', 'Jakarta Barat', 'NEW', '2026-06-26 04:52:30.000', '5.000.000 / bulan', 'Butuh studio atau 1 BR fully furnished dekat kampus.'),
('cmqz004x4444dddd', 'TITIP_JUAL', 'Bambang Susilo', '081344445555', 'Jual', 'Ruko', 'Serpong', 'CONTACTED', '2026-06-26 04:52:30.000', '3.200.000.000', 'Ruko 3 lantai di area komersial ramai, cocok untuk usaha.'),
('cmqz005x5555eeee', 'CARI_PROPERTI', 'Santi Rahayu', '085211223344', 'Beli', 'Rumah', 'Bekasi Timur', 'NEW', '2026-06-26 04:52:30.000', '800.000.000 - 1.000.000.000', 'Cari rumah cluster bebas banjir, siap huni.'),
('cmqz006x6666ffff', 'TITIP_JUAL', 'Hendra Wijaya', '081900112233', 'Sewa', 'Rumah', 'Depok', 'CONTACTED', '2026-06-26 04:52:30.000', '35.000.000 / tahun', 'Dikontrakkan rumah 3 kamar tidur, kosongan, lingkungan aman.'),
('cmqz007x7777gggg', 'CARI_PROPERTI', 'Citra Kirana', '082199881122', 'Beli', 'Tanah', 'Bandung', 'CONTACTED', '2026-06-26 04:52:30.000', '1.200.000.000', 'Cari kavling siap bangun di kawasan Dago atau Setiabudi.'),
('cmqz008x8888hhhh', 'TITIP_JUAL', 'Ahmad Fauzi', '081255556666', 'Jual', 'Rumah', 'Jakarta Timur', 'NEW', '2026-06-26 04:52:30.000', '1.750.000.000', 'Rumah tua hitung tanah, lokasi strategis dekat jalan utama.'),
('cmqz009x9999iiii', 'CARI_PROPERTI', 'Diana Putri', '087712345678', 'Sewa', 'Ruko', 'Tangerang', 'CONTACTED', '2026-06-26 04:52:30.000', '60.000.000 / tahun', 'Cari ruko minimal 2 lantai untuk buka cabang klinik kecantikan.'),
('cmqz010x0000jjjj', 'TITIP_JUAL', 'Eko Prasetyo', '081388889999', 'Jual', 'Apartemen', 'Jakarta Selatan', 'CONTACTED', '2026-06-26 04:52:30.000', '2.100.000.000', 'Unit 2 BR di Sudirman Mansion, view kota bagus.');

-- --------------------------------------------------------

--
-- Table structure for table `mediaasset`
--

CREATE TABLE `mediaasset` (
  `id` varchar(191) NOT NULL,
  `filename` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL,
  `mimeType` varchar(191) NOT NULL,
  `size` int(11) NOT NULL,
  `altText` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mediaasset`
--

INSERT INTO `mediaasset` (`id`, `filename`, `url`, `mimeType`, `size`, `altText`, `createdAt`) VALUES
('cmqw26bhz0000v5u0djg18gd6', 'Banner-cluster-asri-bintaro.webp', '/uploads/media/1782546521440-340199091-Banner-cluster-asri-bintaro.webp', 'image/webp', 205292, NULL, '2026-06-27 07:48:41.949'),
('cmqw26cf10001v5u0yxfnrq6h', 'Banner-villa-dengan-kolam-__1_.webp', '/uploads/media/1782546522923-940722095-Banner-villa-dengan-kolam-__1_.webp', 'image/webp', 52252, NULL, '2026-06-27 07:48:42.999'),
('cmqw26d200002v5u0xychg6ch', 'Banner-villa-dengan-kolam-.webp', '/uploads/media/1782546524490-898188622-Banner-villa-dengan-kolam-.webp', 'image/webp', 52252, NULL, '2026-06-27 07:48:44.569'),
('cmqw26db60003v5u0tkkr13bl', 'Untitled-1.webp', '/uploads/media/1782546524792-841955872-Untitled-1.webp', 'image/webp', 12342, NULL, '2026-06-27 07:48:44.898'),
('cmqw285rd0004v5u0jiv5uo76', 'shot-panoramic-composition-living-room__2_.webp', '/uploads/media/1782546606902-203932808-shot-panoramic-composition-living-room__2_.webp', 'image/webp', 776092, NULL, '2026-06-27 07:50:08.271'),
('cmqw287q00005v5u0zed18ord', 'shot-panoramic-composition-living-room__1_.webp', '/uploads/media/1782546609443-412188712-shot-panoramic-composition-living-room__1_.webp', 'image/webp', 931674, NULL, '2026-06-27 07:50:10.968'),
('cmqw289he0006v5u0sgi1x4tj', 'shot-panoramic-composition-living-room.webp', '/uploads/media/1782546611719-285254488-shot-panoramic-composition-living-room.webp', 'image/webp', 1031334, NULL, '2026-06-27 07:50:13.250'),
('cmqw28bvv0007v5u0s4xec898', 'bryan-goff-IuyhXAia8EA-unsplash.webp', '/uploads/media/1782546614219-894410940-bryan-goff-IuyhXAia8EA-unsplash.webp', 'image/webp', 2855924, NULL, '2026-06-27 07:50:16.364'),
('cmqw28d8j0008v5u01inhg4gs', 'timothy-oldfield-luufnHoChRU-unsplash.webp', '/uploads/media/1782546616921-871524030-timothy-oldfield-luufnHoChRU-unsplash.webp', 'image/webp', 590518, NULL, '2026-06-27 07:50:18.115');

-- --------------------------------------------------------

--
-- Table structure for table `packageorder`
--

CREATE TABLE `packageorder` (
  `id` varchar(191) NOT NULL,
  `planId` varchar(191) NOT NULL,
  `planName` varchar(191) NOT NULL,
  `customerName` varchar(191) NOT NULL,
  `whatsapp` varchar(191) NOT NULL,
  `propertyType` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `paymentMethod` varchar(191) NOT NULL,
  `totalPrice` double NOT NULL,
  `proofUrl` varchar(191) NOT NULL,
  `addons` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`addons`)),
  `status` varchar(191) NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `packageorder`
--

INSERT INTO `packageorder` (`id`, `planId`, `planName`, `customerName`, `whatsapp`, `propertyType`, `location`, `paymentMethod`, `totalPrice`, `proofUrl`, `addons`, `status`, `createdAt`) VALUES
('cmqxatd8d0000v5hw6dpewc42', 'pro', 'Pro', 'Adridinan Najmi Faza', 'najnsa', 'Rumah', 'Baturraden, Jawa Tengah', 'BCA', 2750000, '/uploads/payments/1782621499704-196502825-logo__2_.webp', '[\"Floor Plan 2D\"]', 'PENDING', '2026-06-28 04:38:20.957'),
('cmqy3bcac0000v5ywyycog1mo', 'pro', 'Pro', 'Adridinan Najmi Faza', '9887988o8', 'Rumah', 'Baturraden, Jawa Tengah', 'QRIS', 2750000, '/uploads/payments/1782669367121-35448346-Section-HeroPropertyScout.webp', '[\"Floor Plan 2D\"]', 'PENDING', '2026-06-28 17:56:08.747');

-- --------------------------------------------------------

--
-- Table structure for table `pricingfeature`
--

CREATE TABLE `pricingfeature` (
  `id` varchar(191) NOT NULL,
  `planId` varchar(191) NOT NULL,
  `text` varchar(191) NOT NULL,
  `tableValues` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tableValues`)),
  `sortOrder` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pricingfeature`
--

INSERT INTO `pricingfeature` (`id`, `planId`, `text`, `tableValues`, `sortOrder`) VALUES
('cmqt3yk350010v5ys4sfwhu4v', 'signature', 'Foto Profesional Unlimited', '[{\"label\":\"Foto Properti\",\"value\":\"Unlimited\"}]', 0),
('cmqt3yk380012v5ysfsi8w1oa', 'signature', 'Virtual Tour 360° (Advanced)', '[{\"label\":\"Virtual Tour 360°\",\"value\":\"Advanced\"}]', 1),
('cmqt3yk3c0014v5yshmz1tbqv', 'signature', 'Landing Page Custom Premium', '[{\"label\":\"Landing Page\",\"value\":\"Custom Premium\"}]', 2),
('cmqt3yk3f0016v5yszptxgqhg', 'signature', 'QR Code + QR Banner Premium', '[{\"label\":\"QR Code\",\"value\":true},{\"label\":\"QR Banner (Cetak)\",\"value\":true}]', 3),
('cmqt3yk3i0018v5ysqta3r7b7', 'signature', 'WhatsApp Virtual Assistant', '[{\"label\":\"WhatsApp Virtual Assistant\",\"value\":true}]', 4),
('cmqt3yk3l001av5ysjs91qjx0', 'signature', 'Form Lead & Manajemen Leads', '[]', 5),
('cmqt3yk3o001cv5ysp2wvxj6l', 'signature', 'Statistik & Analitik Lengkap', '[{\"label\":\"Statistik & Analitik\",\"value\":\"Lengkap\"}]', 6),
('cmqt3yk3r001ev5ys2je3csii', 'signature', 'Hosting 90 Hari', '[{\"label\":\"Hosting\",\"value\":\"90 Hari\"}]', 7),
('cmqt3yk3u001gv5ys1v1m6kic', 'signature', 'Feature di Halaman Beranda', '[{\"label\":\"Featured di Beranda\",\"value\":true}]', 8),
('cmqt3yk3w001iv5ystybbovrk', 'signature', 'Support VIP', '[{\"label\":\"Support\",\"value\":\"VIP\"}]', 9),
('cmquek00c000lv59kvsbdothu', 'pro', '30 Foto Properti Profesional', '[{\"label\":\"Foto Properti\",\"value\":\"30 Foto\"}]', 0),
('cmquek00c000mv59k47vj9zl2', 'pro', 'Virtual Tour 360° (Premium)', '[{\"label\":\"Virtual Tour 360°\",\"value\":\"Premium\"}]', 1),
('cmquek00c000nv59kntk3i7ik', 'pro', 'Landing Page Premium', '[{\"label\":\"Landing Page\",\"value\":\"Premium\"}]', 2),
('cmquek00c000ov59kmp4wsqfc', 'pro', 'QR Code + QR Banner (Cetak)', '[{\"label\":\"QR Code\",\"value\":true},{\"label\":\"QR Banner (Cetak)\",\"value\":true}]', 3),
('cmquek00c000pv59k8vrif6l9', 'pro', 'Integrasi WhatsApp Dinamis', '[{\"label\":\"Integrasi WhatsApp\",\"value\":true}]', 4),
('cmquek00c000qv59kv6goy1xu', 'pro', 'Form Lead & Manajemen Leads', '[]', 5),
('cmquek00c000rv59ktyl80106', 'pro', 'Statistik & Analitik Dasar', '[{\"label\":\"Statistik & Analitik\",\"value\":\"Dasar\"}]', 6),
('cmquek00c000sv59krs80fesw', 'pro', 'Hosting 60 Hari', '[{\"label\":\"Hosting\",\"value\":\"60 Hari\"}]', 7),
('cmquek00c000tv59k6kcgb1ci', 'pro', 'Support Prioritas', '[{\"label\":\"Support\",\"value\":\"Prioritas\"}]', 8),
('cmquelm1c0012v59kkygz2uc7', 'starter', '15 Foto Properti Profesional', '[{\"label\":\"Foto Properti\",\"value\":\"15 Foto\"}]', 0),
('cmquelm1c0013v59ki2w3e1f3', 'starter', 'Virtual Tour 360° (Basic)', '[{\"label\":\"Virtual Tour 360°\",\"value\":\"Basic\"}]', 1),
('cmquelm1c0014v59kt6gfenzc', 'starter', 'Landing Page Eksklusif', '[{\"label\":\"Landing Page\",\"value\":\"Standar\"}]', 2),
('cmquelm1c0015v59kob7helac', 'starter', 'QR Code Otomatis', '[{\"label\":\"QR Code\",\"value\":true}]', 3),
('cmquelm1c0016v59khyhcf6yn', 'starter', 'Integrasi WhatsApp', '[{\"label\":\"Integrasi WhatsApp\",\"value\":true}]', 4),
('cmquelm1c0017v59k7i38al46', 'starter', 'Form Lead & Manajemen Leads', '[]', 5),
('cmquelm1c0018v59k1ak5nlw9', 'starter', 'Hosting 30 Hari', '[{\"label\":\"Hosting\",\"value\":\"30 Hari\"}]', 6),
('cmquelm1c0019v59kelmp98zd', 'starter', 'Support via WhatsApp', '[{\"label\":\"Support\",\"value\":\"WhatsApp\"}]', 7);

-- --------------------------------------------------------

--
-- Table structure for table `pricingplan`
--

CREATE TABLE `pricingplan` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `icon` varchar(191) NOT NULL,
  `isPopular` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pricingplan`
--

INSERT INTO `pricingplan` (`id`, `name`, `description`, `price`, `icon`, `isPopular`, `createdAt`) VALUES
('pro', 'Pro', 'Paket paling seimbang untuk pemasaran properti optimal', 2500000, 'Crown', 1, '2026-06-25 03:57:35.259'),
('signature', 'Signature', 'Untuk properti premium dengan pemasaran maksimal', 4000000, 'Gem', 0, '2026-06-25 03:57:35.288'),
('starter', 'Starter', 'Cocok untuk properti pribadi atau listing sederhana', 1500000, 'Send', 0, '2026-06-25 03:57:35.219');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` varchar(191) NOT NULL,
  `ownerId` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `price` double NOT NULL,
  `location` varchar(191) NOT NULL,
  `propertyType` varchar(191) NOT NULL,
  `listingType` varchar(191) NOT NULL,
  `condition` varchar(191) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `bathrooms` int(11) NOT NULL,
  `floors` int(11) NOT NULL,
  `landArea` double NOT NULL,
  `buildingArea` double NOT NULL,
  `electricity` int(11) NOT NULL,
  `waterSupply` varchar(191) NOT NULL,
  `facing` varchar(191) NOT NULL,
  `buildYear` int(11) NOT NULL,
  `certificate` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `viewCount` int(11) NOT NULL DEFAULT 0,
  `virtualTourData` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`virtualTourData`)),
  `videoUrl` varchar(191) DEFAULT NULL,
  `featuredImage` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `highlights` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`highlights`)),
  `mapsUrl` text DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'AVAILABLE',
  `whatsappClicks` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `ownerId`, `title`, `slug`, `price`, `location`, `propertyType`, `listingType`, `condition`, `bedrooms`, `bathrooms`, `floors`, `landArea`, `buildingArea`, `electricity`, `waterSupply`, `facing`, `buildYear`, `certificate`, `description`, `viewCount`, `virtualTourData`, `videoUrl`, `featuredImage`, `createdAt`, `highlights`, `mapsUrl`, `status`, `whatsappClicks`) VALUES
('cmqsz1e5h001kv5rwmpc0xj61', 'cmqsyxzp40000v5rcbjhvkge0', 'Rumah Minimalis Modern', 'rumah-minimalis-modern', 875000000, 'Banyumas, Jawa Tengah', 'Rumah', 'Dijual', 'Baru', 3, 2, 1, 120, 90, 1300, 'PDAM', 'Timur', 2023, 'SHM', 'Rumah modern 1 lantai dengan desain minimalis yang elegan dan fungsional. Dilengkapi dengan pencahayaan alami yang optimal, sirkulasi udara baik, dan material berkualitas tinggi. Cocok untuk keluarga muda yang menginginkan kenyamanan dan gaya hidup modern.', 9, NULL, NULL, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80', '2026-06-25 03:57:35.333', '[\"Desain modern minimalis\",\"Lokasi strategis dekat pusat kota\",\"Lingkungan aman perumahan\",\"Dekat sekolah & fasilitas umum\",\"Akses mudah ke tol & transportasi umum\"]', NULL, 'AVAILABLE', 0),
('cmqsz1e61001yv5rwqe4xil1h', 'cmqsyxzp40000v5rcbjhvkge0', 'Villa dengan Kolam Renang', 'villa-dengan-kolam-renang', 2150000000, 'Baturraden, Jawa Tengah', 'Villa', 'Dijual', 'Baru', 4, 4, 2, 250, 200, 7700, 'PAM', 'Selatan', 2024, 'SHM', 'Villa mewah 2 lantai dengan kolam renang pribadi dan pemandangan alam Baturraden yang menakjubkan. Properti ini dirancang untuk kenyamanan premium dengan material high-end, taman luas, dan sistem keamanan modern. Ideal sebagai hunian eksklusif atau properti investasi.', 9, 'null', NULL, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', '2026-06-25 03:57:35.354', '[\"Kolam renang pribadi\",\"Pemandangan alam Baturraden\",\"Material interior high-end\",\"Taman luas & area BBQ\",\"Sistem keamanan CCTV 24 jam\"]', '', 'SOLD', 0),
('cmqsz1e6m002cv5rwr5imcpoo', 'cmqsyxzp40000v5rcbjhvkge0', 'Rumah Cluster Premium', 'rumah-cluster-premium', 1350000000, 'Purwokerto Utara', 'Rumah', 'Dijual', 'Baru', 3, 3, 2, 135, 110, 3500, 'PDAM', 'Barat', 2024, 'SHM', 'Rumah cluster 2 lantai di kawasan perumahan premium Purwokerto Utara. Desain modern kontemporer dengan ruang tamu luas, dapur open-plan, dan kamar tidur yang nyaman. Kawasan perumahan one gate system dengan keamanan 24 jam.', 2, NULL, NULL, 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80', '2026-06-25 03:57:35.374', '[\"Perumahan one gate system\",\"Desain kontemporer 2 lantai\",\"Dapur open-plan modern\",\"Dekat RS & mall\",\"Lingkungan asri & hijau\"]', '', 'AVAILABLE', 0),
('cmqsz1e74002qv5rwrcapmk78', 'cmqsyxzp40000v5rcbjhvkge0', 'Apartemen Studio Furnished', 'apartemen-studio-furnished', 450000000, 'Purwokerto Selatan', 'Apartemen', 'Dijual', 'Baru', 1, 3, 1, 36, 36, 900, 'PAM', 'Utara', 2022, 'HGB', 'Apartemen studio fully furnished di lokasi pusat Purwokerto Selatan. Cocok untuk profesional muda atau sebagai investasi properti dengan potensi sewa tinggi. Dilengkapi perabot lengkap, AC, dan akses ke fasilitas gym, kolam renang, dan co-working space.', 330, '{\"url\":\"https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg\"}', NULL, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80', '2026-06-25 03:57:35.392', '[\"Fully furnished siap huni\",\"Fasilitas gym & kolam renang\",\"Lokasi pusat kota strategis\",\"Potensi sewa tinggi\",\"Akses co-working space\"]', '<iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d8499.961544044441!2d109.34264420153119!3d-7.426937702658073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sid!2sid!4v1782363491764!5m2!1sid!2sid\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\"></iframe>', 'AVAILABLE', 0),
('cmqt3yk55001yv5ysg2l8bk90', 'cmqy46cbd0001v5ywqqbfdawe', 'Villa dengan Kolam Renang', 'villa-dengan-kolam-renang-1', 2150000000, 'Baturraden, Jawa Tengah', 'Villa', 'Dijual', 'Baru', 4, 4, 2, 250, 200, 7700, 'PAM', 'Selatan', 2024, 'SHM', 'Villa mewah 2 lantai dengan kolam renang pribadi dan pemandangan alam Baturraden yang menakjubkan. Properti ini dirancang untuk kenyamanan premium dengan material high-end, taman luas, dan sistem keamanan modern. Ideal sebagai hunian eksklusif atau properti investasi.', 40, '{\"nodes\":[{\"id\":\"node-1782546749819\",\"name\":\"INI\",\"panorama\":\"/uploads/media/1782546606902-203932808-shot-panoramic-composition-living-room__2_.webp\",\"links\":[]},{\"id\":\"node-1782546812058\",\"name\":\"inii\",\"panorama\":\"/uploads/media/1782546611719-285254488-shot-panoramic-composition-living-room.webp\",\"links\":[{\"nodeId\":\"node-1782546749819\",\"pitch\":-0.4861457099234934,\"yaw\":4.336462805637166,\"position\":{\"pitch\":-0.4861457099234934,\"yaw\":4.336462805637166}}]}],\"startNodeId\":\"node-1782546812058\"}', NULL, 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', '2026-06-25 06:15:21.210', '[\"Kolam renang pribadi\",\"Pemandangan alam Baturraden\",\"Material interior high-end\",\"Taman luas & area BBQ\",\"Sistem keamanan CCTV 24 jam\"]', '', 'AVAILABLE', 0),
('prop_dummy_01', 'cmqsyxzp40000v5rcbjhvkge0', 'Rumah Mewah Kebayoran', 'rumah-mewah-kebayoran', 8500000000, 'Kebayoran Baru, Jakarta Selatan', 'Rumah', 'Dijual', 'Baru', 5, 4, 2, 400, 350, 5500, 'PDAM', 'Utara', 2023, 'SHM', 'Rumah mewah siap huni di kawasan elit Kebayoran Baru. Dekat dengan pusat perbelanjaan dan sekolah internasional.', 0, NULL, NULL, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', '2026-06-29 16:12:34.000', NULL, NULL, 'AVAILABLE', 0),
('prop_dummy_02', 'cmqsyxzp40000v5rcbjhvkge0', 'Apartemen SCBD Sudirman', 'apartemen-scbd-sudirman', 25000000, 'SCBD, Jakarta Selatan', 'Apartemen', 'Disewa', 'Bagus', 2, 1, 1, 0, 75, 2200, 'PAM', 'Timur', 2018, 'Strata Title', 'Apartemen full furnished di jantung SCBD. Fasilitas lengkap: gym, kolam renang, dan akses langsung ke mall.', 1, NULL, NULL, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267', '2026-06-29 16:12:34.000', NULL, NULL, 'AVAILABLE', 0),
('prop_dummy_03', 'cmqsyxzp40000v5rcbjhvkge0', 'Ruko Strategis Kelapa Gading', 'ruko-strategis-kelapa-gading', 4200000000, 'Kelapa Gading, Jakarta Utara', 'Komersial', 'Dijual', 'Bagus', 0, 2, 3, 90, 270, 6600, 'PDAM', 'Selatan', 2015, 'HGB', 'Ruko 3 lantai di jalan utama Kelapa Gading. Sangat cocok untuk kantor, klinik, atau restoran. Parkir luas.', 0, NULL, NULL, 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7', '2026-06-29 16:12:34.000', NULL, NULL, 'AVAILABLE', 0),
('prop_dummy_04', 'cmqsyxzp40000v5rcbjhvkge0', 'Villa Tropis Puncak', 'villa-tropis-puncak', 3100000000, 'Cisarua, Bogor', 'Villa', 'Dijual', 'Renovasi', 4, 3, 2, 1000, 250, 3500, 'Sumur Bor', 'Barat', 2010, 'SHM', 'Villa dengan pemandangan pegunungan yang asri. Cocok untuk investasi penyewaan akhir pekan atau rumah singgah.', 0, NULL, NULL, 'https://images.unsplash.com/photo-1510798831971-661eb04b3739', '2026-06-29 16:12:34.000', NULL, NULL, 'AVAILABLE', 0),
('prop_dummy_05', 'cmqsyxzp40000v5rcbjhvkge0', 'Rumah Minimalis BSD', 'rumah-minimalis-bsd', 1800000000, 'BSD City, Tangerang', 'Rumah', 'Dijual', 'Baru', 3, 2, 2, 120, 100, 2200, 'PDAM', 'Timur', 2024, 'SHM', 'Rumah dalam cluster premium di BSD. Keamanan 24 jam, sistem smart home, dan dekat dengan tol.', 0, NULL, NULL, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', '2026-06-29 16:12:34.000', NULL, NULL, 'AVAILABLE', 0),
('prop_dummy_06', 'cmqsyxzp40000v5rcbjhvkge0', 'Tanah Kavling Komersial Alam Sutera', 'tanah-kavling-komersial-alam-sutera', 12500000000, 'Alam Sutera, Tangerang', 'Tanah', 'Dijual', '-', 0, 0, 0, 500, 0, 0, '-', '-', 0, 'HGB', 'Tanah kavling siap bangun di area komersial ramai Alam Sutera. Bebas banjir dan perizinan mudah.', 0, NULL, NULL, 'https://images.unsplash.com/photo-1500382017468-9049fed747ef', '2026-06-29 16:12:34.000', NULL, NULL, 'AVAILABLE', 0),
('prop_dummy_07', 'cmqsyxzp40000v5rcbjhvkge0', 'Gudang Logistik Cikarang', 'gudang-logistik-cikarang', 150000000, 'Kawasan Industri Cikarang, Bekasi', 'Komersial', 'Disewa', 'Bagus', 0, 2, 1, 2000, 1500, 11000, 'WTP', 'Utara', 2019, 'HGB', 'Gudang luas dengan akses masuk kontainer 40 feet. Lokasi strategis dekat dengan pintu tol Cikarang Barat.', 0, NULL, NULL, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d', '2026-06-29 16:12:34.000', NULL, NULL, 'AVAILABLE', 0),
('prop_dummy_08', 'cmqsyxzp40000v5rcbjhvkge0', 'Townhouse Eksklusif Kemang', 'townhouse-eksklusif-kemang', 6500000000, 'Kemang, Jakarta Selatan', 'Rumah', 'Dijual', 'Baru', 4, 4, 3, 250, 300, 4400, 'PDAM', 'Selatan', 2023, 'SHM', 'Townhouse dengan private pool di kawasan ekspatriat Kemang. Desain modern tropis dengan sirkulasi udara sangat baik.', 0, NULL, NULL, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde', '2026-06-29 16:12:34.000', NULL, NULL, 'AVAILABLE', 0),
('prop_dummy_09', 'cmqsyxzp40000v5rcbjhvkge0', 'Kost Eksklusif UI Depok', 'kost-eksklusif-ui-depok', 4500000000, 'Kukusan, Depok', 'Komersial', 'Dijual', 'Bagus', 20, 20, 3, 300, 600, 11000, 'Air Tanah', 'Timur', 2021, 'SHM', 'Investasi kost 20 kamar full occupied dekat kampus UI. Passive income stabil setiap bulan. Fasilitas wifi dan AC per kamar.', 0, NULL, NULL, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5', '2026-06-29 16:12:34.000', NULL, NULL, 'AVAILABLE', 0),
('prop_dummy_10', 'cmqsyxzp40000v5rcbjhvkge0', 'Rumah Subsidi Maja', 'rumah-subsidi-maja', 185000000, 'Maja, Lebak', 'Rumah', 'Dijual', 'Baru', 2, 1, 1, 60, 36, 1300, 'Sumur Bor', 'Barat', 2024, 'HGB', 'Rumah murah program subsidi pemerintah. Cicilan ringan, dekat dengan stasiun KRL Maja.', 0, NULL, NULL, 'https://images.unsplash.com/photo-1605276374104-a628b030b741', '2026-06-29 16:12:34.000', NULL, NULL, 'AVAILABLE', 0);

-- --------------------------------------------------------

--
-- Table structure for table `propertyimage`
--

CREATE TABLE `propertyimage` (
  `id` varchar(191) NOT NULL,
  `propertyId` varchar(191) NOT NULL,
  `imageUrl` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `caption` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `propertyimage`
--

INSERT INTO `propertyimage` (`id`, `propertyId`, `imageUrl`, `createdAt`, `caption`) VALUES
('cmqt3yk4o001mv5ysyeu88jk3', 'cmqsz1e5h001kv5rwmpc0xj61', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80', '2026-06-25 06:15:21.193', 'Tampak Depan'),
('cmqt3yk4s001ov5yscl34dnta', 'cmqsz1e5h001kv5rwmpc0xj61', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', '2026-06-25 06:15:21.196', 'Ruang Tamu Luas'),
('cmqt3yk4u001qv5ysorpdlva8', 'cmqsz1e5h001kv5rwmpc0xj61', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80', '2026-06-25 06:15:21.199', 'Kamar Tidur Utama'),
('cmqt3yk4x001sv5ys2bzv1pes', 'cmqsz1e5h001kv5rwmpc0xj61', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80', '2026-06-25 06:15:21.202', 'Dapur Minimalis'),
('cmqt3yk4z001uv5ysmgzlqtvi', 'cmqsz1e5h001kv5rwmpc0xj61', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', '2026-06-25 06:15:21.204', 'Kamar Mandi Bersih'),
('cmqt3yk52001wv5ys2blnkj4a', 'cmqsz1e5h001kv5rwmpc0xj61', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', '2026-06-25 06:15:21.207', 'Taman Belakang Hijau'),
('cmqtcj6yp000lv5rczn142t2o', 'cmqsz1e74002qv5rwrcapmk78', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80', '2026-06-25 10:15:20.833', 'Tampak Depan'),
('cmqtcj6yp000mv5rcdht3gzmy', 'cmqsz1e74002qv5rwrcapmk78', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80', '2026-06-25 10:15:20.833', 'Ruang Tamu Luas'),
('cmqtcj6yp000nv5rcwy7iei2k', 'cmqsz1e74002qv5rwrcapmk78', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80', '2026-06-25 10:15:20.833', 'Dapur Minimalis'),
('cmqtcj6yp000ov5rcu9tdslky', 'cmqsz1e74002qv5rwrcapmk78', 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80', '2026-06-25 10:15:20.833', 'Kamar Mandi Bersih'),
('cmqtcj6yp000pv5rcwxrh0b0m', 'cmqsz1e74002qv5rwrcapmk78', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80', '2026-06-25 10:15:20.833', 'Taman Belakang Hijau'),
('cmqtckd4h000qv5rc3woc09lw', 'cmqsz1e6m002cv5rwr5imcpoo', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80', '2026-06-25 10:16:15.473', 'Tampak Depan'),
('cmqtckd4h000rv5rcrpdjfm0b', 'cmqsz1e6m002cv5rwr5imcpoo', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80', '2026-06-25 10:16:15.473', 'Ruang Tamu Luas'),
('cmqtckd4h000sv5rc1b7oxci9', 'cmqsz1e6m002cv5rwr5imcpoo', 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80', '2026-06-25 10:16:15.473', 'Kamar Mandi Bersih'),
('cmqtckd4h000tv5rcfslh82p7', 'cmqsz1e6m002cv5rwr5imcpoo', 'https://images.unsplash.com/photo-1600566753104-685f4f24cb4d?w=1200&q=80', '2026-06-25 10:16:15.473', 'Taman Belakang Hijau'),
('cmquepqjc001fv59kc70hxtty', 'cmqsz1e61001yv5rwqe4xil1h', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', '2026-06-26 04:04:11.544', 'Tampak Depan'),
('cmquepqjc001gv59kta9cczk1', 'cmqsz1e61001yv5rwqe4xil1h', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', '2026-06-26 04:04:11.544', 'Ruang Tamu Luas'),
('cmquepqjc001hv59ky7uaekez', 'cmqsz1e61001yv5rwqe4xil1h', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', '2026-06-26 04:04:11.544', 'Kamar Tidur Utama'),
('cmquepqjc001iv59k4eo3ucrz', 'cmqsz1e61001yv5rwqe4xil1h', 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80', '2026-06-26 04:04:11.544', 'Dapur Minimalis'),
('cmquepqjc001jv59kin6dbm59', 'cmqsz1e61001yv5rwqe4xil1h', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', '2026-06-26 04:04:11.544', 'Kamar Mandi Bersih'),
('cmqy4mbkf000cv5ywqb7fpd1y', 'cmqt3yk55001yv5ysg2l8bk90', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', '2026-06-28 18:32:40.719', 'Kamar Tidur Utama'),
('cmqy4mbkf000dv5ywfrax17bo', 'cmqt3yk55001yv5ysg2l8bk90', 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80', '2026-06-28 18:32:40.719', 'Dapur Minimalis'),
('cmqy4mbkf000ev5ywpvqty7x1', 'cmqt3yk55001yv5ysg2l8bk90', 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', '2026-06-28 18:32:40.719', 'Kamar Mandi Bersih'),
('cmqy4mbkf000fv5ywyvsm17rv', 'cmqt3yk55001yv5ysg2l8bk90', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', '2026-06-28 18:32:40.719', 'Tampak Depan'),
('cmqy4mbkf000gv5yw7j7vojqo', 'cmqt3yk55001yv5ysg2l8bk90', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', '2026-06-28 18:32:40.719', 'Ruang Tamu Luas');

-- --------------------------------------------------------

--
-- Table structure for table `propertyscout`
--

CREATE TABLE `propertyscout` (
  `id` varchar(191) NOT NULL,
  `fullName` varchar(191) NOT NULL,
  `whatsapp` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'NEW',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `propertyscout`
--

INSERT INTO `propertyscout` (`id`, `fullName`, `whatsapp`, `email`, `city`, `status`, `createdAt`) VALUES
('cmqxprrub0006v5hwzlws7d0l', 'Adridinan Najmi Faza', '080816400771', 'adridinan99@gmail.com', 'bogor', 'NEW', '2026-06-28 11:37:00.851'),
('cmqxprwy70007v5hwjrkxu38o', 'Adridinan Najmi Faza', '080816400771', 'adridinan99@gmail.com', 'depok', 'NEW', '2026-06-28 11:37:07.426'),
('cmqxptrfs0008v5hws53asu98', 'Adridinan Najmi Faza', '080816400771', 'adridinan99@gmail.com', 'bekasi', 'NEW', '2026-06-28 11:38:33.476'),
('test-001', 'Andi Pratama', '085711112222', 'andi@mail.com', 'bogor', 'REJECTED', '2026-06-27 09:27:13.277'),
('test-002', 'Siti Rahma', '081299998888', 'siti.r@mail.com', 'depok', 'ACCEPTED', '2026-06-27 09:27:13.277'),
('test-003', 'Rudi Haryanto', '081377776666', 'rudi.h@mail.com', 'tangerang', 'REJECTED', '2026-06-27 09:27:13.277');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` text NOT NULL,
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id`, `key`, `value`, `updatedAt`) VALUES
('cmqyk8dfk000iv5yw68hwyrbp', 'contact_hours', 'Senin - Minggu: 07.00 - 17.00', '2026-06-29 01:49:43.638'),
('cmqyk8dn5000jv5ywkpna29rs', 'contact_email', 'rumioindonesia@gmail.com', '2026-06-29 01:49:43.638'),
('cmqyk8do3000kv5ywihepae1c', 'contact_whatsapp', '62816400771', '2026-06-29 01:49:43.638'),
('cmqykac1c000lv5ywspn28sau', 'social_tiktok', '', '2026-06-29 01:51:15.196'),
('cmqykac27000mv5yw97e22ivr', 'social_facebook', '', '2026-06-29 01:51:15.196'),
('cmqykac2j000nv5ywnsdtcrmj', 'social_instagram', 'https://www.instagram.com/rumio.id/', '2026-06-29 01:51:15.196'),
('cmqykacai000ov5ywfuebc96a', 'social_youtube', '', '2026-06-29 01:51:15.196'),
('cmqykylok000pv5yweb1f6a1d', 'general_site_name', '', '2026-06-29 02:10:07.381'),
('cmqykylvl000qv5ywjtkg2tu0', 'general_office_address', 'Kec. Purwokerto Selatan., Kabupaten Banyumas, Jawa Tengah 53146', '2026-06-29 02:10:07.382'),
('cmqykylvl000rv5ywp261dwsj', 'general_site_description', '', '2026-06-29 02:10:07.381');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `role` enum('ADMIN','OWNER') NOT NULL DEFAULT 'OWNER',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `role`, `createdAt`) VALUES
('cmqsyxzp40000v5rcbjhvkge0', 'Admin Rumio', 'admin@rumio.id', '$2b$10$H1nfphvrk37sPRMprnh8ou1xIV.wBKop7Rp1Tsdx/jzWvKQWsrgYy', 'ADMIN', '2026-06-25 03:54:56.632'),
('cmqy46cbd0001v5ywqqbfdawe', 'Adridinan Najmi Faza', 'punyarumah@rumio.id', '$2b$12$I3o11PljZ/Fuk9WkHHUb3.RD7fqK4gCW1bkAOo/w.x/qNuVbgCnNu', 'OWNER', '2026-06-28 18:20:15.193'),
('cmqyjshp1000hv5yw7ga67bzj', 'Kuda Hitam Blater', 'najmi@paya.id', '$2b$12$vbtrZqm6SeQskr.OSC9LeuG.AhsIHv1NOsrFtMx.Lb4FAz3b9DWjq', 'ADMIN', '2026-06-29 01:37:22.837');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addonplan`
--
ALTER TABLE `addonplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Blog_slug_key` (`slug`),
  ADD KEY `blog_viewCount_idx` (`viewCount` DESC);

--
-- Indexes for table `inquiry`
--
ALTER TABLE `inquiry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mediaasset`
--
ALTER TABLE `mediaasset`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packageorder`
--
ALTER TABLE `packageorder`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pricingfeature`
--
ALTER TABLE `pricingfeature`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PricingFeature_planId_fkey` (`planId`);

--
-- Indexes for table `pricingplan`
--
ALTER TABLE `pricingplan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Property_slug_key` (`slug`),
  ADD KEY `Property_status_idx` (`status`),
  ADD KEY `Property_propertyType_listingType_idx` (`propertyType`,`listingType`),
  ADD KEY `Property_ownerId_idx` (`ownerId`),
  ADD KEY `property_viewCount_idx` (`viewCount` DESC);

--
-- Indexes for table `propertyimage`
--
ALTER TABLE `propertyimage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PropertyImage_propertyId_fkey` (`propertyId`);

--
-- Indexes for table `propertyscout`
--
ALTER TABLE `propertyscout`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Setting_key_key` (`key`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pricingfeature`
--
ALTER TABLE `pricingfeature`
  ADD CONSTRAINT `pricingfeature_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `pricingplan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `property_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `propertyimage`
--
ALTER TABLE `propertyimage`
  ADD CONSTRAINT `propertyimage_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `property` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
