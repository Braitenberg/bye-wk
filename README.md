## 👋 bye bye, wk

Also tired of world cup slop? This extension removes all WK-related news cards automatically.

> Geen wk geneuzel.

### Supported sites

**Nederlands**
nu.nl, nos.nl, ad.nl, telegraaf.nl, volkskrant.nl, nrc.nl, rtlnieuws.nl, parool.nl, trouw.nl, fd.nl, metronieuws.nl, hln.be, nieuwsblad.be

**International**
bbc.com, cnn.com, theguardian.com, reuters.com, apnews.com, nytimes.com

Want to add a site? Raise a PR and add it to the `matches` list in `manifest.json`.

### Keywords

Keywords and player names are in [`patterns.txt`](patterns.txt) — one regex per line. Missing something? Raise a PR.

### Install

**Firefox**

1. Clone the repo: `git clone <repo-url>`
2. Go to `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on…** and select `manifest.json`

**Chrome / Edge / Brave**

1. Clone the repo: `git clone <repo-url>`
2. Go to `chrome://extensions`, enable **Developer mode**
3. Click **Load unpacked** and select the repo folder
