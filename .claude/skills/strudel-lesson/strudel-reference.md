# Strudel Quick Reference

Verified syntax for strudel.cc (browser-based TidalCycles port in JavaScript).

---

## Mini-Notation (Pattern Language)

The core pattern syntax. Used inside quotes in `s()`, `note()`, `n()`, etc.

| Syntax | Meaning | Example |
|--------|---------|---------|
| `a b c` | Sequence — divide cycle equally | `s("bd sd hh")` |
| `[a b]` | Group — subdivide that slot | `s("bd [sd sd] hh")` |
| `[a b c, d e]` | Stack/polyphony — play simultaneously | `note("[c3,e3,g3]")` |
| `<a b c>` | Alternate — one per cycle | `s("bd <sd cp>")` |
| `a*N` | Repeat N times (speeds up) | `s("hh*8")` |
| `a/N` | Slow by N (spans N cycles) | `s("[bd sd hh oh]/2")` |
| `~` | Rest/silence | `s("bd ~ sd ~")` |
| `a!N` | Replicate (repeat without speed change) | `s("bd!3 sd")` = `s("bd bd bd sd")` |
| `a@N` | Elongate (hold for N time units) | `note("c3@3 e3")` |
| `a?` | Degrade — 50% chance of silence | `s("hh*8?")` |
| `a?0.2` | Degrade with probability | `s("hh*8?0.2")` |
| `a\|b` | Random choice between options | `note("c3\|e3\|g3")` |
| `(k,n)` | Euclidean rhythm (k hits in n slots) | `s("bd(3,8)")` |
| `(k,n,r)` | Euclidean with rotation | `s("bd(3,8,2)")` |

### String Types
- `"double quotes"` — mini-notation (parsed)
- `'single quotes'` — regular strings (NOT parsed). Used for scale names, bank names, etc.
- `` `backticks` `` — multi-line mini-notation

---

## Core Functions

```javascript
// Samples
s("bd sd hh oh")              // play samples by name
sound("bd sd hh oh")          // alias for s()

// Notes
note("c3 e3 g3 b3")          // play notes (uses default synth)
note("c3 e3 g3").s("piano")  // play notes with specific sound

// Sample selection within a bank
s("drum").n("0 1 2 3")       // pick sample numbers from "drum" bank
n("0 2 4 6").s("jazz")       // same thing, different order

// Stacking (simultaneous patterns)
stack(
  s("bd sd"),
  s("hh*4"),
  note("c3 eb3").s("sawtooth")
)

// Multiple simultaneous patterns (alternative to stack)
$: s("bd sd")
$: s("hh*4")
$: note("c3 eb3").s("sawtooth")

// Sequencing
cat("bd", "sd", "hh")        // one per cycle (slowcat)
seq("bd", "sd", "hh")        // all in one cycle (fastcat)
```

---

## Tempo

```javascript
setcpm(42.5)                  // cycles per minute (global)
// For DnB at 170bpm with 4 beats per cycle: 170/4 = 42.5
// For house at 128bpm with 4 beats per cycle: 128/4 = 32

.cpm(42.5)                    // per-pattern tempo
```

---

## Effects

```javascript
// Volume & Panning
.gain(0.8)                    // volume (0-1+)
.pan(0.5)                     // stereo position (0=left, 0.5=center, 1=right)
.pan(sine)                    // automate with signal

// Reverb
.room(0.5)                    // reverb amount (0-1)
.size(0.9)                    // reverb size
.roomlp(8000)                 // reverb lowpass
.roomfade(0.5)                // reverb fade

// Delay
.delay(0.5)                   // delay amount (0-1)
.delaytime(0.25)              // delay time
.delayfeedback(0.5)           // delay feedback

// Distortion
.distort(0.5)                 // distortion
.crush(4)                     // bit crush
.squiz(2)                     // squiz (pitch quantize)

// Speed
.speed(2)                     // playback speed (pitch shift for samples)
.speed(-1)                    // reverse playback

// Vowel
.vowel("a e i o")             // vowel filter
```

---

## Filters

```javascript
// Lowpass
.lpf(1000)                    // lowpass frequency (or .cutoff())
.lpq(5)                       // lowpass resonance (Q)

// Highpass
.hpf(200)                     // highpass frequency
.hpq(5)                       // highpass resonance

// Bandpass
.bpf(1000)                    // bandpass frequency
.bpq(5)                       // bandpass resonance

// Filter envelope (lowpass)
.lpa(0.005)                   // filter attack
.lpd(0.1)                     // filter decay
.lps(0.5)                     // filter sustain
.lpq(5)                       // filter Q
.lpenv(4)                     // filter envelope depth

// Filter type
.ftype('24db')                // filter slope
```

---

## Synthesis (ADSR)

```javascript
.attack(0.01)                 // attack time
.decay(0.1)                   // decay time
.sustain(0.5)                 // sustain level
.release(0.3)                 // release time

// Built-in synth types (use with .s() or s())
.s("sawtooth")                // saw wave
.s("square")                  // square wave
.s("triangle")                // triangle wave
.s("sine")                    // sine wave
```

### FM Synthesis

```javascript
note("c3 e3 g3")
  .s("sine")
  .fm(4)                      // FM modulation index (brightness)
  .fmh(2)                     // FM harmonicity ratio (timbre)
```

### ZZFX Synth

