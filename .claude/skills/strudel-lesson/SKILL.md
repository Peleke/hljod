---
name: strudel-lesson
description: Generate interactive HTML lesson pages for hljóð (hljod.peleke.me) that teach music + live coding through PLAY→HEAR→TWEAK→NAME→COMPOSE. Each module is a self-contained HTML page with embedded strudel editors, interactive rabbit-hole visualizations, hydra background, and a shareable capstone. Two tracks — EDM (DnB-flavored, strudel-native) and Blues (harmony-focused in Bb).
---

# Strudel Lesson Generator

Generates self-contained HTML lesson pages that teach music theory and live coding simultaneously. Each page embeds `@strudel/repl` editors, audio-reactive hydra visuals, interactive SVG diagrams, and collapsible rabbit-hole deep-dives.

**This is not the notebook pipeline.** Output is HTML, not `.ipynb`. The strudel editor IS the engagement. Sound IS the feedback. Rabbit holes replace engagement widgets. The page is the lesson.

---

## Trigger Detection

- "generate EDM.0" / "generate blues.3"
- "next module" / "next lesson"
- "strudel lesson on [topic]"
- When a module from either track needs to be generated

---

## Output Format

Each module produces one HTML page:

```
site/{slug}.html       (e.g., edm-0-first-noise.html, edm-1-the-break.html)
```

Each page is **self-contained** — loads strudel + hydra from CDN, includes all CSS/JS inline, no build step. Open it in a browser and everything works.

### Page Stack

```html
<!-- CDN dependencies (no npm, no build) -->
<script src="https://unpkg.com/hydra-synth@1.3.29/dist/hydra-synth.js"></script>
<script src="https://unpkg.com/@strudel/repl@1.3.0"></script>
```

- **Strudel**: `<strudel-editor>` web component from `@strudel/repl` — full CodeMirror editor, runs in-page (not iframe)
- **Hydra**: audio-reactive background canvas, toggleable via floating control
- **Audio routing**: monkey-patch `AudioNode.prototype.connect` to tap strudel's AudioContext → AnalyserNode → FFT → hydra's `a` object

### Page Template Structure

```
<head>
  <style> [full CSS — dark theme, all component styles] </style>
</head>
<body>
  <canvas id="hydra-canvas"/>           <!-- fixed background -->
  <div class="progress-bar"/>           <!-- scroll progress -->
  <nav class="top-nav"/>               <!-- section links, back arrow to index.html -->
  <div class="float-controls"/>         <!-- hydra toggle, hush button -->
  <div class="container">
    <section id="hero"/>               <!-- title, subtitle -->
    <section id="[slug]"/>             <!-- teaching sections (3-5) -->
    <section id="capstone"/>           <!-- final shareable piece -->
  </div>
  <script> [audio routing monkey-patch] </script>
  <script src="strudel CDN"/>
  <script> [hydra setup, editor controls, scroll/nav, keyboard shortcuts] </script>
</body>
```

Copy the CSS and JS **verbatim** from an existing lesson page (e.g., `edm-0-first-noise.html`). Do not abbreviate. The template is large but it must be complete.

---

## The Loop: PLAY → HEAR → TWEAK → NAME → COMPOSE

Every concept runs this cycle:

| Stage | What Happens | In the Page |
|-------|-------------|-------------|
| **PLAY** | Hear it. Hit play. No labels. | Strudel editor with pre-loaded code. |
| **HEAR** | Guided listening. "Focus on X." | Teaching text pointing the ear. |
| **TWEAK** | Modify. Change a number, swap a pattern. | `.try-this` box with specific modification instructions. |
| **NAME** | Formalize. Give it the music theory name. | `.concept` box introducing the term AFTER they've heard it. |
| **COMPOSE** | Apply. Combine with prior concepts. Build. | Feeds into the capstone. |

### Concept Primitives (Musical)

Smallest unit where *musical confusion* is possible. Decompose until the answer to "could this sound wrong to someone?" is no.

### Jargon-Earning Order

No music term before it's heard. Description sentence BEFORE the editor, but the NAME comes AFTER.

```
GOOD: <h3>Euclidean — let math place the hits</h3>
      <p>(3,8) distributes three kicks across eight slots. Math picks the spacing.</p>
      [strudel editor with s("bd(3,8)")]
      <p>That's a euclidean rhythm. It's maximally even.</p>

BAD:  <h3>Euclidean Rhythms</h3>
      <p>A euclidean rhythm is defined as...</p>
      [editor]
```

