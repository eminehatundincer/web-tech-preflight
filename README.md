Canlı adres (Sprint 5): https://web-tech-preflight-6xz2.vercel.app/

Canlı adres (Sprint 4): https://web-tech-preflight-3bgt.vercel.app/

# Kampüs Etkinlikleri

Üniversite kampüsünde düzenlenen etkinliklerin listelendiği, detaylarının görüntülendiği ve yeni etkinlik eklenebildiği bir web uygulamasıdır.

## Sprint 1 - HTML ve Git

Bu sprintte yalnızca HTML kullanılarak 5 sayfalık uygulama iskeleti oluşturulmuştur. CSS ve JavaScript kullanılmamıştır.

### Sayfalar

- **index.html** - Ana sayfa: uygulama tanıtımı ve yaklaşan etkinlikler
- **etkinlikler.html** - Tüm etkinliklerin listesi ve aylık program tablosu
- **etkinlik-detay.html** - Etkinlik detay sayfası: afiş, künye bilgileri
- **etkinlik-ekle.html** - Yeni etkinlik ekleme formu
- **etkinlik-guncelle.html** - Mevcut etkinliği güncelleme formu

### Canlı URL

Vercel: [web-tech-preflight.vercel.app](https://web-tech-preflight.vercel.app/)

## Sprint 2 - CSS ve Responsive Tasarım

Sprint 1'deki HTML yapısı bozulmadan CSS eklenmiştir. Renk ve font öğrenci numarasından üretilmiş, sayfalar hem telefonda hem masaüstünde düzgün görünecek şekilde responsive tasarlanmıştır.

### Yapılan değişiklikler

- Öğrenci numarasına dayalı renk paleti ve font (`css/2416501080.css`)
- Etkinlik listeleri tablodan `section` içindeki `article` kartlara dönüştürüldü
- CSS Grid ile responsive yerleşim: telefonda tek sütun, geniş ekranda çok sütun
- Formlarda üstte hizalı label ve boş/hatalı alanlar için görsel uyarı
- CSS yalnızca `var(--...)` değişkenleriyle yazıldı; JavaScript kullanılmadı

### Canlı URL

Vercel: [web-tech-preflight-sprint2.vercel.app](https://web-tech-preflight-sprint2.vercel.app/)

## Sprint 3 - JavaScript ve DOM

Etkinlikler artık HTML'e elle yazılmıyor; tek bir veri dosyasından (`js/data.js`) JavaScript ile üretiliyor. localStorage, framework ve jQuery kullanılmadı.

### Modüller

- **js/data.js** - 6 etkinliğin bulunduğu dizi (tek veri kaynağı)
- **js/event-list.js** - Etkinlikler sayfasında tüm kartlar, ana sayfada tarihi en yakın 2 etkinlik (`data-limit`); arama ve kategori filtresi
- **js/event-detail.js** - Detay sayfası adresteki `?id=` ile doğru etkinliği açar; geçersiz veya eksik id'de hata kutusu gösterir
- **js/event-form.js** - Ekleme ve güncelleme formu: alan doğrulama, hata ve başarı mesajları (veri kaydedilmez)

### Yapılan değişiklikler

- Elle yazılmış kartlar silindi, yerine boş container bırakıldı
- Menüden Detay ve Güncelle linkleri kaldırıldı; güncelleme sayfasına detaydaki "Bu etkinliği güncelle" butonuyla gidiliyor
- Arama Türkçe karakterlere duyarlı (`toLocaleLowerCase("tr-TR")`), kategoriler veriden üretiliyor
- Form tarayıcı


## Sprint 4 - Vite, TypeScript ve React

Site `frontend` klasöründe Vite React-TS projesine taşındı. Veri tipli, filtre fonksiyonları saf; 5 sayfa tek `App.tsx` içinde, sayfa geçişi ve arama state ile çalışıyor. React Router bu sprintte yok.

### Dosyalar

- **package.json** - Proje adı, komutlar (dev, build) ve paket listesi
- **package-lock.json** - Yüklenen paketlerin tam sürümleri
- **node_modules/** - İndirilen paketler; GitHub'a gitmez
- **tsconfig\*.json** - TypeScript ayarları
- **vite.config.ts** - Vite ayarları ve React eklentisi
- **index.html** - Tek HTML dosyası; içinde boş `div#root` var
- **src/main.tsx** - React'i başlatır, App'i root'a çizer
- **src/App.tsx** - Uygulamanın ana bileşeni; 5 sayfanın hepsi burada
- **src/App.css** - Sprint 3'teki CSS
- **src/index.css** - Tüm sayfaya genel stil; bu sprintte boş
- **src/types/campus-event.ts** - Etkinlik tipi (`CampusEvent`) ve kategori tipi
- **src/data/events.ts** - Tipli 6 etkinlik kaydı
- **src/utils/filter-events.ts** - Arama, kategori filtresi ve id ile bulma için saf fonksiyonlar
- **public/** - Olduğu gibi kopyalanan dosyalar (afiş)


## Sprint 5 - React Bileşenleri ve Props

Tek büyük `App.tsx` parçalara bölündü. Her parça kendi dosyasında bir bileşen; veriyi props ile alıyor, olayları callback ile App'e bildiriyor. State App'te kalıyor.

### Bileşenler

- **src/components/layout/Header.tsx** - Sayfa başlığı (`title`) ve isteğe bağlı alt yazı (`text`)
- **src/components/layout/Navigation.tsx** - Menü; açık sayfa (`current`), tıklanınca `onNavigate`
- **src/components/layout/Footer.tsx** - Alt bilgi; props yok
- **src/components/events/EventCard.tsx** - Tek etkinlik kartı; `event`, `onShowDetail`
- **src/components/events/EventList.tsx** - Etkinlik dizisinden kartlar; boşsa `emptyText` mesajı
- **src/components/events/EventFilter.tsx** - Arama ve kategori kutuları; değerler ve değişiklik callback'leri App'ten
- **src/components/events/EventDetail.tsx** - Etkinlik detayı; `event`, `onBack`, `onEdit`
- **src/components/forms/EventForm.tsx** - Ekle ve Güncelle formu; `onSubmit`
- **src/types/page.ts** - Sayfa adı tipi (`PageName`)
- **src/utils/format-date.ts** - Tarihi "12 Ekim 2026" biçimine çeviren fonksiyon

### Yapılan değişiklikler

- `App.tsx` yaklaşık 300 satırdan 124 satıra indi; sadece import'lar, state'ler, hesaplanan değerler, `go()` ve bileşenler kaldı
- Ana sayfa ve Etkinlikler sayfası aynı `EventList` bileşenini kullanıyor; `key` olarak etkinlik `id`'si veriliyor
- Ana sayfa ve Etkinlikler başlığına alt yazı eklendi
- "Hoş Geldiniz" bölümü ve "Ayın Programı" tablosu kaldırıldı
- Menü header'ın altında ayrı bileşen; CSS ile aynı renk bandında gösteriliyor
- Renkler Sprint 2'deki gibi öğrenci numarasından (`2416501080`) üretiliyor
