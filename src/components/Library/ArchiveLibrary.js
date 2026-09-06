import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Link as DomLink } from "react-router-dom";
import ArchiveCard from "./ArchiveCard";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  ANY,
  defaultFilters,
  filterItems,
  loadArchive,
  sortItems,
  sortOptions,
} from "../../data/archive";

const PAGE_SIZE = 24;

/** Levels 4-20 exist on a handful of rows only; keep the buttons to the real ones. */
const PRIMARY_LEVELS = [1, 2, 3];

/**
 * The archive browser in the original site theme (teal header, gold banner,
 * blue buttons). The global AppBar and Footer come from App.js, so this
 * renders only the page body.
 */
const useStyles = makeStyles((theme) => ({
  // Mirrors the `home` block used across the original pages, but kept in flow
  // so a long, paginated list pushes the footer down instead of overlapping it.
  // The offset has to be padding, not margin: the desktop header is positioned
  // fixed without a `top`, so a collapsing margin here would drag it down too.
  library: {
    flexGrow: 1,
    position: "relative",
    width: "84%",
    margin: "0 auto",
    paddingTop: 150,
    paddingBottom: 73,
  },
  heading: {
    color: "#234f64",
    fontWeight: 700,
    textAlign: "center",
  },
  subheading: {
    marginTop: 4,
    marginBottom: theme.spacing(2),
    color: "#546e7a",
    fontSize: 17,
    textAlign: "center",
  },
  filters: {
    padding: theme.spacing(2),
  },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: theme.spacing(1.5),
  },
  rowLabel: {
    marginRight: 10,
    color: "#234f64",
    fontSize: 15,
    fontWeight: 700,
  },
  filterButton: {
    minWidth: 56,
    minHeight: 34,
    marginRight: 8,
    marginBottom: 6,
    padding: "2px 12px",
    color: "#234f64",
    backgroundColor: "#e9ecef",
    fontSize: 15,
    fontWeight: 600,
    "&:hover": { backgroundColor: "#cfd8dc" },
  },
  filterButtonActive: {
    color: "#fff",
    backgroundColor: "#1976d2",
    "&:hover": { backgroundColor: "#303f9f" },
  },
  filterToggle: {
    width: "100%",
    color: "#1976d2",
    borderColor: "#1976d2",
    fontWeight: 700,
  },
  select: {
    width: "100%",
  },
  toggleLabel: {
    "& .MuiFormControlLabel-label": {
      color: "#37474f",
      fontSize: 15,
    },
  },
  resultBar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    margin: theme.spacing(2, 0, 1),
  },
  resultCount: {
    color: "#234f64",
    fontSize: 18,
    fontWeight: 700,
  },
  resetButton: {
    marginLeft: "auto",
    color: "#1976d2",
    fontWeight: 700,
  },
  status: {
    padding: theme.spacing(6, 2),
    textAlign: "center",
  },
  statusText: {
    marginTop: theme.spacing(2),
    color: "#546e7a",
    fontSize: 17,
  },
  empty: {
    padding: theme.spacing(4, 2),
    textAlign: "center",
  },
  emptyTitle: {
    color: "#234f64",
    fontSize: 20,
    fontWeight: 700,
  },
  emptyText: {
    marginTop: 6,
    color: "#546e7a",
    fontSize: 16,
  },
  error: {
    color: "#bf1650",
    fontSize: 17,
  },
  loadMoreWrap: {
    marginTop: theme.spacing(3),
    textAlign: "center",
  },
  loadMore: {
    width: 260,
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": { backgroundColor: "#303f9f" },
  },
  backWrap: {
    marginTop: theme.spacing(3),
    textAlign: "center",
  },
  [theme.breakpoints.down("1123")]: {
    library: {
      width: "100%",
      margin: 0,
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(4),
      boxSizing: "border-box",
    },
  },
}));

