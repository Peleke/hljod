---
name: review-history
description: Review and integrate history, listening, and source links for a specific hljóð lesson. Ensures history sections have real hyperlinked sources, listening lists have genre tags and tracks from history-mentioned artists, and the D3 timeline includes all referenced people/events.
---

# Review & Integrate History

Reviews a specific hljóð lesson and ensures its history, listening, and timeline integration are complete and properly sourced.

## Trigger

- "review history for EDM.X"
- "review-history edm-2"
- When the user provides specific source links for a lesson

## Input

The user provides:
1. A lesson identifier (e.g., "EDM.2", "8a", "9d")
2. Optionally: specific URLs/links to integrate as sources
3. Optionally: additional tracks or artists to add

## Steps

### 1. Read the lesson file
- Find the file in `/Users/peleke/Documents/Projects/hljod/docs/edm-{slug}.html`
- Read the history section, listening section, and sources

### 2. Check history section
- Are all claims attributed to named people with dates?
- Are sources real (books, articles, documentaries with authors and years)?
- Convert plain-text source references to hyperlinked format where URLs are available
- Link format: `<a href="URL" style="color: var(--cool);" target="_blank">TEXT</a>` for inline links
- Source format: `<a href="URL" style="color: var(--text-faint);" target="_blank">TEXT</a>` for footer

### 3. Check listening section
- Does every track have a genre tag in parentheses at the start of the "why" column?
  - Format: `(genre) description`
- Is every artist mentioned in the history section represented in the listening list?
  - If not, add their most representative track
- Are there at least 3 tracks per lesson?

### 4. Check D3 timeline
- Read `/Users/peleke/Documents/Projects/hljod/docs/history.html`
- Is every person/event from this lesson's history section present in the `events` array?
- If not, add them with appropriate fields and connections

### 5. Apply user-provided links
- If the user provided specific URLs, integrate them:
  - Inline: wrap the relevant text in an `<a>` tag
  - Sources footer: add to the linked sources list
  - If it's a YouTube video of a referenced work, also add to listening if appropriate

### 6. Report
- List what was changed
- Flag anything that needs user verification (e.g., "I added X track for Y artist — is this the right one?")

## Source Link Format

**Inline (in history text):**
```html
<a href="URL" style="color: var(--cool);" target="_blank">visible text</a>
```

**In sources footer:**
```html
<a href="URL" style="color: var(--text-faint);" target="_blank">Author, "Title" (Year)</a>
```

**YouTube/media links:** Use for specific performances, documentaries, tutorials referenced in the text. These are primary sources.

## Genre Tags for Listening

Standard tags by era:
- Pre-electronic: (classical), (baroque), (medieval)
- Electronic pioneers: (electronic), (electro), (synth-pop)
- DnB lineage: (jungle), (DnB), (liquid DnB), (neurofunk), (breakbeat)
- Hip-hop lineage: (hip-hop), (instrumental hip-hop), (Memphis rap)
- Phonk: (phonk), (drift phonk)
- Dance: (house), (techno), (footwork), (garage), (rave)
- Experimental: (ambient), (IDM), (breakcore), (glitch), (noise)
- Jazz: (bebop), (modal jazz), (jazz fusion), (jazz)
- Other: (Afro-Cuban), (reggae), (world)

## Anti-patterns
- Don't add tracks you can't verify exist
- Don't fabricate source URLs — only add real links the user provides or that you can verify
- Don't rewrite the history narrative — only add links and tracks
- Keep genre tags short (1-2 words in parentheses)
