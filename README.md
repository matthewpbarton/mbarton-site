# mbarton.co.uk — MB&Co.

Static rebuild of the Gamma site. No build step, no framework, no dependencies —
three files and an image. Deploys to Vercel as-is.

```
index.html      all page content
styles.css      design system (Crimson Text, pale lavender ground)
main.js         newsletter signup + footer year
favicon.svg
images/         hero image + MB & Co. logo mark (favicon only)
assets-source/  original 2420px PNG — git-ignored, not deployed
```

## What changed from the Gamma version

- "Made with Gamma" badge gone.
- Newsletter is now a **real signup form** instead of a link straight to LinkedIn.
- `matthew@mbarton.co.uk` is a working `mailto:` link (was `https://matthew@mbarton.co.uk/`).
- Hero image 4.6MB → 206KB.
- MB & Co. logo mark used as the favicon/touch icon (not shown on the page).
- Layout proportions match the Gamma original (content column ~1040px).
- Added page title, meta description, Open Graph tags, favicon, skip link,
  focus states, and proper heading hierarchy.
- One flat background — the white card-on-lavender "square within a square" is gone.
  There is now exactly one painted surface on the page (`body`).
- Signup is seamless: transparent underlined field and text button, no container.

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

## Subscriber count

Shaan Puri's site leads its signup with "Join 109,050 entrepreneurs on my email list."
That works because the number is the proof. At ~200 it isn't yet — it's the one figure
a cold reader anchors on, and the copy stands up fine without it.

There's a commented-out `.signup-count` line in `index.html` ready to uncomment when
the number is worth leading with. Rough threshold: four digits.

## Background colour

The page is one flat `#ECECF3` — the tone the Gamma original used behind its card.
To go lighter (the tone the card itself was), change `--bg` in `styles.css` to `#FAFAFC`.
Shaan's, for reference, is a warm `#F5F3EC`.

## Type scale

Measured off the live Gamma site at a 1280px viewport and matched exactly:

| Element            | Size    | Weight | Style  | Line height | Colour   |
|--------------------|---------|--------|--------|-------------|----------|
| Name               | 27px    | 700    | —      | 33.75px     | #1B1B27  |
| Tagline            | 27px    | 400    | italic | 33.75px     | #1B1B27  |
| Section titles     | 22.5px  | 700    | italic | 28.125px    | #1B1B27  |
| Essay/list links   | 18px    | 700    | —      | 28.8px      | #1B1B27  |
| Body               | 18px    | 400    | —      | 28.8px      | #3C3939  |
| Newsletter title   | 36px    | 400    | —      | 45px        | #1B1B27  |
| Privacy line       | 14.4px  | 400    | italic | 23.04px     | #3C3939  |

Hero image renders 383px wide, as Gamma. Height comes out 222px against Gamma's 223px —
a rounding artefact of the source image's aspect ratio, not worth distorting the photo for.

Headings use `clamp()` because Gamma scales them with the viewport (at 353px they drop to
22.5/19.8/27px). Body stays 18px at every width, as it does on Gamma. The `vw` middle terms
are set so each lands exactly on its Gamma value at 1280px.
