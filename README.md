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

### Geliştirici

Emine Hatun Dinçer · 2416501080 · 2026
