# Crew Pay Split — free performance-pay (commission) calculator for Jobber CSV exports

**Live:** https://aispotlightlab.github.io/jobber-paysplit/

If you pay your technicians a percentage of job revenue (cleaning, window/gutter cleaning, lawn, pressure
washing, HVAC) and rebuild the pay sheet every pay period from a Jobber export, this does the arithmetic:

1. Export jobs or visits from Jobber as CSV.
2. Open the page, drop the file in, set a revenue % per tech (split crews supported).
3. Read each tech's pay for the period. Copy it out.

Runs entirely in your browser — no account, no upload, no backend. Open the HTML file offline if you prefer.

Planned paid version ($29/mo flat, no per-tech fee): read-only Jobber sync so the CSV step disappears.
Use the "reserve" button on the page if you want it.

## Keywords
jobber commission calculator · pay for performance calculator · technician revenue share · jobber payroll
split · crew pay split · field service commission spreadsheet replacement

## Files
- `index.html` — the whole app (GitHub Pages, `main`, root)
- `selftest.js` — `node selftest.js` exercises the CSV parse/aggregate path against a fixture (quoted commas,
  `$` prefixes, split crews)

## Privacy
Nothing leaves your browser. No analytics. The reserve button opens a GitHub issue form you fill in yourself.

Published by AI Spotlight Lab. Validation experiment (internal ref OPP-0010).
