# Shelby Floral

Website for Shelby Floral Company, a Utah wedding florist: [shelbyfloral.com](https://shelbyfloral.com). React (Create React App), hosted on Vercel.

## Running it

```sh
npm install
npm start        # dev server at http://localhost:3000
npm test         # smoke tests
npm run build    # production build in build/
```

## Where things live

| To change… | Edit |
| --- | --- |
| Gallery photos and their descriptions | `src/data/images.js` |
| Reviews | `src/data/testimonials.js` (real client words only) |
| Bio, process steps, FAQ | `src/data/siteContent.js` |
| Partnerships / media kit page | `src/data/mediaKitData.js` |
| Colors and fonts | variables at the top of `src/index.css` |
| Contact form destination | `FORM_ENDPOINT` in `src/components/Contact.js` (Formspree) |

### Adding a photo

1. Put the file in `public/images/portfolio/` (about 1100px on the long side is plenty).
2. Add it to `images` in `src/data/images.js` with its width, height and a short description, then add the filename to `homeGallery` or `fullGallery`.
3. Run `npm run optimize-images` to create the smaller WebP copies the site serves.

## Analytics

Google Analytics 4 (`src/App.js`) and Microsoft Clarity (`public/index.html`).
