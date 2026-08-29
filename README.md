# saibala98.github.io

Sai Saiprasad's PM portfolio — plain HTML/CSS/JS, no build step. "Fintech
Pro" design system (navy / gold / blue), single-page portfolio plus a full
CUE case study page, with a live, click-to-load embed of the CUE demo.

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

This repo's name (`<username>.github.io`) is GitHub's special "user site"
name — Pages serves it at the domain root, no build step needed.

1. Push this repo to GitHub as **`saibala98/saibala98.github.io`**.
2. Repo **Settings → Pages → Source → Deploy from a branch → `main` / `(root)`**.
3. Visit `https://saibala98.github.io/` a minute or two later.

Every push to `main` updates the live site automatically.
