import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import ClassicLayout from "../common/ClassicLayout";
import QuestionCard from "./QuestionCard";
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

const useStyles = makeStyles((theme) => ({
  page: {
    width: "min(1180px, calc(100% - 32px))",
    margin: "0 auto",
    paddingTop: 170,
    paddingBottom: 80,
  },
  hero: {
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
  title: {
    color: "#572020",
    fontSize: "clamp(30px, 4.5vw, 44px)",
    lineHeight: 1.2,
    fontWeight: 900,
  },
  subtitle: {
    marginTop: theme.spacing(1),
    color: "#6B5A46",
    fontSize: 18,
    lineHeight: 1.55,
  },
  chatLink: {
    marginTop: theme.spacing(2),
    color: "#7A2E2E",
    borderColor: "#DCC7A8",
    borderRadius: 999,
    fontSize: 16,
    fontWeight: 700,
  },
  filters: {
    padding: theme.spacing(2.5),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 16,
  },
  searchField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      backgroundColor: "#FDFBF7",
      fontSize: 18,
    },
  },
  levelRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginTop: theme.spacing(2),
  },
  rowLabel: {
    marginRight: 4,
    color: "#6B5A46",
    fontSize: 15,
    fontWeight: 700,
  },
  levelChip: {
    height: 36,
    color: "#5A4938",
    backgroundColor: "#F6EEE1",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },
  levelChipActive: {
    color: "#FFFFFF",
    backgroundColor: "#7A2E2E",
    "&:hover, &:focus": { backgroundColor: "#672424" },
  },
  selectControl: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      backgroundColor: "#FDFBF7",
      fontSize: 16,
    },
  },
  toggles: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  toggleLabel: {
    "& .MuiFormControlLabel-label": {
      color: "#5A4938",
      fontSize: 16,
      fontWeight: 600,
    },
  },
  resultBar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.spacing(1),
    margin: theme.spacing(3, 0, 2),
  },
  resultCount: {
    color: "#5A4938",
    fontSize: 18,
    fontWeight: 700,
  },
  resetButton: {
    marginLeft: "auto",
    color: "#7A2E2E",
    fontSize: 15,
    fontWeight: 700,
  },
  status: {
    padding: theme.spacing(6, 2),
    textAlign: "center",
  },
  statusText: {
    marginTop: theme.spacing(2),
    color: "#6B5A46",
    fontSize: 18,
  },
  empty: {
    padding: theme.spacing(5, 3),
    backgroundColor: "#FFFFFF",
    border: "1px dashed #E0D2BC",
    borderRadius: 16,
    textAlign: "center",
  },
  emptyTitle: {
    color: "#572020",
    fontSize: 22,
    fontWeight: 800,
  },
  emptyText: {
    marginTop: theme.spacing(1),
    color: "#6B5A46",
    fontSize: 17,
    lineHeight: 1.6,
  },
  loadMoreWrap: {
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
  loadMore: {
    padding: theme.spacing(1.25, 4),
    color: "#FFFFFF",
    backgroundColor: "#7A2E2E",
    borderRadius: 10,
    fontSize: 17,
    fontWeight: 700,
    "&:hover": { backgroundColor: "#672424" },
  },
  error: {
    color: "#A33A3A",
    fontSize: 18,
  },
  [theme.breakpoints.down("md")]: {
    page: {
      paddingTop: 24,
      paddingBottom: 48,
    },
  },
  [theme.breakpoints.down("xs")]: {
    page: { width: "calc(100% - 24px)" },
    filters: { padding: theme.spacing(2) },
  },
}));

/** Levels 4-20 exist on a handful of rows only; keep the chips to the real ones. */
const PRIMARY_LEVELS = [1, 2, 3];

