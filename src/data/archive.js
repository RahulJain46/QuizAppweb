/**
 * Loads and queries the pre-built question archive (public/archive-index.json,
 * produced by scripts/build-archive-index.js).
 *
 * The whole corpus is ~5k unique questions, so filtering, sorting and retrieval
 * all run in memory. Nothing here calls the API.
 */

// Root-relative on purpose: package.json sets an absolute `homepage`, so
// PUBLIC_URL would point the fetch at another origin on preview deployments.
const INDEX_URL = "/archive-index.json";

export const ANY = "all";

/** Daily-quiz levels 1–3. Other numbers (4–20) exist on a handful of rows. */
export const LEVEL_LABELS = {
  1: { hi: "सरल", en: "Easy" },
  2: { hi: "मध्यम", en: "Medium" },
  3: { hi: "कठिन", en: "Tough" },
};

/** Hindi/English difficulty name, or "स्तर N" when the mapping does not apply. */
export function levelLabel(level, lang = "hi") {
  const named = LEVEL_LABELS[Number(level)];
  if (named) return lang === "en" ? named.en : named.hi;
  if (level === undefined || level === null || level === "") return "";
  return lang === "en" ? `Level ${level}` : `स्तर ${level}`;
}

let archivePromise = null;

/** Today as a YYYYMMDD number, matching the stamps in the index. */
function todayStamp() {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

function formatStamp(stamp) {
  const day = String(stamp % 100).padStart(2, "0");
  const month = String(Math.floor(stamp / 100) % 100).padStart(2, "0");
  return `${day}-${month}-${Math.floor(stamp / 10000)}`;
}

/**
 * Expands the compact index records into objects the UI can read directly.
 *
 * Quizzes are uploaded months in advance, so anything dated after today is
 * unreleased: those appearances are dropped, and a question that has never
 * been published yet is left out entirely rather than spoiling a future quiz.
 */
function hydrate(payload) {
  const books = payload.books || [];
  const topics = payload.topics || [];
  const today = todayStamp();

  const items = [];
  for (const item of payload.items || []) {
    const published = (item.ds || []).filter((stamp) => stamp <= today);
    if (!published.length) continue;
    const latest = published[published.length - 1];

    items.push({
      key: item.k,
      question: item.q,
      answer: item.a === 1 ? "YES" : "NO",
      remarks: item.r || "",
      hint: item.h || "",
      level: item.l,
      page: item.p,
      subtopic: item.s || "",
      bookIndex: item.b,
      topicIndex: item.t,
      book: item.b === undefined ? null : books[item.b],
      topic: item.t === undefined ? null : topics[item.t],
      date: formatStamp(latest),
      firstDate: formatStamp(published[0]),
      dateStamp: latest,
      timesAsked: published.length,
      // Every year the question was asked, so the year filter means "appeared
      // in this year" rather than "was last asked in this year".
      years: Array.from(new Set(published.map((stamp) => Math.floor(stamp / 10000)))),
      haystack: `${item.q} ${item.r || ""}`.toLowerCase(),
    });
  }

  const levels = Array.from(
    new Set(items.map((item) => item.level).filter((level) => level !== undefined))
  ).sort((a, b) => a - b);

  const years = new Set();
  items.forEach((item) => item.years.forEach((year) => years.add(year)));

  return {
    generatedAt: payload.generatedAt,
    items,
    books,
    topics,
    levels,
    years: Array.from(years)
      .filter(Boolean)
      .sort((a, b) => b - a),
  };
}

/** Fetches the index once per page load; the browser caches it after that. */
export function loadArchive() {
  if (!archivePromise) {
    archivePromise = fetch(INDEX_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`Archive request failed (${response.status})`);
        return response.json();
      })
      .then(hydrate)
      .catch((error) => {
        archivePromise = null;
        throw error;
      });
  }
  return archivePromise;
}

/** Devanagari danda and punctuation would otherwise break token matching. */
export function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[।?!,.;:"'`()[\]{}\-–—/\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(text) {
  return normalizeText(text)
    .split(" ")
    .filter((token) => token.length > 1);
}