```javascript
note("c2 eb2 f2 g2")
  .s("z_sawtooth")            // z_sine, z_square, z_tan, z_noise
  .attack(0.001)
  .decay(0.1)
  .sustain(0.8)
  .release(0.1)
  .slide(0)                   // pitch slide
  .noise(0.1)                 // noise amount
  .zmod(0)                    // FM speed
  .zcrush(0)                  // bit crush 0-1
```

---

## Pattern Transforms

```javascript
.fast(2)                      // double speed
.slow(2)                      // half speed
.rev()                        // reverse pattern
.ply(2)                       // repeat each event N times
.chop(8)                      // chop each sample into N slices

// Conditional transforms
.every(4, fast(2))            // every 4th cycle, double speed
.every(3, rev)                // every 3rd cycle, reverse
.sometimes(fast(2))           // ~50% chance per cycle
.often(x => x.fast(2))        // ~75% chance
.rarely(rev)                  // ~25% chance
.someCycles(fast(2))          // randomly on some cycles

// Spatial / stereo
.jux(rev)                     // L=normal, R=reversed
.juxBy(0.5, rev)              // partial stereo split

// Offset / layering
.off(1/8, add(note(7)))       // offset by 1/8 cycle + add a fifth
.off(1/4, x => x.speed(2))   // offset + transform
.superimpose(fast(2))         // overlay a faster version

// Value transforms
.add(note(7))                 // add to note values
.sub(note(3))                 // subtract from values

// Chunking
.chunk(4, fast(2))            // apply transform to 1/4 of pattern, rotating
```

---

## Signals (Continuous Patterns)

```javascript
sine                          // 0 → 1 → 0 → -1 → 0 (one cycle)
cosine                        // cosine wave
saw                           // 0 → 1 sawtooth
tri                           // triangle wave
square                        // 0/1 square wave
perlin                        // smooth random noise
rand                          // random 0-1

// Mapping
sine.range(200, 2000)         // map to frequency range
perlin.range(0.5, 1)          // map noise to gain range

// Speed
sine.slow(4)                  // one full wave every 4 cycles
perlin.fast(2)                // faster noise
```

**Usage**: signals go where values go:
```javascript
s("bd sd hh oh")
  .lpf(sine.range(200, 4000).slow(8))     // sweeping filter
  .pan(sine.slow(2))                        // panning
  .gain(perlin.range(0.3, 1))              // random dynamics
```

---

## Scales

```javascript
// Scale mapping (number → note)
n("0 2 4 5 7").scale("C:major")
note("0 2 4 5 7".scale("C:minor"))

// Common scales:
// major, minor, dorian, mixolydian, pentatonic,
// blues, aeolian, phrygian, lydian, locrian,
// whole, chromatic, harmonicMinor, melodicMinor

// Voicings (for chords)
note("<Cm7 Fm7 G7 Cm7>")
  .voicings("lefthand")
```

---

## Samples

```javascript
// Built-in samples
s("bd sd hh oh")              // basic kit
s("drum:0 drum:1")            // numbered samples
s("jazz").n("0 1 2 3")        // cycle through jazz kit

// Sample banks
.bank("RolandTR909")          // use specific bank
.bank("RolandTR808")

// Load external samples
samples('github:tidalcycles/dirt-samples')

// Custom sample map
samples({
  kick: 'https://url/kick.wav',
  snare: ['https://url/snare1.wav', 'https://url/snare2.wav']
})
```

---

## Common DnB Patterns

```javascript
// Basic DnB tempo (170bpm, 4 beats per cycle)
setcpm(42.5)

// Classic kick pattern
s("bd ~ ~ ~ bd ~ ~ ~")

// Half-time snare (on beat 3)
s("~ ~ ~ ~ sd ~ ~ ~")

// Fast hats
s("hh*16").gain("0.5 0.7 0.6 0.8")

// Reese bass (two detuned saws)
note("c1").s("sawtooth")
  .lpf(800).lpq(3)

// Amen-style break (via euclidean)
s("bd(3,8), sd(2,8,1), hh*16")
```

---

## Common Blues Patterns (Bb)

```javascript
// Bb dominant 7th chord
note("[bb3,d4,f4,ab4]").s("piano")

// Eb dominant 7th (IV)
note("[eb3,g3,bb3,db4]").s("piano")

// F dominant 7th (V)
note("[f3,a3,c4,eb4]").s("piano")

// 12-bar blues in Bb (each chord = 1 cycle, /12 to make 12-bar)
// I  I  I  I  IV IV I  I  V  IV I  V
note(`<
  [bb3,d4,f4,ab4] [bb3,d4,f4,ab4] [bb3,d4,f4,ab4] [bb3,d4,f4,ab4]
  [eb3,g3,bb3,db4] [eb3,g3,bb3,db4] [bb3,d4,f4,ab4] [bb3,d4,f4,ab4]
  [f3,a3,c4,eb4] [eb3,g3,bb3,db4] [bb3,d4,f4,ab4] [f3,a3,c4,eb4]
>`)

// Bb blues scale
note("bb3 db4 eb4 e4 f4 ab4 bb4")

// Bb minor pentatonic
note("bb3 db4 eb4 f4 ab4 bb4")
```

---

## Visualization

```javascript
._scope()                     // waveform scope (debug/visual)
._pianoroll()                 // piano roll visualization
```

---

## Tips

- `ctrl+enter` to evaluate in the REPL
- `ctrl+.` to stop all sound
- Multiple `$:` lines run simultaneously
- Strudel share URLs encode the code in the hash — instant shareable links
- `.log()` prints pattern events to console (debug)
