#!/usr/bin/env node
// Converts Obsidian QT vault notes (frontmatter: date/book/chapter/verses/tags)
// from "07. 예배/32. 영어 QT" into qt-daily's feed format (frontmatter: title/date,
// body unchanged) under content/qt/. See README.md for the monthly workflow.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs"
import { join } from "node:path"

const inboxDir = process.argv[2]
const outDir = "content/qt"

if (!inboxDir) {
  console.error("Usage: node scripts/import-vault-qt.mjs <inbox-dir>")
  process.exit(1)
}
if (!existsSync(inboxDir)) {
  console.error(`Inbox directory not found: ${inboxDir}`)
  process.exit(1)
}

const files = readdirSync(inboxDir).filter((f) => f.endsWith(".md"))
if (files.length === 0) {
  console.error(`No .md files found in ${inboxDir}`)
  process.exit(1)
}

let converted = 0
for (const file of files.sort()) {
  const raw = readFileSync(join(inboxDir, file), "utf8")
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    console.warn(`Skipping ${file}: no frontmatter found`)
    continue
  }
  const [, frontmatter, body] = match
  const fields = Object.fromEntries(
    frontmatter.split(/\r?\n/).map((line) => {
      const i = line.indexOf(":")
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()]
    }),
  )
  const { date, book, chapter, verses } = fields
  if (!date || !book || !chapter || !verses) {
    console.warn(`Skipping ${file}: missing date/book/chapter/verses in frontmatter`)
    continue
  }
  const title = `${book} ${chapter}:${verses}`
  const outPath = join(outDir, `${date}.md`)
  const outContent = `---\ntitle: ${title}\ndate: ${date}\n---\n${body}`
  writeFileSync(outPath, outContent)
  converted++
  console.log(`${date}.md <- ${file}  (${title})`)
}

console.log(`\n${converted}/${files.length} converted into ${outDir}/`)