export const defaultFilters = {
  query: "",
  level: ANY,
  book: ANY,
  topic: ANY,
  answer: ANY,
  hasRemarks: false,
  hasHint: false,
  year: ANY,
};

export function filterItems(items, filters) {
  const query = normalizeText(filters.query);
  const tokens = query ? query.split(" ").filter(Boolean) : [];

  return items.filter((item) => {
    if (filters.level !== ANY && item.level !== Number(filters.level)) return false;
    if (filters.book !== ANY && item.bookIndex !== Number(filters.book)) return false;
    if (filters.topic !== ANY && item.topicIndex !== Number(filters.topic)) return false;
    if (filters.answer !== ANY && item.answer !== filters.answer) return false;
    if (filters.hasRemarks && !item.remarks) return false;
    if (filters.hasHint && !item.hint) return false;
    if (filters.year !== ANY && !item.years.includes(Number(filters.year))) return false;
    if (tokens.length && !tokens.every((token) => item.haystack.includes(token))) {
      return false;
    }
    return true;
  });
}

export const sortOptions = [
  { value: "recent", hi: "नवीनतम पहले", en: "Newest first" },
  { value: "oldest", hi: "पुराने पहले", en: "Oldest first" },
  { value: "book", hi: "ग्रंथ व पृष्ठ क्रम", en: "Book & page order" },
  { value: "level", hi: "कठिनाई अनुसार", en: "By difficulty" },
  { value: "asked", hi: "सर्वाधिक पूछे गए", en: "Most asked" },
];

const byQuestion = (a, b) => a.question.localeCompare(b.question, "hi");
const last = Number.MAX_SAFE_INTEGER;

export function sortItems(items, sortBy) {
  const sorted = items.slice();
  switch (sortBy) {
    case "oldest":
      sorted.sort((a, b) => a.dateStamp - b.dateStamp || byQuestion(a, b));
      break;
    case "book":
      sorted.sort(
        (a, b) =>
          (a.bookIndex === undefined ? last : a.bookIndex) -
            (b.bookIndex === undefined ? last : b.bookIndex) ||
          (a.page === undefined ? last : a.page) - (b.page === undefined ? last : b.page) ||
          byQuestion(a, b)
      );
      break;
    case "level":
      sorted.sort(
        (a, b) =>
          (a.level === undefined ? last : a.level) - (b.level === undefined ? last : b.level) ||
          b.dateStamp - a.dateStamp
      );
      break;
    case "asked":
      sorted.sort((a, b) => b.timesAsked - a.timesAsked || b.dateStamp - a.dateStamp);
      break;
    default:
      sorted.sort((a, b) => b.dateStamp - a.dateStamp || byQuestion(a, b));
  }
  return sorted;
}

/**
 * Ranks archive entries against a free-text question.
 *
 * Chat answers must come from stored text only, so this returns a score the
 * caller can threshold on: a weak best match means "not in the archive" rather
 * than an invented answer.
 */
export function searchArchive(items, query, limit = 5) {
  const phrase = normalizeText(query);
  if (!phrase) return [];
  const tokens = tokenize(query);
  if (!tokens.length) return [];

  const scored = [];
  for (const item of items) {
    const question = normalizeText(item.question);
    const remarks = normalizeText(item.remarks);
    let score = 0;

    if (question.includes(phrase)) score += 12;
    else if (remarks && remarks.includes(phrase)) score += 7;

    let matchedInQuestion = 0;
    for (const token of tokens) {
      if (question.includes(token)) {
        score += 3;
        matchedInQuestion += 1;
      } else if (remarks && remarks.includes(token)) {
        score += 1.5;
      }
    }

    if (!score) continue;
    // Reward entries that cover the whole query, not just one common word.
    score += (matchedInQuestion / tokens.length) * 4;
    if (item.remarks) score += 0.5;
    scored.push({ item, score });
  }

  scored.sort((a, b) => b.score - a.score || b.item.timesAsked - a.item.timesAsked);
  return scored.slice(0, limit);
}

/** Score below which we refuse to answer instead of guessing. */
export const MIN_CONFIDENT_SCORE = 8;

export function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}
