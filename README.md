# saibala98.github.io

Sai Saiprasad's PM portfolio.

**The live site is now built from `portfolio-react/`** — a React + Vite +
Framer Motion rewrite of the original static site, deployed automatically
via GitHub Actions (see "Deploying to GitHub Pages" below). The plain
HTML/CSS/JS files at the repo root (`index.html`, `styles.css`, `main.js`,
`case-study-cue.html`) are the previous static implementation this was
converted from — they're no longer what's served, kept here for
reference. Everything below the "React app" section documents that
earlier version.

## React app (`portfolio-react/`)

```
portfolio-react/
  src/
    main.jsx            Entry point — BrowserRouter + MotionConfig
    App.jsx              Routes: "/" -> Home, "/case-study" -> CaseStudy
    motion.js             Shared Framer Motion variants
    styles.css             Carried over from the static site's design system
    pages/                Home.jsx, CaseStudy.jsx
    components/           Nav, Hero, CandidateBrief, CueCaseStudy, MoreWork,
                           About, Skills, Contact, Footer
  public/demo/           Vendored CUE demo app (same as the static site's demo/)
```

Run locally:

```bash
cd portfolio-react
npm install
npm run dev
```

Nav takes a `home` prop (`Nav`/`Footer` render slightly differently on
the case study page than the homepage, matching a real difference that
existed in the original static pages — see the comments in `Nav.jsx` /
`Footer.jsx`).

## Files

```
index.html            Main portfolio (all sections)
case-study-cue.html   Full CUE case study — problem, PRD, personas,
                       roadmap, architecture, AI strategy, code walkthrough
styles.css            Shared design system for both pages
main.js               Scroll animations, mobile nav, active-link
                       highlighting, contact form validation
demo/app.html         Vendored, pre-built copy of the CUE demo
                       (VITE_DEMO_MODE=true, no backend) — served at
                       /demo/app.html so the "Try Live Demo" links and the
                       embedded iframe on the CUE section work same-origin.
                       Named app.html, not index.html, since this repo's
                       own landing page already owns that name at the root
                       (and nothing under demo/ is named index.html either).
sync-demo.sh           Rebuilds demo/ from cue-platform when it changes;
                       renames Vite's index.html output to app.html, and
                       patches one hardcoded string in the built JS (see
                       "Reset Demo" note below)
```

No build tooling for the portfolio itself — edit `index.html` / `styles.css`
/ `main.js` / `case-study-cue.html` directly and refresh the browser.

## Before you publish — fill these in

A few things were left as clearly-marked placeholders since I don't have
the real values:

| Placeholder | Where | Replace with |
|---|---|---|
| `[your-linkedin-handle]` / LinkedIn `href="#"` | Contact card, footer, both `<head>` sections | Your real LinkedIn URL |
| `[your-email]` / `you@example.com` | Contact card, footer `mailto:` | Your real email |
| `View Resume` button `href="#"` | Nav | A link to your résumé (PDF or hosted page) |
| `[Year]` | Education section (undergrad) | Your graduation year |
| `github.com/saibala98/cue-platform` links | Featured project, case study header/footer | Update once `cue-platform` is pushed as its own repo (see note below) |
| Other-projects `href="#"` links | Smart Contribution Copilot / Weather ETL / Customer Churn cards | Real case study / GitHub / notebook links once those exist |

**Note on the CUE GitHub links**: they currently point at
`github.com/saibala98/cue-platform`, which doesn't exist yet as its own
repo — `cue-platform` is a subfolder of a different repo right now. Either
push it as its own repo at that URL, or update the links to wherever it
actually lives.

## Run it locally

```bash
npx serve .
# or: python3 -m http.server 8000
```

The CUE demo panel is click-to-load ("Try Interactive Demo" / "Try Live
Demo" buttons), so the portfolio's own page loads fast even though the
embedded app is a full React SPA.

## Updating the embedded demo

When `cue-platform`'s demo mode changes:

```bash
./sync-demo.sh                        # assumes cue-platform is a sibling directory
./sync-demo.sh /path/to/cue-platform  # or pass the path explicitly
git add demo && git commit -m "Update embedded CUE demo"
```

**Reset Demo note**: the demo's own "Reset Demo" button does a hard
`window.location.href = "/demo/login"` navigation (by design, to force a
full remount), but `/demo/login` is a client-side-only React Router route
with no matching static file — on GitHub Pages (no server-side rewrites)
that would 404. `sync-demo.sh` patches that one string in the built JS to
point at `/demo/app.html` instead. Since Reset already clears the auth
token before navigating, the app's own catch-all route then redirects
client-side to the login screen anyway — same end result, no extra file
needed. Fix it at the source (`cue-platform`) to make this patch step
unnecessary.

## Deploying to GitHub Pages

The React app needs an actual build step (`npm run build`), which plain
"deploy from a branch" Pages hosting can't do — so this repo deploys via
`.github/workflows/deploy.yml`, a GitHub Actions workflow that builds
`portfolio-react/` and publishes `portfolio-react/dist/` on every push to
`main` that touches that folder.

**One-time setup** (not automatable — needs a manual click in GitHub's UI):

1. Push this repo to GitHub as **`saibala98/saibala98.github.io`**.
2. Repo **Settings → Pages → Source → GitHub Actions** (not "Deploy from a
   branch" — that setting is for the old static-file flow and won't run
   the build).
3. Push to `main` (or run the workflow manually from the Actions tab) and
   wait for it to finish.
4. Visit `https://saibala98.github.io/` a minute or two later.

**Client-side routing on GitHub Pages**: `portfolio-react` uses React
Router's `BrowserRouter`, so `/case-study` only exists once React mounts
and reads the URL — GitHub Pages has no server-side rewrites, so a direct
visit or a refresh on that path would otherwise 404. The workflow's build
step copies the built `index.html` to `404.html`; GitHub Pages serves
that for any unmatched path, which loads the same app bundle under the
originally-requested URL, and React Router renders the right route from
there. This regenerates on every deploy since the referenced asset
filenames are content-hashed and change on every build — don't hand-edit
or commit a static `404.html`, it'll drift out of sync with the next
build.

This repo's name (`<username>.github.io`) is GitHub's special "user site"
name, so Pages serves it at the domain root — no Vite `base` path
configuration needed (that's only required for project pages like
`username.github.io/repo-name`).
