# CODE.Z website (React)

Your original HTML / CSS / JavaScript site, converted to a React project (Vite + React Router).
The design is untouched: `src/styles/style.css` and `src/styles/pages.css` are your original
stylesheets, byte for byte, and all images / video / logo live in `public/` with the same
folder and file names as before.

## Run it

```bash
npm install     # first time only
npm run dev     # opens the site at http://localhost:5173
```

Other commands: `npm run build` (production files go to `dist/`) and `npm run preview` (try the build locally).

## Where things are

| Original file            | Now                                                        |
| ------------------------ | ---------------------------------------------------------- |
| `index.html`             | `src/pages/Home.jsx` + `src/components/home/*`             |
| `about.html`             | `src/pages/About.jsx`                                      |
| `services.html`          | `src/pages/Services.jsx`                                   |
| navbar / footer markup   | `src/components/Navbar.jsx`, `src/components/Footer.jsx`   |
| `common.js`              | `src/hooks/useReveal.js`, `useCurves.js`, `Navbar.jsx`     |
| `script.js`              | `src/hooks/useHeroLoader.js`, `components/home/*`          |
| `style.css`, `pages.css` | `src/styles/` (unchanged)                                  |
| images, video, logo      | `public/` (same names)                                     |

Page addresses are now `/`, `/about` and `/services` (instead of `index.html`, `about.html`, `services.html`).

## Deploying

Because this is a single-page app, the host must send every address back to `index.html`
(Netlify: a `_redirects` file containing `/* /index.html 200`; Vercel: a rewrite to `/index.html`;
Apache/Nginx: a fallback to `index.html`). Otherwise opening `/about` directly gives a 404.

## Still to do (carried over from your original TODOs)

- Real email, phone and social links in `src/components/Footer.jsx`
- Team names, roles and photos in `src/pages/About.jsx`
- The sign-up form only shows a confirmation on screen; nothing is sent anywhere yet
  (`src/components/home/ContactSection.jsx`)
