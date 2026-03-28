#!/usr/bin/env node
/**
 * hljóð lesson builder
 * Reads lesson JSON from lessons/ and stamps them into the HTML template.
 * Output goes to docs/ as self-contained HTML files.
 *
 * Usage: node build.js [lesson-slug]
 *   node build.js                    # build all lessons
 *   node build.js edm-0-first-noise  # build one lesson
 */

const fs = require('fs')
const path = require('path')

const LESSONS_DIR = path.join(__dirname, 'lessons')
const DOCS_DIR = path.join(__dirname, 'docs')
const TEMPLATE_PATH = path.join(__dirname, 'template.html')
const RABBIT_HOLES_DIR = path.join(__dirname, 'rabbit-holes')

// ============================================================================
// Load template (extracted from existing lesson — CSS + chrome + scripts)
// ============================================================================

function loadTemplate() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('template.html not found. Run: node extract-template.js first.')
    process.exit(1)
  }
  return fs.readFileSync(TEMPLATE_PATH, 'utf8')
}

// ============================================================================
// Render a content block to HTML
// ============================================================================

function renderBlock(block) {
  switch (block.type) {
    case 'text':
      return block.content

    case 'strudel':
      return `
<div class="strudel-block">
    <div class="strudel-label">
        <span>${block.editorLabel || ''}</span>
        <div class="strudel-controls">
            <button class="strudel-play" onclick="strudelPlay(this)">&#x25B6; play</button>
            <button class="strudel-stop" onclick="strudelStop(this)">&#x25A0; stop</button>
            <button class="strudel-share" onclick="strudelShare(this)">&#x2197; share</button>
        </div>
    </div>
    <strudel-editor id="${block.editorId}">
<!--
${block.code}
-->
    </strudel-editor>
</div>`

    case 'concept':
      return `
<div class="concept${block.variant === 'warm' ? ' warm' : ''}">
    <span class="c-label">${block.label || 'concept'}</span>
    ${block.content}
</div>`

    case 'try-this':
      return `
<div class="try-this">
    <span class="label">${block.label || 'try this'}</span>
    ${block.content}
</div>`

    case 'exercises':
      return `
<div class="exercises">
    <span class="ex-label">${block.label || 'exercises'}</span>
    <ol>
        ${block.items.map(item => `<li>${item}</li>`).join('\n        ')}
    </ol>
</div>`

    case 'repertoire-ref':
      return `
<div class="concept warm">
    <span class="c-label">repertoire — ${block.piece}</span>
    ${block.content}
</div>`

    case 'rabbit-hole': {
      const partialPath = path.join(RABBIT_HOLES_DIR, `${block.ref}.html`)
      if (!fs.existsSync(partialPath)) {
        console.warn(`  ⚠ rabbit hole not found: ${block.ref}`)
        return `<!-- rabbit hole missing: ${block.ref} -->`
      }
      return fs.readFileSync(partialPath, 'utf8')
    }

    case 'include': {
      const inclPath = path.join(RABBIT_HOLES_DIR, `${block.ref}.html`)
      if (!fs.existsSync(inclPath)) {
        console.warn(`  ⚠ include not found: ${block.ref}`)
        return `<!-- include missing: ${block.ref} -->`
      }
      return fs.readFileSync(inclPath, 'utf8')
    }

    case 'raw-html':
      return block.content

    default:
      return `<!-- unknown block type: ${block.type} -->`
  }
}

// ============================================================================
// Render a full lesson to HTML
// ============================================================================

function renderLesson(lesson, template) {
  // Build nav links
  const navLinks = lesson.sections
    .map(s => `    <a href="#${s.id}">${s.title}</a>`)
    .join('\n')

  // Build sections
  const sectionsHtml = lesson.sections.map(section => {
    const blocksHtml = section.blocks.map(renderBlock).join('\n')
    return `
<!-- ============ ${section.title.toUpperCase()} ============ -->
<section id="${section.id}">
<h2><span class="num">${section.num || ''}</span>${section.title}</h2>
${blocksHtml}
</section>`
  }).join('\n')

  // Build hero
  const titleHtml = lesson.titleAccent
    ? lesson.title.replace(lesson.titleAccent, `<span class="accent">${lesson.titleAccent}</span>`)
    : lesson.title

  const heroHtml = `
<section id="hero">
<h1>${titleHtml}</h1>
<div class="subtitle">${lesson.track.toUpperCase()}.${lesson.order}: ${lesson.subtitle}</div>

<p>Every code block below is a live editor. Change anything, hit the play button, hear what breaks.
That&rsquo;s the whole method.</p>

<div class="concept warm">
    <span class="c-label">how to read this page</span>
    <p>Play the code first. Listen. <em>Then</em> read the text around it.
    The sound comes before the name. Always.</p>
</div>

${lesson.repertoire ? `
<div class="concept">
    <span class="c-label">repertoire for this lesson</span>
    ${lesson.repertoire.pieces.map(p => `<p><strong>${p.title}</strong> — ${p.composer} (${p.game}, ${p.year}). ${p.concept}</p>`).join('\n    ')}
    <p><em>${lesson.repertoire.why}</em></p>
</div>` : ''}

</section>`

  // Fill template
  let html = template
    .replace('{{TITLE}}', `${lesson.track.toUpperCase()}.${lesson.order}: ${lesson.title}`)
    .replace('{{NAV_LINKS}}', navLinks)
    .replace('{{HERO}}', heroHtml)
    .replace('{{SECTIONS}}', sectionsHtml)

  return html
}

// ============================================================================
// Main
// ============================================================================

function main() {
  const template = loadTemplate()
  const targetSlug = process.argv[2]

  const lessonFiles = fs.readdirSync(LESSONS_DIR)
    .filter(f => f.endsWith('.json') && f !== 'schema.json')
    .filter(f => !targetSlug || f === `${targetSlug}.json`)

  if (lessonFiles.length === 0) {
    console.log(targetSlug ? `No lesson found: ${targetSlug}` : 'No lesson files found.')
    process.exit(1)
  }

  for (const file of lessonFiles) {
    const lesson = JSON.parse(fs.readFileSync(path.join(LESSONS_DIR, file), 'utf8'))
    const html = renderLesson(lesson, template)
    const outPath = path.join(DOCS_DIR, `${lesson.slug}.html`)

    // Back up existing file
    if (fs.existsSync(outPath)) {
      const backupDir = path.join(DOCS_DIR, '.backup')
      if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir)
      fs.copyFileSync(outPath, path.join(backupDir, `${lesson.slug}.html`))
    }

    fs.writeFileSync(outPath, html)
    console.log(`✓ ${lesson.slug}.html (${(html.length / 1024).toFixed(1)}KB)`)
  }
}

main()