---

## Page Components

### Strudel Editor Block

Every editor gets play/stop/share buttons:

```html
<div class="strudel-block">
    <div class="strudel-label">
        <span>LABEL TEXT</span>
        <div class="strudel-controls">
            <button class="strudel-play" onclick="strudelPlay(this)">&#9654; play</button>
            <button class="strudel-stop" onclick="strudelStop(this)">&#9632; stop</button>
            <button class="strudel-share" onclick="strudelShare(this)">&#8599; share</button>
        </div>
    </div>
    <strudel-editor id="ed-ID">
    <!--
STRUDEL CODE HERE
    -->
    </strudel-editor>
</div>
```

- **Share button**: constructs `strudel.cc/#base64code` URL, copies to clipboard
- **Play**: evaluates + starts. Stops all other editors first.
- Starting one editor stops all others (no cacophony)

### Section Headings

```html
<h3>Bold Heading — short description</h3>
```

- `h3` is bold + accent color (#ff6b35), NOT italic
- Description sentence follows the heading, BEFORE the editor
- Section number labels on `h2`: `<h2><span class="num">01</span>Title</h2>`

### Try-This Prompts

```html
<div class="try-this">
    <span class="label">tweak it</span>
    <p>Specific modification instruction with <code>code examples</code>.</p>
</div>
```

### Concept Boxes

```html
<div class="concept">
    <span class="c-label">CONCEPT NAME</span>
    <p>Explanation of the concept they just heard/built.</p>
</div>
<!-- use .concept.warm for accent-colored border -->
```

---

## Rabbit Holes (Recursive Deep-Dives)

**Critical pattern.** When a concept has depth worth exploring but would break the lesson flow, wrap it in a collapsible rabbit hole. The learner can skip it or dive in.

### When to Create a Rabbit Hole

A concept is a rabbit hole candidate when:
- It has **cultural/historical context** (euclidean rhythms → West African traditions)
- It has **visual structure** that aids understanding (waveforms, filter curves, ADSR shape)
- It connects to **math or theory** beyond the current scope (Bjorklund algorithm, necklace theory)
- The learner would benefit from **interactive exploration** (clicking different rhythms, hearing different waves)
- Explaining it inline would **break the lesson's momentum**

### Rabbit Hole Structure

```html
<details class="rabbit-hole">
    <summary>rabbit hole — SHORT DESCRIPTION</summary>
    <div class="rh-body">
        <h4>Sub-section title</h4>
        <p>Teaching text.</p>
        [interactive elements: SVGs, canvases, tables, strudel editors]
    </div>
</details>
```

- Purple accent color (#ab47bc) for rabbit hole chrome
- Collapsed by default — never blocks the main lesson flow
- Self-contained — everything needed is inside the collapsible
- Can contain strudel editors (with full play/stop/share controls)
- Inline `<script>` tags for interactivity go INSIDE the rabbit hole div, not at page bottom

### Interactive Visualization Patterns

These are the proven patterns from EDM.0. Use them as templates.

#### 1. Clickable SVG Diagram (e.g., Euclidean Circle)

```
[toggle buttons for different states]
[inline SVG with dynamic groups (<g> elements) for arcs, dots, labels]
[inline <script> implementing the algorithm + SVG update logic]
[explanatory text below, introducing formal terminology]
```

- Buttons styled as toggle buttons (monospace, small, accent border on active)
- SVG uses `viewBox` for responsive sizing, dark fill (#141418)
- JavaScript implements the algorithm (e.g., Bjorklund) and redraws SVG on click
- Group elements (`<g id="...">`) cleared and repopulated on each redraw
- Binary pattern text display below the SVG

#### 2. Waveform Visualizer with Audio Playback

```
[toggle buttons for wave types: sine, sawtooth, square, triangle]
[<canvas> element for waveform drawing]
[inline <script> with drawWave() + playTone() functions]
```

- Canvas: 800×120 internal, 100% width display, dark background
- Draws 3-4 complete cycles of the mathematical waveform
- Uses Web Audio API OscillatorNode (NOT Tone.js) for 1-second tone playback
- GainNode for fade-out envelope on the preview tone
- Can share the page's captured AudioContext or create its own

#### 3. Static SVG Illustrations (e.g., Filter Curves, ADSR Envelope)

```
[inline SVG with viewBox, dark fill, labeled axes]
```

- Filter curves: show frequency response (flat → cutoff → drop), fill the "pass" region
- ADSR: classic shape with color-coded segments (attack=accent, decay=cool, sustain=green, release=purple)
- Labels in monospace font, axis labels in dim text
- Side-by-side layout with flexbox for comparisons (LPF vs HPF)
- No JavaScript needed — pure SVG

#### 4. Reference Tables

```html
<table>
    <thead><tr><th>column</th><th>column</th></tr></thead>
    <tbody>
    <tr><td>MONOSPACE VALUE</td><td>description</td></tr>
    </tbody>
</table>
```

- First column: monospace, cool color (#4fc3f7), bold
- Even rows: darker background (#12121a)
- Used for: cultural origins, syntax reference, parameter tables

---

## Collapsible Reference Sections

Two types of collapsible reference at the bottom of every lesson:

### "What You Earned" (Required)

```html
<details class="earned">
    <summary>what you earned</summary>
    <div class="earned-body">
    <table>
        <thead><tr><th>tool</th><th>does</th><th>looks like</th></tr></thead>
        <tbody>
        <tr><td>TOOL</td><td>description</td><td><code>example</code></td></tr>
        </tbody>
    </table>
    <p class="earned-next">Next: <em>MODULE TITLE</em> — teaser.</p>
    </div>
</details>
```

- Lists EVERY new tool/function/concept introduced in this module
- Includes ALL code that appeared in blue (`<code>`) throughout the lesson
- "Next" teaser at the bottom

### Mini-Notation / Syntax Reference (When Applicable)

Same `<details class="earned">` pattern. Lives alongside "what you earned" at the bottom. Growing reference that expands as modules introduce new syntax.

---

## Capstone Requirements

The final section of every page:

1. **Punchline box**: gradient background (accent→cool), brief "everything combined" text
2. **Strudel editor**: the shareable piece with play/stop/share controls
3. **Compose exercises**: `.exercises` box with 3-4 numbered modification challenges
4. **"What you earned"**: collapsible reference index
5. **Reference tables**: mini-notation or other syntax references as collapsibles

The capstone IS the assessment. If the learner can understand and modify it, they've learned the module. The share button IS the graduation.

---

## Two Tracks

### EDM Track (DnB-flavored, strudel-native)

Strudel as THE instrument. Rhythm, pattern manipulation, synthesis, arrangement.

| # | Slug | Concepts | Capstone |
|---|------|----------|----------|
| 0 | first-noise | patterns, mini-notation, `s()`, `note()`, `stack()` | a weird intentional loop |
| 1 | the-break | DnB breakbeat, 170bpm, half-time snare, kick | a proper DnB drum pattern |
| 2 | the-bass | sub bass, reese, `note()` with synths, filtering | drums + bass together |
| 3 | layers | `stack()`, polyrhythm, euclidean, hat rolls | full arrangement with texture |
| 4 | atmosphere | pads, reverb, delay, samples, texture layers | moody dnb track |
| 5 | movement | `.every()`, `.sometimes()`, `.rev()`, `.fast()`, transforms | track that evolves |
| 6 | the-drop | arrangement, silence, tension → release | intro → build → drop |
| 7 | chopping | `.chop()`, `.slice()`, break manipulation, amen | chopped break track |
| 8 | melodic-dnb | scales, arpeggios, melody over beats | melodic dnb (bridges to blues) |
| 9 | the-set | chaining, transitions, live performance | 2-3 min live set |

### Blues Track (harmony, Bb)

Strudel as theory lab. Everything transfers to guitar.

| # | Slug | Concepts | Capstone |
|---|------|----------|----------|
| 1 | intervals-dom7 | intervals, stacking 3rds, dominant 7th quality | dom7 chord in Bb |
| 2 | twelve-bar | I7-IV7-V7 in Bb, 12-bar form, feel the loop | 12-bar blues comp |
| 3 | blues-scale | minor pentatonic + blue notes over changes | melody over 12-bar |
| 4 | chord-tones | targeting 3rd/7th on downbeats, skeletal soloing | chord tone solo |
| 5 | voice-leading | 7th→3rd resolution, guide tone lines | guide tone line |
| 6 | turnarounds | V-IV-I, I-VI-ii-V, ending setups | blues with turnarounds |
| 7 | jazz-blues | ii-V subs, tritone subs, enriched form | jazz blues comp + melody |
| 8 | bird-blues | Blues for Alice changes, deep functional harmony | bird blues head |
| 9 | soloing | chord tone melody, approach notes, rhythmic variation | full solo over blues |

### Cross-Pollination

- EDM.8 (melodic dnb) draws on Blues.1-4 harmonic concepts
- Blues.9 (soloing rhythm) draws on EDM.3-5 pattern manipulation
- After completing both track 0-4, learner can alternate freely

---

## Rabbit Hole Candidates by Module

Known concepts that warrant rabbit holes. Generate these when the concept appears.

| Module | Concept | Rabbit Hole Content |
|--------|---------|-------------------|
| EDM.0 | Euclidean rhythms | Bjorklund algorithm, clickable circle SVG, cultural origins table, rotation, rhythm necklace concept |
| EDM.0 | Synth waves | Waveform canvas visualizer with Web Audio playback (sine/saw/square/tri) |
| EDM.0 | Filters | LPF/HPF frequency response SVG illustrations side-by-side |
| EDM.0 | ADSR envelope | Classic ADSR shape SVG with color-coded segments |
| EDM.1 | Tempo/BPM | BPM↔CPM conversion math, genre tempo table |
| EDM.1 | The amen break | History (Gregory Coleman, The Winstons, 1969), royalties story, playable amen-ish pattern |
| EDM.2 | Reese bass | Detuning, beating frequencies, why two saws make that sound |
| EDM.4 | Reverb/delay | Signal flow diagrams, wet/dry, feedback loops |
| EDM.7 | Sampling history | Fairlight, SP-1200, legal battles, the culture |
| Blues.1 | Intervals | Keyboard/fretboard SVG showing semitone distances |
| Blues.2 | 12-bar form | Form diagram showing bar numbers and chord changes |
| Blues.7 | Tritone substitution | Circle of fifths connection, why it works harmonically |

---

## Prose Rules

Flat, non-poetic, terse. A friend pointing at the mix.

**DO**:
- "C in the second octave."
- "Three hits, eight slots."
- "Same necklace, different downbeat."

**DON'T**:
- "The gaps are where the groove lives." (poetic → LLM-coded)
- "This is how you make fast hi-hat rolls." (filler construction)
- "In this section we will explore..." (textbook voice)
- "Let's dive into..." (LLM throat-clearing)

### Voice Calibration

100% register C (Respectful Tour Guide — Paul Ford). No Mickens frustration, no Sedaris self-deprecation. Just flat, direct, competent pointing.

---

## Strudel Syntax

See `strudel-reference.md` for verified syntax. **Always verify generated code against the reference.** Invalid syntax = broken editor = broken trust.

---

## Generation Checklist

Before outputting a lesson page:

- [ ] Valid strudel code in every editor (verified against reference)
- [ ] Prerequisite chain: section HAS matches prior section's AFTER
- [ ] Jargon-earning: no term used before it's heard
- [ ] PLAY→HEAR→TWEAK→NAME runs at least once per concept primitive
- [ ] COMPOSE step present (micro within sections, macro in capstone)
- [ ] All editors have play/stop/share buttons (exact HTML pattern)
- [ ] Capstone is self-contained and sounds good
- [ ] "What you earned" table includes ALL blue-code terms from the lesson
- [ ] Rabbit holes present for depth-worthy concepts
- [ ] Rabbit hole SVGs/canvases have correct inline scripts
- [ ] No forward references within or across sections
- [ ] BPM/tempo correct for genre (DnB: 170bpm → setcpm(42.5))
- [ ] Prose passes Bragi check — no LLM-coded constructions
- [ ] Back arrow in nav links to index.html
- [ ] CSS and JS copied verbatim from template (not abbreviated)
- [ ] Page loads and renders with just CDN dependencies (no build step)

---

## Anti-Patterns

1. **Definition before sound.** The learner must hear it before you name it.
2. **Broken editors.** Every strudel block must run. Verify syntax.
3. **Textbook voice.** "In this lesson we will explore" → delete the sentence.
4. **LLM poetry.** "Where the groove lives" → say what you mean, flat.
5. **Skipping PLAY.** Every concept starts with sound. Text-first = failure.
6. **Boring capstones.** If you wouldn't post it, the learner won't either.
7. **Overcrowded modules.** 3-5 sections per page. Split if needed.
8. **Isolated theory.** Every theory concept must be immediately audible.
9. **Missing rabbit holes.** If a concept has depth, wrap it. Don't inline 500 words of history.
10. **Static where interactive works.** If you can click it and hear/see it change, do that. Static SVG is the fallback, not the default.
11. **Abbreviated templates.** The full CSS and JS must be in every page. No "see other file" shortcuts.
