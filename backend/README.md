# Kampüs Etkinlikleri API

Node + Express ile yazılmış REST API. Veri MongoDB'de (Mongoose ile) tutulur; sunucu yeniden başlayınca POST ile eklenenler kaybolmaz.

## Çalıştırma

```bash
cd backend
npm install
npm run seed
npm run dev
```

`npm run seed` veritabanını 6 örnek etkinlikle doldurur. Önce eski kayıtları siler, bu yüzden kaç kez çalışırsa çalışsın 6 kayıt kalır. Sunucu önce veritabanına bağlanır, sonra `http://localhost:3000` adresinde açılır. `npm start` ile izleme modu olmadan çalıştırılabilir.

## Ortam değişkenleri

`.env.example` dosyasını `.env` adıyla kopyala ve kendi değerlerini yaz. `.env` git'e girmez.

| Değişken | Açıklama | Örnek |
|---|---|---|
| `PORT` | Sunucunun dinlediği port | `3000` |
| `MONGODB_URI` | MongoDB Atlas bağlantı adresi (Atlas › Connect › Drivers; sonuna veritabanı adı `/kampus`) | `mongodb+srv://<kullanici>:<sifre>@<cluster>.mongodb.net/kampus` |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /events | Listeyi getir | 200 | — | Hazır |
| GET | /events/:id | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | Hazır |
| POST | /events | Yeni etkinlik | 201 | 400 | Hazır |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```
