# Website Update Plan – The Hita

## Status Legend
- [ ] Not started
- [~] Blocked (needs assets)
- [x] Done

---

## 1. Header – "Tentang" → "About"
**File:** `src/components/header.tsx`
- [ ] Change nav link label from `"Tentang"` to `"About"`

---

## 2. Jumbotron – Replace banner image with video
**File:** `src/app/page.tsx` – `#jumbotron` section
- [~] Replace `<Image>` banner with `<video>` element
- **Blocked:** Needs video file

---

## 3. About Section – Update slide descriptions
**File:** `src/app/page.tsx` – `aboutSlides` array

- [ ] **Slide 1 – "A Cozy Guest House"**
  > Where island calm meets everyday comfort. The Hita is a boutique guest house built for those who travel slowly — sunlit rooms, a quiet café, and spaces that feel like they've always been yours. Every detail, from hand-picked linens to locally sourced breakfasts, is here to make you feel less like a guest and more like you've come home.

- [ ] **Slide 2 – "Designed for Slow Living"**
  > Soft linens, warm teak wood, and locally crafted décor shape spaces made for unwinding at your own pace. Private corners invite quiet reflection, while open courtyards become the gentle backdrop between your Bali adventures. Here, there's no rush — just the unhurried rhythm of island life, designed into every room.

- [ ] **Slide 3 – "Warm, Attentive Service"**
  > From the moment you arrive, our hosts treat you like family — not just a room number. Expect a warm welcome, freshly brewed coffee at dawn, a homemade breakfast made with local ingredients, and honest recommendations for the Bali only locals know. Small gestures, remembered preferences, and a genuine desire to make your stay feel effortless.

- [~] Replace slide images (3 new photos)
- **Blocked:** Needs new image assets

---

## 4. Our Branch (was "Rest") – Rename heading & update descriptions
**Files:** `src/app/page.tsx`, `src/constants/constants.ts`

- [ ] Rename section heading `"Rest"` → `"Our Branch"`
- [ ] **The Hita Uluwatu**
  > Perched near the dramatic clifftops of Jimbaran, The Hita Uluwatu places you minutes from world-class surf, sacred sea temples, and the golden sands of Uluwatu. The energy here is electric — yet step inside and everything slows down. A sanctuary at the edge of Bali's wildest coast.

- [ ] **The Hita Seminyak**
  > In the pulse of Seminyak, this is your calm in the middle of the buzz. Boutique bistros, sunset beach clubs, and Bali's best shopping are all at your doorstep — but The Hita Seminyak gives you a peaceful place to come back to. Style, comfort, and just the right amount of energy.

- [ ] **Sri Krisna**
  > Tucked along the iconic Jalan Seminyak, Sri Krisna is where Bali's most vibrant neighbourhood meets a home that knows when to be quiet. Step outside and you're seconds from the boutiques, cafés, and beach clubs that make Seminyak legendary. Step inside and the warm wood frames, open breezeways, and hand-crafted details pull you into a different pace entirely — unhurried, personal, and unmistakably Balinese.

- [~] Replace branch card photos (3 new images)
- **Blocked:** Needs new image assets

---

## 5. Gallery – Update photos
**File:** `src/app/page.tsx` – `gallerySlides` array

- [~] Replace "Stay" group images
- [~] Replace "Explore" group images
- [~] Replace "Enjoy" group images
- **Blocked:** Needs new image assets (3 sets)

---

## 6. Feedback – Use real Google Maps reviews
**File:** `src/app/page.tsx` – `feedbacks` array

- [~] Replace placeholder reviews with real Google Maps reviews
- **Blocked:** Needs real review data (name, comment, rating, date)

---

## 7. Offers – Remove Membership Discount, add vouchers
**File:** `src/app/page.tsx` – `offers` array

- [ ] Remove `"Membership Discount"` offer card
- [ ] Add **"Free Afternoon Tea"** voucher card
- [ ] Add **"Meal Disk 15%"** voucher card
- [ ] Add **"Free Meal"** voucher card

---

## 8. Events Section – Parallax photo/video
**File:** `src/app/page.tsx` – `#events` parallax

- [~] Replace `community.png` with new event photo or video
- **Blocked:** Needs new media asset

---

## 9. Events – Rename heading & add facility slides
**File:** `src/app/page.tsx` – events section

- [ ] Rename `"Our Events"` → `"Discover The Hita"`
- [ ] Remove subtitle `"The Place Where Characters Blends"`
- [ ] Add facility slides section with 6 items:
  - Cafe IGYT
  - Pool
  - Tour
  - Rental Bike
  - Pick Up & Drop Airport
  - Room Decoration
- [~] Add facility slide images
- **Blocked:** Needs facility photo assets

---

## 10. Footer – Addresses, phone, Careers, social media
**File:** `src/components/footer.tsx`

- [ ] Add all 3 branch addresses:
  - **The Hita Seminyak:** Jl. Kresna No.03, Legian, Kec. Kuta, Kabupaten Badung, Bali 80361
  - **The Hita Uluwatu:** Jl. Raya Kampus Unud No.234, Jimbaran, Kec. Kuta Sel., Kabupaten Badung, Bali 80361
  - **Sri Krisna:** Jl. Raya Seminyak No.16 B, Seminyak, Kec. Kuta, Kabupaten Badung, Bali 80361
- [ ] Update phone: `+62 822 2163 9483` (WA link: `wa.me/6282221639483`)
- [ ] Add `"Careers"` to Navigate links
- [ ] Update Socials – Instagram:
  - @thehita.bali
  - @igytcoffee
  - @playlaundry
- [ ] Update Socials – TikTok:
  - @the.hita
  - @igyt.coffee
  - @play.laundry