function PracticeLibrary() {
  const classes = useStyles();
  const { lang, t } = useLanguage();

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

  // Typing on a 5k-item list is smooth, but debouncing keeps slow phones calm.
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
  const isFiltered =
    searchInput !== "" ||
    Object.keys(defaultFilters).some((key) => filters[key] !== defaultFilters[key]);

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
          <CircularProgress style={{ color: "#7A2E2E" }} />
          <Typography className={classes.statusText}>
            {t("प्रश्न संग्रह लोड हो रहा है…", "Loading the question archive…")}
          </Typography>
        </div>
      );
    }

    if (!results.length) {
      return (
        <Paper className={classes.empty} elevation={0}>
          <Typography className={classes.emptyTitle}>
            {t("कोई प्रश्न नहीं मिला", "No questions found")}
          </Typography>
          <Typography className={classes.emptyText}>
            {t(
              "कृपया दूसरा शब्द खोजें या कुछ फ़िल्टर हटाकर देखें।",
              "Try a different word, or remove some filters."
            )}
          </Typography>
          <Button className={classes.chatLink} variant="outlined" onClick={resetAll}>
            {t("सभी फ़िल्टर हटाएँ", "Clear all filters")}
          </Button>
        </Paper>
      );
    }

    return (
      <>
        <Grid container spacing={3}>
          {results.slice(0, visible).map((item) => (
            <Grid item xs={12} md={6} key={item.key}>
              <QuestionCard item={item} />
            </Grid>
          ))}
        </Grid>
        {visible < results.length && (
          <div className={classes.loadMoreWrap}>
            <Button
              className={classes.loadMore}
              variant="contained"
              disableElevation
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
    <ClassicLayout>
      <main className={classes.page}>
        <header className={classes.hero}>
          <Typography component="h1" className={classes.title}>
            {t("स्वाध्याय संग्रह", "Practice Library")}
          </Typography>
          <Typography className={classes.subtitle}>
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
          <Button
            component={Link}
            to="/v2/chat"
            className={classes.chatLink}
            variant="outlined"
            startIcon={<ChatBubbleOutlineIcon />}
          >
            {t("प्रश्न संग्रह से पूछें", "Ask the archive")}
          </Button>
        </header>

        <Paper className={classes.filters} elevation={0}>
          <TextField
            className={classes.searchField}
            variant="outlined"
            fullWidth
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder={t(
              "शब्द या विषय खोजें, जैसे: सुमेरु",
              "Search a word or topic, e.g. Sumeru"
            )}
            inputProps={{ "aria-label": t("प्रश्न खोजें", "Search questions") }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#A08C6A" }} />
                </InputAdornment>
              ),
              endAdornment: searchInput ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setSearchInput("")}
                    aria-label={t("खोज हटाएँ", "Clear search")}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />

          <div className={classes.levelRow}>
            <Typography component="span" className={classes.rowLabel}>
              {t("स्तर", "Level")}
            </Typography>
            <Chip
              className={`${classes.levelChip} ${
                filters.level === ANY ? classes.levelChipActive : ""
              }`}
              label={t("सभी", "All")}
              onClick={() => setFilter("level", ANY)}
            />
            {PRIMARY_LEVELS.map((level) => (
              <Chip
                key={level}
                className={`${classes.levelChip} ${
                  String(filters.level) === String(level) ? classes.levelChipActive : ""
                }`}
                label={level}
                onClick={() => setFilter("level", level)}
              />
            ))}
            <Typography component="span" className={classes.rowLabel} style={{ marginLeft: 12 }}>
              {t("उत्तर", "Answer")}
            </Typography>
            {[
              { value: ANY, text: t("सभी", "All") },
              { value: "YES", text: t("सही", "True") },
              { value: "NO", text: t("गलत", "False") },
            ].map((option) => (
              <Chip
                key={option.value}
                className={`${classes.levelChip} ${
                  filters.answer === option.value ? classes.levelChipActive : ""
                }`}
                label={option.text}
                onClick={() => setFilter("answer", option.value)}
              />
            ))}
          </div>

          <Grid container spacing={2} style={{ marginTop: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl variant="outlined" className={classes.selectControl}>
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
              <FormControl variant="outlined" className={classes.selectControl}>
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
              <FormControl variant="outlined" className={classes.selectControl}>
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
              <FormControl variant="outlined" className={classes.selectControl}>
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

          <div className={classes.toggles}>
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
      </main>
    </ClassicLayout>
  );
}

export default PracticeLibrary;
