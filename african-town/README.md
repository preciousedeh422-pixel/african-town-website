# African Town Bar & Restaurant — Website

A cinematic, single-page site for African Town Bar & Restaurant (Vientiane, Laos) —
built with React, TypeScript, Vite, Tailwind CSS and Framer Motion. The four videos
you supplied carry the story from arrival, through the food, through the kitchen,
to a closing scene — with a full Nigerian / Lao / Thai menu, a WhatsApp ordering
flow, and a WhatsApp reservation flow in between.

---

## 1. Install

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
cd african-town
npm install
```

## 2. Run it in VS Code

1. Open the `african-town` folder in VS Code.
2. Open a terminal (`` Ctrl+` ``) and run:
   ```bash
   npm run dev
   ```
3. Open the local URL it prints (usually `http://localhost:5173`).
4. Edit any file — the browser hot-reloads automatically.

## 3. Where the 4 videos live

`public/videos/` — already filled in with the four clips you sent, converted to
web-friendly `.mp4` with a poster frame each:

| File | Used for | Section |
|---|---|---|
| `hero.mp4` / `hero-poster.jpg` | Arrival / restaurant ambience | Hero (opening) |
| `food.mp4` / `food-poster.jpg` | Food | "Flavour without borders" |
| `chef.mp4` / `chef-poster.jpg` | Kitchen / plating | "The Craft Behind the Table" |
| `finale.mp4` / `finale-poster.jpg` | Closing scene | "Come to the Table" (near the end) |

**To replace a video:** drop a new file into `public/videos/` with the *same
filename* (e.g. overwrite `hero.mp4`), or open `src/data/restaurantData.ts` and
change the `videoData` paths to point at a new filename. Nothing else needs to
change — every section reads from that one object.

## 4. Where to change the restaurant name, hours, phone, address

Open **`src/data/restaurantData.ts`**. Everything about the business lives here:

- `restaurant.name`, `fullName`, `tagline` — name & headline copy
- `restaurant.address`, `googleMapsUrl`, `googleMapsEmbedSrc` — location (the exact
  street address wasn't in the material provided — only "Vientiane" is confirmed,
  so update this with the real address)
- `restaurant.phoneDisplay`, `phoneSecondary`, `email` — contact details (the phone
  numbers were read off your storefront/menu-board photos — double check them)
- `restaurant.whatsappE164` — the number the **order button** and **reservation
  form** message. It's currently `8562054745501` (Laos country code `856` + the
  number from your sign, `020 5474 5501`, with the leading `0` dropped). **Confirm
  this is correct before launch** — WhatsApp links silently fail on a wrong number.
- `restaurant.hours` — opening hours (placeholder — confirm real hours)
- `restaurant.social` — Instagram / Facebook / TikTok links (placeholders)

## 5. Where to change the Nigerian / Lao / Thai menu & prices

Open **`src/data/menuData.ts`**. Every dish is one object in the `dishes` array:

```ts
{
  id: 'ng-jollof',
  name: 'Nigerian Jollof Rice',
  description: '...',
  category: 'Rice & Mains',      // must match a category in cuisineMeta below
  cuisine: 'nigerian',           // 'nigerian' | 'lao' | 'thai'
  price: 45000,                  // in LAK
  image: '',                     // '' = elegant placeholder card; or '/images/dishes/xxx.jpg'
  imageAlt: '...',
  spiceLevel: 1,                 // 0–3
  dietaryTags: [],                // 'vegetarian' | 'vegan' | 'spicy' | 'chicken' | 'beef' | 'goat' | 'fish' | 'seafood'
  proteinOptions: ['Chicken', 'Beef'], // optional
  available: true,
  signature: true,               // optional — shows a "Signature" badge
}
```

- Add a dish → add an object to the array.
- Remove a dish → delete its object (or set `available: false` to hide it without deleting).
- Change a price → edit the `price` number.
- Add/rename a category → edit `cuisineMeta` at the top of the same file; the menu
  tabs and filter strip read from there automatically.

The current menu (~34 dishes) is a **substantial representative selection** across
all three cuisines and their sub-categories (rice, soups, swallows, grills, sides,
small chops, drinks for Nigerian; signatures, grills, noodles, soups, salads for
Lao; classics, curries, soups, salads, desserts for Thai) — built to the same data
shape, so you (or a future edit) can extend any category to the fuller list from
your original brief without touching any component.

## 6. Where to replace food images

Every dish currently renders as an editorial typographic placeholder card (dish
name over a dark gold-toned plate) rather than a stock or hotlinked photo — real
food photography wasn't supplied, and the brief asked not to present borrowed
photography as the restaurant's own.

To add a real photo: drop the file in `public/images/dishes/` and set that dish's
`image` field in `menuData.ts` to the path, e.g. `image: '/images/dishes/jollof.jpg'`.
The placeholder disappears automatically the moment `image` is non-empty.

## 7. Ordering — how it works

There's no backend. The floating **Order** button (desktop navbar) / sticky bottom
bar (mobile) opens a cart drawer. On checkout, it opens WhatsApp with a pre-filled
message listing every item, quantity, total, and the customer's name/phone
(and delivery address if "Delivery" is selected) — sent to the number in
`restaurant.whatsappE164`.

An optional Google Form path also exists in `restaurantData.ts` under
`googleForm.GOOGLE_FORM_ACTION_URL` and `googleForm.fields` if you'd rather collect
orders in a Sheet later — it's unused by default (left empty) since WhatsApp is the
requested flow, but the field-ID scaffolding is there if you add it.

## 8. Reservations

The Reservation section (`src/components/Reservation.tsx`) also sends straight to
WhatsApp with name, phone, date, time and guest count — no separate booking system
required.

## 9. Contact & map

`src/components/Contact.tsx` pulls phone, email, hours and the map embed from
`restaurantData.ts`. Update `googleMapsEmbedSrc` with your real Google Maps
embed URL once you have the exact address (Google Maps → Share → Embed a map).

## 10. Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Follow the prompts (framework preset: **Vite**). For subsequent deploys:

```bash
vercel --prod
```

Or connect the GitHub repo at [vercel.com/new](https://vercel.com/new) — Vercel
auto-detects Vite and needs no extra configuration.

---

## Project structure

```
african-town/
  public/
    videos/          the 4 clips + posters
    images/           storefront + menu-board photos, dish photos (once added)
  src/
    components/       one file per section/UI piece
    data/              restaurantData.ts, menuData.ts — edit these, not the components
    hooks/             useCart.ts — the order basket
    lib/               format.ts, whatsapp.ts — small helpers
    App.tsx
    index.css
```

## Notes on what still needs your input

- Exact street address (currently just "Vientiane, Laos")
- WhatsApp number confirmation (read off the photos you sent — please verify)
- Real opening hours
- Instagram / Facebook / TikTok links
- Chef biography (left as an editable placeholder — no biography was invented)
- Real food photography, if/when available