function ArchiveLibrary() {
  const classes = useStyles();
  const { lang, t } = useLanguage();
  // On a phone the four selects fill the whole first screen, so they stay
  // folded away until asked for; on desktop there is room to show everything.
  const isNarrow = useMediaQuery(useTheme().breakpoints.down("1123"));
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [archive, setArchive] = useState(null);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState("recent");
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    window.scrollTo(0, 0);
    let active = true;
    loadArchive()
      .then((data) => active && setArchive(data))
      .catch((loadError) => active && setError(loadError));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () => setFilters((current) => ({ ...current, query: searchInput })),
      250
    );
    return () => clearTimeout(timer);
  }, [searchInput]);

  const results = useMemo(() => {
    if (!archive) return [];
    return sortItems(filterItems(archive.items, filters), sortBy);
  }, [archive, filters, sortBy]);

  useEffect(() => setVisible(PAGE_SIZE), [filters, sortBy]);

  const setFilter = (name, value) =>
    setFilters((current) => ({ ...current, [name]: value }));

  const resetAll = () => {
    setSearchInput("");
    setFilters(defaultFilters);
    setSortBy("recent");
  };

  const label = (entry) => (lang === "hi" ? entry.hi : entry.en);
  // `query` is driven by the always-visible search box, so it is counted for
  // "clear filters" but not for the badge on the collapsed filter button.
  const activeFilterCount = Object.keys(defaultFilters).filter(
    (key) => key !== "query" && filters[key] !== defaultFilters[key]
  ).length;
  const isFiltered = searchInput !== "" || activeFilterCount > 0;

  const filterButton = (active, text, onClick, key) => (
    <Button
      key={key}
      variant="contained"
      disableElevation
      className={`${classes.filterButton} ${active ? classes.filterButtonActive : ""}`}
      onClick={onClick}
    >
      {text}
    </Button>
  );

  const renderBody = () => {
    if (error) {
      return (
        <div className={classes.status}>
          <Typography className={classes.error}>
            {t(
              "प्रश्न संग्रह लोड नहीं हो पाया। कृपया पृष्ठ पुनः लोड करें।",
              "The question archive could not be loaded. Please reload the page."
            )}
          </Typography>
        </div>
      );
    }

    if (!archive) {
      return (
        <div className={classes.status}>
          <CircularProgress />
          <Typography className={classes.statusText}>
            {t("प्रश्न संग्रह लोड हो रहा है…", "Loading the question archive…")}
          </Typography>
        </div>
      );
    }

    if (!results.length) {
      return (
        <Paper className={classes.empty}>
          <Typography className={classes.emptyTitle}>
            {t("कोई प्रश्न नहीं मिला", "No questions found")}
          </Typography>
          <Typography className={classes.emptyText}>
            {t(
              "कृपया दूसरा शब्द खोजें या कुछ फ़िल्टर हटाकर देखें।",
              "Try a different word, or remove some filters."
            )}
          </Typography>
          <Button className={classes.resetButton} onClick={resetAll}>
            {t("सभी फ़िल्टर हटाएँ", "Clear all filters")}
          </Button>
        </Paper>
      );
    }

    return (
      <>
        <Grid container spacing={2}>
          {results.slice(0, visible).map((item) => (
            <Grid item xs={12} md={6} key={item.key}>
              <ArchiveCard item={item} />
            </Grid>
          ))}
        </Grid>
        {visible < results.length && (
          <div className={classes.loadMoreWrap}>
            <Button
              variant="contained"
              className={classes.loadMore}
              onClick={() => setVisible((count) => count + PAGE_SIZE)}
            >
              {t(
                `और प्रश्न देखें (${results.length - visible} शेष)`,
                `Show more (${results.length - visible} left)`
              )}
            </Button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={classes.library}>
      <Typography variant="h5" className={classes.heading} gutterBottom>
        {t("स्वाध्याय संग्रह", "Practice Library")}
      </Typography>
      <Typography className={classes.subheading}>
        {archive
          ? t(
              `आज तक की सभी प्रश्नोत्तरियों के ${archive.items.length} प्रश्न — खोजें, छाँटें और अभ्यास करें।`,
              `${archive.items.length} questions from every past quiz — search, filter and practise.`
            )
          : t(
              "सभी पुरानी प्रश्नोत्तरियों के प्रश्न एक ही स्थान पर।",
              "Every past quiz question in one place."
            )}
      </Typography>

      <Paper className={classes.filters}>
        <TextField
          variant="outlined"
          fullWidth
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder={t(
            "शब्द या विषय खोजें, जैसे: सुमेरु",
            "Search a word or topic, e.g. Sumeru"
          )}
          InputProps={{
            inputProps: { "aria-label": t("प्रश्न खोजें", "Search questions") },
          }}
        />

        {isNarrow && (
          <div className={classes.filterRow}>
            <Button
              variant="outlined"
              className={classes.filterToggle}
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
            >
              {filtersOpen
                ? t("फ़िल्टर छिपाएँ", "Hide filters")
                : t(
                    `फ़िल्टर${activeFilterCount ? ` (${activeFilterCount})` : ""}`,
                    `Filters${activeFilterCount ? ` (${activeFilterCount})` : ""}`
                  )}
            </Button>
          </div>
        )}

        <Collapse in={!isNarrow || filtersOpen}>
        <div className={classes.filterRow}>
          <Typography component="span" className={classes.rowLabel}>
            {t("स्तर", "Level")}
          </Typography>
          {filterButton(filters.level === ANY, t("सभी", "All"), () => setFilter("level", ANY), "lvl-all")}
          {PRIMARY_LEVELS.map((level) =>
            filterButton(
              String(filters.level) === String(level),
              level,
              () => setFilter("level", level),
              `lvl-${level}`
            )
          )}
        </div>

        <div className={classes.filterRow}>
          <Typography component="span" className={classes.rowLabel}>
            {t("उत्तर", "Answer")}
          </Typography>
          {[
            { value: ANY, text: t("सभी", "All") },
            { value: "YES", text: t("सही", "True") },
            { value: "NO", text: t("गलत", "False") },
          ].map((option) =>
            filterButton(
              filters.answer === option.value,
              option.text,
              () => setFilter("answer", option.value),
              `ans-${option.value}`
            )
          )}
        </div>

        <Grid container spacing={2} style={{ marginTop: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant="outlined" className={classes.select}>
              <InputLabel id="book-label">{t("ग्रंथ", "Book")}</InputLabel>
              <Select
                labelId="book-label"
                label={t("ग्रंथ", "Book")}
                value={filters.book}
                onChange={(event) => setFilter("book", event.target.value)}
              >
                <MenuItem value={ANY}>{t("सभी ग्रंथ", "All books")}</MenuItem>
                {archive &&
                  archive.books.map((book, index) => (
                    <MenuItem key={book.en} value={index}>
                      {label(book)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant="outlined" className={classes.select}>
              <InputLabel id="topic-label">{t("अनुयोग / विषय", "Topic")}</InputLabel>
              <Select
                labelId="topic-label"
                label={t("अनुयोग / विषय", "Topic")}
                value={filters.topic}
                onChange={(event) => setFilter("topic", event.target.value)}
              >
                <MenuItem value={ANY}>{t("सभी विषय", "All topics")}</MenuItem>
                {archive &&
                  archive.topics.map((topic, index) => (
                    <MenuItem key={topic.en} value={index}>
                      {label(topic)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant="outlined" className={classes.select}>
              <InputLabel id="year-label">{t("वर्ष", "Year")}</InputLabel>
              <Select
                labelId="year-label"
                label={t("वर्ष", "Year")}
                value={filters.year}
                onChange={(event) => setFilter("year", event.target.value)}
              >
                <MenuItem value={ANY}>{t("सभी वर्ष", "All years")}</MenuItem>
                {archive &&
                  archive.years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl variant="outlined" className={classes.select}>
              <InputLabel id="sort-label">{t("क्रम", "Sort")}</InputLabel>
              <Select
                labelId="sort-label"
                label={t("क्रम", "Sort")}
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {label(option)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <div className={classes.filterRow}>
          <FormControlLabel
            className={classes.toggleLabel}
            control={
              <Switch
                color="primary"
                checked={filters.hasRemarks}
                onChange={(event) => setFilter("hasRemarks", event.target.checked)}
              />
            }
            label={t("केवल स्पष्टीकरण वाले", "Only with explanation")}
          />
          <FormControlLabel
            className={classes.toggleLabel}
            control={
              <Switch
                color="primary"
                checked={filters.hasHint}
                onChange={(event) => setFilter("hasHint", event.target.checked)}
              />
            }
            label={t("केवल पृष्ठ चित्र वाले", "Only with page image")}
          />
        </div>
        </Collapse>
      </Paper>

      {archive && !error && (
        <div className={classes.resultBar}>
          <Typography className={classes.resultCount}>
            {t(`${results.length} प्रश्न मिले`, `${results.length} questions found`)}
          </Typography>
          {isFiltered && (
            <Button className={classes.resetButton} onClick={resetAll}>
              {t("फ़िल्टर हटाएँ", "Clear filters")}
            </Button>
          )}
        </div>
      )}

      {renderBody()}

      <div className={classes.backWrap}>
        <DomLink to="/">
          <Button variant="contained" className={classes.loadMore}>
            {t("मुख्य पृष्ठ", "Home")}
          </Button>
        </DomLink>
      </div>
    </div>
  );
}

export default ArchiveLibrary;
