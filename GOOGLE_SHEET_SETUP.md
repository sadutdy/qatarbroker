# Google Sheet Setup

Use a published Google Sheet CSV as the lightweight admin source for the site.

## 1. Create these columns

`id,title,slug,location,area,price,type,availability,furnishing,suitable_for,description,amenities,image_urls,seo_area,whatsapp_number,is_active`

## 2. Field format

- `amenities`: separate items with `|`
- `image_urls`: separate image URLs with `|`
- `is_active`: `true` or `false`
- `whatsapp_number`: digits only, example `97455512345`

## 3. Publish the sheet

1. Open Google Sheets
2. `File` -> `Share` -> `Publish to web`
3. Choose the sheet tab with listings
4. Publish as `CSV`
5. Copy the CSV URL

## 4. Connect it to the app

Create a `.env` file from `.env.example` and set:

`VITE_GOOGLE_SHEET_CSV_URL=your-published-csv-url`

## 5. Example row

```csv
1,Furnished Executive Room,furnished-executive-room-al-sadd-doha,"Al Sadd, Doha",Near Joaan Metro Station,2800,Single Room,Immediate,Fully Furnished,Working Professionals,"Bright private room with attached bath, wardrobe, Wi-Fi, and quick access to central Doha.","Attached Bath|Wi-Fi|Split AC|Housekeeping","https://example-bucket.s3.amazonaws.com/room-1.jpg|https://example-bucket.s3.amazonaws.com/room-2.jpg",rooms for rent in Al Sadd Doha,97455512345,true
```
