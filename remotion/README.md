# Sneeze showreel (Remotion)

This folder renders the looping showreel on the homepage hero
(`public/reel.webm`, `public/reel.mp4`, `public/reel-poster.jpg`).

The site plays a pre-rendered video instead of running Remotion in the browser.
Video decoding happens on the GPU's media engine, so the reel adds almost no
CPU or GPU load to the page. Running the Remotion player live would cost frame
time on every frame.

## Edit and render

```bash
cd remotion
npm install
npm run studio      # live preview / tweak in the browser
npm run build       # renders webm + mp4 + poster into ../public
```

- Composition: `SneezeReel`, 1600×1000 (16:10, the hero card's ratio), 30 fps, 10 s.
  The output is scaled to 1280×800.
- The scenes are in `src/SneezeReel.tsx`: logo burst, then rolling services, then the tagline with a gold iris.
- It starts and ends on black so the loop is seamless.
- The fonts are bundled in `public/fonts` (Oswald and Instrument Serif, SIL OFL), so renders work offline.

If you have trouble downloading Remotion's headless Chrome, point it at an
existing Chrome or Chromium with `--browser-executable=/path/to/chrome`.
