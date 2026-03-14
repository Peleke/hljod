# hljóð

**silence and sound**

Interactive music lessons that run in your browser. Type code. Press play. Learn by hearing.

[**hljod.peleke.me**](https://hljod.peleke.me)

---

## What this is

A course on making music with code, built on [Strudel](https://strudel.cc) (live coding) and [Hydra](https://hydra.ojack.xyz) (audio-reactive visuals). Every lesson is a single HTML page with embedded code editors — change the code, hear the difference, understand why.

Two tracks:

**Ramp: EDM** — DnB-flavored. Strudel as the instrument. Rhythm, synthesis, arrangement. Each lesson ends with a track you can share.

**Ramp: Blues** — Functional harmony in Bb. Strudel as a theory lab. Intervals, chord tones, voice leading. Everything transfers to guitar.

## No install

Open a page. Press play. That's it. No npm. No build step. No dependencies to manage. The editors run Strudel in-page via web component, visuals run Hydra on a background canvas. Everything loads from CDN.

## What's in a lesson

Each page teaches through **PLAY → HEAR → TWEAK → NAME → COMPOSE**:

- **Embedded Strudel editors** with play/stop/share controls
- **Audio-reactive Hydra visuals** (toggleable background canvas driven by FFT analysis of the music)
- **Rabbit holes** — collapsible deep-dives with interactive visualizations:
  - Clickable euclidean rhythm circles (Bjorklund algorithm, cultural origins)
  - Waveform canvas with Web Audio playback (sine, saw, square, triangle)
  - Filter frequency response SVGs (LPF, HPF)
  - ADSR envelope diagrams
- **Share buttons** that generate `strudel.cc` URLs encoding the learner's code — instant shareable links

## Stack

```
HTML + inline CSS/JS (no build step)
@strudel/repl@1.3.0    — Strudel editor web component
hydra-synth@1.3.29     — generative visuals
Web Audio API           — waveform playback in rabbit holes
Inline SVG              — interactive diagrams
GitHub Pages            — hosting
```

## Structure

```
docs/
  index.html              ← landing page
  edm-0-first-noise.html  ← patterns, mini-notation, stacking
  edm-1-the-break.html    ← 170bpm, DnB drum patterns
  ...
```

## License

Content and code are MIT. Go make noise.
