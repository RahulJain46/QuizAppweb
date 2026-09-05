/**
 * Builds public/archive-index.json from the live questions API.
 *
 * The API only exposes whole days (`?date=`) or the full 24 MB dump, and the
 * dump repeats the same questions across dates: 44k rows hold ~5k distinct
 * questions. Deduping them here turns the archive into a ~2 MB static file the
 * Library and Chat pages can filter entirely in the browser.
 *
 * Usage: npm run build:archive
 */

const fs = require("fs");
const path = require("path");

const SOURCE_URL =
  "https://us-central1-fir-node-5a534.cloudfunctions.net/app/questions";
const OUTPUT_FILE = path.join(__dirname, "..", "public", "archive-index.json");

/** Spelling and casing variants of the same book, mapped to display labels. */
const BOOKS = [
  { match: ["jaindarshan_paribhashik_kosh", "पारिभाषिक शब्दकोष"], hi: "जैनदर्शन पारिभाषिक कोश", en: "Jaindarshan Paribhashik Kosh" },
  { match: ["jain ramayan"], hi: "जैन रामायण", en: "Jain Ramayan" },
  { match: ["bhakamar strotra"], hi: "भक्तामर स्तोत्र", en: "Bhaktamar Strotra" },
  { match: ["dhanyakumar charitra"], hi: "धन्यकुमार चरित्र", en: "Dhanyakumar Charitra" },
  { match: ["ratnkarand sharwkachar", "ratn karand sharvkachar"], hi: "रत्नकरण्ड श्रावकाचार", en: "Ratnakarand Shravakachar" },
  { match: ["mahapuran sar"], hi: "महापुराण सार", en: "Mahapuran Sar" },
  { match: ["ishtopdesh"], hi: "इष्टोपदेश", en: "Ishtopdesh" },
  { match: ["mahaveer puran"], hi: "महावीर पुराण", en: "Mahaveer Puran" },
  { match: ["pandav puran"], hi: "पाण्डव पुराण", en: "Pandav Puran" },
  { match: ["prashnawali bhag 1", "prashnotari bhag 1", "prashnottari bhag 1"], hi: "प्रश्नावली भाग 1", en: "Prashnavali Part 1" },
  { match: ["prasnottar sangrah bhag 2", "prashnottar sangrah 2", "prashnotter sangrah bhag 2"], hi: "प्रश्नोत्तर संग्रह भाग 2", en: "Prashnottar Sangrah Part 2" },
  { match: ["jin sarswati"], hi: "जिन सरस्वती", en: "Jin Saraswati" },
  { match: ["jain darshan"], hi: "जैन दर्शन", en: "Jain Darshan" },
];

const TOPICS = [
  { match: ["prathmanuyog", "prathamanuyog"], hi: "प्रथमानुयोग", en: "Prathamanuyog" },
  { match: ["dravyanuyog"], hi: "द्रव्यानुयोग", en: "Dravyanuyog" },
  { match: ["charnanuyog"], hi: "चरणानुयोग", en: "Charananuyog" },
  { match: ["karnanuyog"], hi: "करणानुयोग", en: "Karananuyog" },
  { match: ["tatvarth sutra"], hi: "तत्त्वार्थ सूत्र", en: "Tattvarth Sutra" },
  { match: ["granthkar"], hi: "ग्रंथकार", en: "Granthkar" },
  { match: ["darshan stuti"], hi: "दर्शन स्तुति", en: "Darshan Stuti" },
  { match: ["bhakamar strotra"], hi: "भक्तामर स्तोत्र", en: "Bhaktamar Strotra" },
  { match: ["ratnkarand sharwkachar"], hi: "रत्नकरण्ड श्रावकाचार", en: "Ratnakarand Shravakachar" },
  { match: ["ishtopdesh"], hi: "इष्टोपदेश", en: "Ishtopdesh" },
  { match: ["पारिभाषिक शब्दकोष"], hi: "पारिभाषिक शब्दकोश", en: "Paribhashik Shabdkosh" },
];

const clean = (value) => String(value == null ? "" : value).replace(/\s+/g, " ").trim();

function buildLookup(groups) {
  const lookup = new Map();
  groups.forEach((group, index) => {
    group.match.forEach((variant) => lookup.set(variant.toLowerCase(), index));
  });
  return lookup;
}

const BOOK_LOOKUP = buildLookup(BOOKS);
const TOPIC_LOOKUP = buildLookup(TOPICS);

/** Resolves a raw label to a canonical index, appending unknown ones as-is. */
function resolveLabel(raw, lookup, groups) {
  const text = clean(raw);
  if (!text) return undefined;
  const key = text.toLowerCase();
  if (lookup.has(key)) return lookup.get(key);
  const index = groups.length;
  groups.push({ match: [key], hi: text, en: text });
  lookup.set(key, index);
  return index;
}

