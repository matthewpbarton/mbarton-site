# mbarton.co.uk — MB&Co.

Static rebuild of the Gamma site. No build step, no framework, no dependencies —
three files and an image. Deploys to Vercel as-is.

```
index.html      all page content
styles.css      design system (Crimson Text, pale lavender ground)
main.js         newsletter signup + footer year
favicon.svg
images/         hero image + MB & Co. logo mark
assets-source/  original 2420px PNG — git-ignored, not deployed
```

## What changed from the Gamma version

- "Made with Gamma" badge gone.
- Newsletter is now a **real signup form** instead of a link straight to LinkedIn.
- `matthew@mbarton.co.uk` is a working `mailto:` link (was `https://matthew@mbarton.co.uk/`).
- Hero image 4.6MB → 206KB.
- MB & Co. logo mark added top-left, and used as the favicon/touch icon.
- Layout proportions match the Gamma original (content column ~1040px).
- Added page title, meta description, Open Graph tags, favicon, skip link,
  focus states, and proper heading hierarchy.

## One thing that needs you

In `index.html`, the essay **"Burnout Broke Me as a Founder"** points at your Medium
profile. The Gamma site had it pointing at the Fear-of-Flying article by mistake, and
Medium blocks scraping so I couldn't look up the real URL. Search for
`TODO(matthew)` and paste the correct link in.

## Turning on Beehiiv

The form works today — it falls back to your LinkedIn newsletter, so nobody hits a
dead end. To switch it to Beehiiv:

1. Create the publication at beehiiv.com.
2. Find your subscribe URL — it looks like `https://iterations.beehiiv.com/subscribe`.
3. In `main.js`, set:

   ```js
   const BEEHIIV_SUBSCRIBE_URL = "https://iterations.beehiiv.com/subscribe";
   ```

4. Commit and push. Vercel redeploys automatically.

The form passes the typed email through as `?email=...` so Beehiiv pre-fills it and
the reader only has to confirm.

## Deploying

Pushing to `main` triggers a Vercel deploy once the repo is connected.

## Local preview

```bash
python3 -m http.server 4321 --directory .
```
