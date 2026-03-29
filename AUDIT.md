# Approximation Audit — Honest Assessment

Every game music "approximation" in L0-L7, rated for accuracy.

## Verdict Key
- **CORRECT** — right notes, recognizable
- **CLOSE** — right key/feel, wrong specific notes, not recognizable
- **WRONG** — wouldn't be identified as this piece by anyone
- **ORIGINAL** — not claiming to be a specific piece (taiko, koto, etc.)
- **NEEDS TRANSCRIPTION** — flag for Peleke to transcribe from guitar/recording

---

## L0: First Noise

| Piece | Code | Verdict | Notes |
|-------|------|---------|-------|
| Zelda Chest Jingle | `note("c4 e4 g4 c5")` | **WRONG** | The actual chest jingle is a specific sequence that varies by game. This is a generic ascending C major arpeggio. It's not the chest sound from any Zelda game. NEEDS TRANSCRIPTION. |
| Mario Coin | `note("b4 e5")` | **CLOSE** | The actual coin is B5 E6 (higher octave). The interval is correct (up a 4th). Fix: raise octave. |

## L1: The Break

| Piece | Code | Verdict | Notes |
|-------|------|---------|-------|
| Brinstar | `note("a2 ~ a2 ~ c3 ~ a2 ~")` + hats | **WRONG** | Generic A minor bass pattern. Brinstar's actual bass is in E minor area with a specific chromatic descent. Not recognizable. NEEDS TRANSCRIPTION. |
| Wily Stage 1 | `note("cs3 cs3 gs3 cs3 cs3 gs3 cs3 e3")` | **WRONG** | Right key (C#m). Wrong melody entirely. The iconic intro is a specific ascending pattern. This is generic root-fifth bass. NEEDS TRANSCRIPTION. |
| Taiko pulse | `s("bd ~ ~ bd ~ ~ bd ~")` | **ORIGINAL** | Not claiming to be a specific piece. Fine as-is. |
| Taiko + koto | same + koto | **ORIGINAL** | Same. Fine. |

## L2: The Bass

| Piece | Code | Verdict | Notes |
|-------|------|---------|-------|
| Skyrim Dragonborn | `note("d2").s("sawtooth")` | **WRONG** | A single D2 sawtooth note. The Dragonborn theme's bass is a specific chord progression (Dm-Bbm-Gm-Am area). This is nothing. NEEDS TRANSCRIPTION or replace with "inspired by" exercise. |
| Minecraft Subwoofer Lullaby | `note("a2 ~ ~ e3 ~ ~ a2 ~")` | **CLOSE** | The actual piece uses similar sparse, slow notes in A. The interval and feel are right-ish. The specific notes may differ. NEEDS VERIFICATION. |

## L3: Layers

| Piece | Code | Verdict | Notes |
|-------|------|---------|-------|
| Wind Scene | `note("e5 ~ d5 ~ c5 ~ b4 ~ a4 ~ ~ ~")` + arps | **WRONG** | Generic descending scale in C. Wind Scene's actual melody is a specific pattern in... not C. NEEDS TRANSCRIPTION. |
| Stardew Spring | `note("g4 a4 b4 d5 b4 a4 g4 ~")` + chords | **CLOSE** | G major ascending-descending. The actual Spring theme is in a similar key/feel. Specific notes likely wrong. NEEDS VERIFICATION. |

## L4a: Space

| Piece | Code | Verdict | Notes |
|-------|------|---------|-------|
| Firelink Shrine | `note("d4 ~ ~ a3 ~ ~ f4 ~ ~ d4 ~ ~")` | **WRONG** | Generic arpeggiated pattern in D minor area. Firelink's actual melody is a specific guitar figure. NEEDS TRANSCRIPTION. |
| BotW Temple of Time | `note("a4 ~ ~ ~ ~ e4 ~ ~ ~ ~ ~ ~ c5 ~ ~ ~")` | **WRONG** | Generic sparse piano notes. BotW Temple of Time's actual piano has specific notes in a specific key. NEEDS TRANSCRIPTION. |
| OoT Temple of Time | `note("[d3,a3,d4]")` pad + `note("d5 ~ ~ a4 ~ ~ d5 ~ ~ f5 ~ ~")` bells | **CLOSE** | The D minor chord/feel is in the right area. The specific bell melody is probably wrong. NEEDS VERIFICATION. |

## L5: Movement

| Piece | Code | Verdict | Notes |
|-------|------|---------|-------|
| Lost Woods | `note("f4 a4 b4 f4 a4 b4 f4 a4 b4 e5 d5 b4 c5 b4 g4 e4")` | **CLOSE** | This matches some kalimba transcriptions of Saria's Song. Key of C/F area seems right. The ocarina melody is F A B repeated then E D, B C B G E. This might actually be close. NEEDS VERIFICATION against official sheet music. |
| Megalovania | `note("d4 d4 d5 a4 ~ ab4 g4 f4 d4 f4 g4")` | **CLOSE** | The opening D D D A Ab G F D F G pattern is approximately the Megalovania intro. Key of D minor is correct. NEEDS VERIFICATION of exact rhythm. |
| Fez | `note("c4 e4 g4 b4 c5 b4 g4 e4")` | **ORIGINAL** | "Fez-style" not claiming to be a specific Fez track. Fine. |

## L6: The Drop

| Piece | Code | Verdict | Notes |
|-------|------|---------|-------|
| One Winged Angel | Generic E minor chord build | **WRONG** | Not even attempting the actual melody. It's a generic build using E minor chords. OWA's actual chord progression and melody are specific. NEEDS TRANSCRIPTION. |
| Sealed Vessel | Generic C major piano → crash | **WRONG** | Not the actual piece. Generic quiet→loud exercise. NEEDS TRANSCRIPTION. |

## L7: Chopping

| Piece | Code | Verdict | Notes |
|-------|------|---------|-------|
| Corridors of Time | `note("d5 e5 fs5 a5 fs5 e5 d5 ~")` | **CLOSE** | D major area, the ascending-descending pattern is in the right family. The actual melody has a specific rhythm and specific notes. NEEDS VERIFICATION. |
| NES vs SNES comparison | `note("f3 ~ f3 ~ ab3 ~ bb3 c4")` | **ORIGINAL** | Not claiming to be a specific piece. Teaching synthesis vs samples concept. Fine. |

---

## Summary

| Verdict | Count | Action |
|---------|-------|--------|
| CORRECT | 0 | — |
| CLOSE | 6 | Verify against sheet music, fix where wrong |
| WRONG | 9 | NEEDS TRANSCRIPTION — Peleke transcribes, or replace with "listen + exercise" |
| ORIGINAL | 4 | Fine as-is |

**0 out of 15 game music approximations are confirmed correct.**

6 are close enough that verification might save them.
9 are wrong and need actual transcription.

---

## Priority transcription list (for Peleke)

1. **Mario Coin** — probably just needs octave fix (B5 E6)
2. **Lost Woods / Saria's Song** — might be close, verify
3. **Megalovania** — might be close, verify
4. **Corridors of Time** — might be close, verify
5. **Wily Stage 1** — iconic intro, recognizable, worth getting right
6. **Brinstar** — the bass line, worth getting right
7. **Zelda Chest Jingle** — which game? OoT? LttP? Pick one, transcribe it.
8. **BotW Temple of Time** — sparse piano, few notes, should be easy
9. **OoT Temple of Time** — the bells, verify
10. **Firelink Shrine** — the guitar figure
11. **Skyrim Dragonborn** — the bass progression
12. **Wind Scene** — the melody
13. **One Winged Angel** — the choir entrance, at minimum
14. **Sealed Vessel** — the piano opening
15. **Stardew Spring** — verify the melody

## Interim fix

For every WRONG piece: change the label from "(approximation)" to something honest like "inspired by the feel of [piece]" or replace with a YouTube link + exercise that teaches the same concept without pretending to be the song.