function normalizeAnswer(raw) {
  const text = clean(raw).toUpperCase();
  if (text === "YES") return 1;
  if (text === "NO") return 0;
  return undefined;
}

function normalizeNumber(raw, max) {
  const text = clean(raw);
  if (!/^\d+$/.test(text)) return undefined;
  const value = Number(text);
  return value > 0 && value <= max ? value : undefined;
}

/** Dates arrive as both 05-09-2026 and 15-1-2022, and sort wrong as strings. */
function parseDate(date) {
  const match = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(clean(date));
  if (!match) return null;
  const [, day, month, year] = match;
  return {
    stamp: Number(year) * 10000 + Number(month) * 100 + Number(day),
    text: `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`,
  };
}

/** Short stable id so a card can be deep-linked without depending on order. */
function hashKey(text) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
}

async function main() {
  process.stdout.write(`Fetching ${SOURCE_URL} ...\n`);
  const started = Date.now();
  const response = await fetch(SOURCE_URL);
  if (!response.ok) throw new Error(`API responded ${response.status}`);
  const days = await response.json();
  process.stdout.write(
    `Fetched ${days.length} day records in ${((Date.now() - started) / 1000).toFixed(1)}s\n`
  );

  const books = BOOKS.slice();
  const topics = TOPICS.slice();
  const bookLookup = new Map(BOOK_LOOKUP);
  const topicLookup = new Map(TOPIC_LOOKUP);
  const merged = new Map();
  let rows = 0;
  let skipped = 0;

  for (const day of days) {
    const date = clean(day && day.date);
    const questions = (day && day.questions) || [];
    for (const raw of questions) {
      rows += 1;
      const question = clean(raw.question);
      const answer = normalizeAnswer(raw.answer);
      if (question.length < 5 || answer === undefined) {
        skipped += 1;
        continue;
      }

      const key = `${question.toLowerCase()}|${answer}`;
      let item = merged.get(key);
      if (!item) {
        item = { k: hashKey(key), q: question, a: answer, n: 0, dates: [] };
        merged.set(key, item);
      }

      item.n += 1;
      if (date && !item.dates.includes(date)) item.dates.push(date);

      // Rows for the same question vary in completeness; keep the richest value.
      const remarks = clean(raw.remarks || raw.remark);
      if (remarks && remarks.length > (item.r || "").length) item.r = remarks;

      const hint = clean(raw.hint);
      if (hint && !item.h && /^https?:\/\//.test(hint)) item.h = hint;

      if (item.b === undefined) {
        item.b = resolveLabel(raw.Book || raw.book, bookLookup, books);
      }
      if (item.t === undefined) {
        item.t = resolveLabel(raw.topic, topicLookup, topics);
      }
      if (item.s === undefined) {
        const subtopic = clean(raw.subtopic);
        if (subtopic) item.s = subtopic;
      }
      if (item.l === undefined) item.l = normalizeNumber(raw.level, 20);
      if (item.p === undefined) {
        item.p = normalizeNumber(raw.page_no || raw.Book_page_no, 5000);
      }
    }
  }

  const items = Array.from(merged.values()).map((item) => {
    // Quizzes are scheduled months ahead, so every appearance date is kept and
    // the app decides at runtime which ones have actually been published.
    const stamps = item.dates
      .map(parseDate)
      .filter(Boolean)
      .map((parsed) => parsed.stamp)
      .sort((a, b) => a - b);
    const record = {
      k: item.k,
      q: item.q,
      a: item.a,
      ds: stamps,
    };
    if (item.r) record.r = item.r;
    if (item.h) record.h = item.h;
    if (item.b !== undefined) record.b = item.b;
    if (item.t !== undefined) record.t = item.t;
    if (item.s !== undefined) record.s = item.s;
    if (item.l !== undefined) record.l = item.l;
    if (item.p !== undefined) record.p = item.p;
    return record;
  });

  const latestStamp = (item) => item.ds[item.ds.length - 1] || 0;
  items.sort((a, b) => latestStamp(b) - latestStamp(a) || a.q.localeCompare(b.q, "hi"));

  const payload = {
    generatedAt: new Date().toISOString(),
    source: SOURCE_URL,
    totalRows: rows,
    count: items.length,
    books: books.map(({ hi, en }) => ({ hi, en })),
    topics: topics.map(({ hi, en }) => ({ hi, en })),
    items,
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload));

  const sizeMb = fs.statSync(OUTPUT_FILE).size / 1048576;
  process.stdout.write(
    `Wrote ${items.length} unique questions from ${rows} rows ` +
      `(${skipped} skipped) to ${path.relative(process.cwd(), OUTPUT_FILE)} ` +
      `[${sizeMb.toFixed(2)} MB]\n`
  );
}

main().catch((error) => {
  process.stderr.write(`Failed to build archive index: ${error.stack}\n`);
  process.exit(1);
});
