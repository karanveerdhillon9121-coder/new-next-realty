# New Next Realty website

Open `index.html` in any browser, or upload this whole `website` folder to any web host
(Netlify, Hostinger, GoDaddy, GitHub Pages and so on). You don't need to build anything.

## Before going live, update these
1. **Phone, WhatsApp and email.** Edit `CONFIG` at the top of `script.js`. Every button updates automatically.
2. **Things I assumed.** Check these lines in `index.html` and correct them:
   - Amenities: Power Backup, 24×7 Water, CCTV, Gated & Secure
   - Features: Vastu-conscious layouts, modular kitchen, private balconies
   - Floors split: "Floors 1–2" and "Floors 3–4"
   - Office hours in the footer: Mon–Sat, 10am–6pm
3. **Exact map pin.** `location/location.txt` was empty, so the map searches for "Aeropolis City, Sector 66A, Mohali".
   Replace the `iframe src` in the Location section with your plot's Google Maps embed link
   (in Google Maps: Share → Embed a map).
4. **Real photos.** The current stock images are labelled "representative". Replace them with your own building's photos when you have them.

## Files
- `index.html`: page content
- `styles.css`: theme colours (top of the file), layout and responsive rules
- `script.js`: contact config, mobile menu, gallery lightbox, enquiry form (sends to WhatsApp)
- `assets/`: logo, emblem and favicon cropped from your logo files

Media credits: photos from Unsplash, videos from Mixkit (both free to use).
