<div align="center">

<img src="docs/hero.png" alt="hljóð — silence and sound" width="100%"/>

# hljóð

### Type code. Press play. Learn by hearing.

[![Strudel](https://img.shields.io/badge/Strudel-live_coding-ff6b35?style=for-the-badge)](https://strudel.cc/)
[![Hydra](https://img.shields.io/badge/Hydra-visuals-ab47bc?style=for-the-badge)](https://hydra.ojack.xyz/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-deployed-4fc3f7?style=for-the-badge&logo=github&logoColor=white)](https://hljod.peleke.me)
[![License: MIT](https://img.shields.io/badge/License-MIT-66bb6a?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Interactive music lessons that run in your browser. No install. No build step. No bullshit.**

[Start Learning](https://hljod.peleke.me) · [EDM Track](#-edm-track) · [Blues Track](#-blues-track) · [How It Works](#-how-it-works)

---

</div>

## The Idea

Most music theory resources hand you definitions and expect understanding. You memorize intervals, read about chord progressions, stare at notation — and still can't *hear* why a dominant 7th wants to resolve.

**hljóð** flips it. You hear first, name after. Every concept starts as sound. You press play, something happens in your ears, you change a number, it changes, and *then* the page tells you what you just did. The theory arrives after the experience, not before it.

The name is Old Norse. It means both silence and sound.

---

## 🎛 Two Tracks

### 🥁 EDM Track

DnB-flavored. Strudel as the instrument. Each lesson ends with a track you can share.

| # | Module | What You Build |
|---|--------|---------------|
| **0** | [**First Noise**](https://hljod.peleke.me/edm-0-first-noise.html) | Patterns, mini-notation, samples, synths, stacking |
| **1** | [**The Break**](https://hljod.peleke.me/edm-1-the-break.html) | 170bpm, half-time snare, kick placement, the DnB groove |
| 2 | The Bass | Sub bass, reese, filtering, octaves |
| 3 | Layers | Polyrhythm, euclidean, hi-hat rolls, arrangement |
| 4 | Atmosphere | Pads, reverb, delay, texture |
| 5 | Movement | `.every()`, `.sometimes()`, `.rev()`, pattern transforms |
| 6 | The Drop | Arrangement, silence, tension and release |
| 7 | Chopping | Sample slicing, break manipulation, amen |
| 8 | Melodic DnB | Scales, arpeggios, melody over beats |
| 9 | The Set | Transitions, chaining, live performance |

### 🎹 Blues Track

Functional harmony in Bb. Strudel as a theory lab. Everything transfers to guitar.

| # | Module | What You Learn |
|---|--------|---------------|
| 1 | Intervals + Dom7 | Intervals, stacking thirds, dominant 7th chord quality |
| 2 | The 12-Bar Form | I7-IV7-V7 in Bb, the form, feel the loop |
| 3 | Blues Scale | Minor pentatonic + blue notes over changes |
| 4 | Chord Tones | Targeting 3rd/7th on downbeats |
| 5 | Voice Leading | 7th→3rd resolution, guide tone lines |
| 6 | Turnarounds | V-IV-I, I-VI-ii-V, ending setups |
| 7 | Jazz Blues | ii-V subs, tritone subs |
| 8 | Bird Blues | Blues for Alice changes |
| 9 | Soloing | Chord tone melody, approach notes, rhythmic variation |

---

## ⚡ How It Works

Every lesson is a single HTML page. No framework. No build step. Open it and press play.

### Embedded Strudel Editors

Full [Strudel](https://strudel.cc) REPL running in-page via `<strudel-editor>` web component. CodeMirror editor, all synths, all effects. Change the code, press play, hear the difference. Every editor has **play**, **stop**, and **share** buttons — share generates a `strudel.cc` URL encoding your code.

### Audio-Reactive Hydra Visuals

[Hydra](https://hydra.ojack.xyz) runs on a background canvas. The visuals respond to the music — FFT analysis drives rotation, scale, saturation, and kaleidoscope. Toggle on/off from the floating controls.

### Rabbit Holes

Collapsible deep-dives for when a concept has depth worth exploring. Collapsed by default — they never block the lesson flow. Inside you'll find:

- **Clickable euclidean circles** — Bjorklund algorithm runs live, SVG redraws on click, rhythm necklace visualization
- **Waveform canvas** — draw sine/saw/square/triangle shapes + hear them via Web Audio API
- **Filter SVGs** — LPF and HPF frequency response curves
- **ADSR envelopes** — color-coded attack/decay/sustain/release diagrams
- **DnB history** — acid house → jungle → drum and bass, the tempo wars, why the genre is named after what's left at the drop
- **The amen break** — the 6-second drum solo from 1969 that built half of electronic music

### Pedagogy

Every concept follows **PLAY → HEAR → TWEAK → NAME → COMPOSE**:

| Stage | What Happens |
|-------|-------------|
| **Play** | Press play. No labels. Just sound. |
| **Hear** | Guided listening — "focus on the low end." |
| **Tweak** | Change a number. Hear what breaks. |
| **Name** | *Now* the theory term arrives. After you've heard it. |
| **Compose** | Combine it with everything else. Build the capstone. |

---

## 🏗 Stack

```
HTML + inline CSS/JS          zero build step, zero dependencies to install
@strudel/repl@1.3.0           Strudel editor web component (CDN)
hydra-synth@1.3.29            generative audio-reactive visuals (CDN)
Web Audio API                  waveform playback in rabbit holes
Inline SVG + JS               interactive diagrams (euclidean circles, ADSR, filters)
GitHub Pages                   hosting
```

No npm. No node_modules. No webpack. No React. Each page is a self-contained HTML file that loads two scripts from a CDN. That's the whole stack.

---

## 📁 Structure

```
hljod/
├── docs/                           ← GitHub Pages root
│   ├── index.html                  ← landing page (Ramp + Ride tabs)
│   ├── edm-0-first-noise.html      ← 60KB, patterns + mini-notation
│   ├── edm-1-the-break.html        ← DnB drum fundamentals + 170bpm
│   ├── hero.png                    ← generated hero image
│   └── CNAME                       ← hljod.peleke.me
├── .claude/skills/strudel-lesson/  ← lesson generation skill
│   ├── SKILL.md                    ← full page generation spec
│   └── strudel-reference.md        ← verified strudel syntax
└── README.md
```

---

## 🔊 Audio Routing

Strudel creates its own `AudioContext`. We monkey-patch `AudioNode.prototype.connect` to tap any node connecting to the destination, feeding an `AnalyserNode` that drives Hydra's FFT data. The visuals react to whatever's playing. No mic required.

```
Strudel audio → destination (speakers)
         ↘
      AnalyserNode → FFT bins → Hydra's a.fft[] → shader uniforms
```

---

## License

MIT. Go make noise.

---

<div align="center">

**hljóð** · [peleke.me](https://peleke.me) · built with [strudel](https://strudel.cc) + [hydra](https://hydra.ojack.xyz)

[⬆ Back to top](#hljóð)

</div>
