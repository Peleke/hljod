---
name: content-multiplexer
description: Takes hljóð assets (lessons, capstones, visualizations, history sections, listening lists) and generates platform-specific content inputs for LinWheel (LinkedIn), Larry (TikTok), NoimosAI (Instagram), Typefully (X), and other distribution channels.
---

# hljóð Content Multiplexer

Transforms a single hljóð asset into distribution-ready content for the full social stack.

## Trigger

- "multiplex EDM.4" / "distribute lesson 8a"
- "content from [lesson/capstone/visualization/history section]"
- After publishing a new lesson or significant update

## Input

A hljóð asset, one of:
1. **Lesson** — a full lesson page (e.g., EDM.4: Atmosphere)
2. **Capstone** — a specific capstone track/editor
3. **Visualization** — an interactive element (euclidean necklace, harmonics canvas, resonance curve, D3 timeline)
4. **History section** — a historical narrative from a lesson
5. **Listening list** — curated tracks for a lesson
6. **Milestone** — "Phase 2 complete", "19 lessons live", etc.

## Output Channels

### 1. LinWheel (LinkedIn)
**Format**: `::linkedin` Obsidian note ready for LinWheel pipeline
**Angles** (pick 1-2 per asset):
- `field_note` — "I just shipped 19 interactive music lessons. Here's what I learned about teaching through code."
- `demystification` — "You don't need to read sheet music to understand harmony. Here's why."
- `contrarian` — "Music theory education is broken. Textbooks teach names before sounds. We flipped it."
- `synthesizer` — "What Pythagoras, Three 6 Mafia, and strudel.cc have in common."
- `identity_validation` — "If you've ever opened Ableton and felt lost, this is for you."

**Structure**: 3-5 beats (story units). Hook → tension → insight → proof → CTA.
**CTA**: Always link to the specific lesson page on hljod.peleke.me.

### 2. Larry (TikTok)
**Format**: Script + visual description for Larry to process
**Content types**:
- **"Build X in 30 seconds"** — Screen recording of typing strudel code, hitting play, sound comes out. Show the spiral viz. Keep it under 45 seconds.
- **"Did you know?"** — Historical fact from the history section over the editor playing. "The most sampled drum break in history was played by a man who died homeless."
- **"What does X sound like?"** — Play two things side by side. "Major vs minor. One semitone." Let the sound do the work.
- **"This is how [genre] works"** — Walk through a capstone pattern. "Phonk is 808 + cowbell + dark chords. Here's the code."

**Hook**: First 2 seconds must have sound or visual movement. The editor playing IS the hook.
**Length**: 15-45 seconds. Never over 60.

### 3. NoimosAI (Instagram)
**Format**: Visual asset description + caption for NoimosAI
**Content types**:
- **Reels** (same as TikTok, repurposed)
- **Static carousel**: Lesson summary in 5-8 slides. Slide 1: hook ("What if you could learn harmony by coding it?"). Slides 2-6: key concepts with code snippets. Final slide: CTA + lesson link.
- **History timeline graphic**: A node from the D3 timeline as a standalone image. "1969: Gregory Coleman plays a 7-second drum solo. It becomes the most sampled recording in history."
- **Listening list graphic**: Album art grid with the lesson's tracks + "hljóð EDM.4 listening list" branding.

**Aesthetic**: Dark background (#0a0a0c), accent orange (#ff6b35), cool blue (#4fc3f7). Match the site.

### 4. Typefully (X/Twitter)
**Format**: Thread draft (3-7 tweets)
**Structure**:
- Tweet 1: Hook + sound/visual (link to lesson or embed GIF)
- Tweets 2-5: Key insight from the lesson, one per tweet
- Final tweet: Link to lesson + "this is free, runs in your browser"

**Hashtags**: #livecoding #musictheory #strudel #electronicmusic (use sparingly, 1-2 per thread)

### 5. Newsletter (Buttondown)
**Format**: Section for weekly digest
**Structure**: 2-3 paragraphs per lesson. What shipped, what's interesting about it, link.
**Voice**: Personal, behind-the-scenes. "I spent 3 hours on the tritone rabbit hole because I couldn't stop reading about medieval monks banning intervals."

### 6. Reddit / HN
**Format**: Self-post draft
**Subreddits**: r/livecoding, r/musictheory, r/WeAreTheMusicMakers, r/InternetIsBeautiful
**HN**: "Show HN" format — what it is, why it exists, link
**Rule**: 80% value, 20% promotion. Lead with the interesting thing, not the product.

## Asset → Channel Matrix

| Asset Type | LinkedIn | TikTok | Instagram | X | Newsletter | Reddit/HN |
|------------|----------|--------|-----------|---|------------|-----------|
| New lesson | field_note | "build X in 30s" | carousel + reel | thread | digest section | self-post on milestone |
| Capstone | demystification | "this is how X works" | reel | single tweet + link | — | — |
| Visualization | synthesizer | "did you know?" | static + reel | GIF tweet | — | r/InternetIsBeautiful |
| History | synthesizer | "did you know?" | timeline graphic | single tweet | digest section | r/musictheory |
| Listening list | — | — | grid graphic | — | digest section | — |
| Milestone | field_note | compilation | carousel | thread | full digest | Show HN |

## Production Workflow

1. **Identify asset**: What just shipped? What's the most interesting part?
2. **Pick primary channel**: Where does this asset have the most impact? (Usually: lessons → LinkedIn + TikTok, visualizations → TikTok + IG, milestones → HN + Reddit)
3. **Generate primary content**: Write the LinWheel note, Larry script, or thread first.
4. **Adapt for secondary channels**: Repurpose the primary into other formats.
5. **Schedule**: LinWheel auto-schedules. Larry/NoimosAI queue via their agents. Typefully manual. Newsletter batches weekly.

## Cross-Link Strategy

Every piece of content links back to hljod.peleke.me. Specific lesson URLs, not just the homepage.

```
TikTok ("build a phonk beat") → hljod.peleke.me/edm-4-atmosphere.html
LinkedIn (behind-the-scenes) → hljod.peleke.me (syllabus tab)
Instagram (history graphic) → hljod.peleke.me/history.html
Newsletter (weekly digest) → hljod.peleke.me + specific lessons
HN (Show HN) → hljod.peleke.me
```

## Content Calendar Cadence

| Day | Channel | Content |
|-----|---------|---------|
| Mon | LinkedIn | Behind-the-scenes or field_note |
| Tue | TikTok + IG | "Build X in 30s" or "Did you know?" |
| Wed | X thread | Lesson insight thread |
| Thu | TikTok + IG | Different asset from same lesson |
| Fri | LinkedIn | Contrarian or demystification |
| Sat | — | Produce next week's content |
| Sun | Newsletter | Weekly digest (Buttondown) |

## Anti-patterns

- Don't post the same text across platforms. Each platform has its own voice.
- Don't promote without value. The lesson IS the value. The post teaches something; the link goes deeper.
- Don't use AI-generated screenshots. Screen-record the ACTUAL editor playing.
- Don't oversaturate. One lesson can fuel a week of content across channels. Don't rush.
