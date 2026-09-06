import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";
import { Link } from "react-router-dom";
import ClassicLayout from "../common/ClassicLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { loadProfile } from "../../data/userProfile";
import { userIdFor } from "./quizSubmission";
import { links } from "../../Config";

const useStyles = makeStyles((theme) => ({
  page: {
    width: "min(880px, calc(100% - 32px))",
    margin: "0 auto",
    paddingTop: 170,
    paddingBottom: 80,
  },
  header: {
    marginBottom: theme.spacing(3),
    textAlign: "center",
  },
  title: {
    color: "#572020",
    fontSize: "clamp(26px, 4vw, 38px)",
    fontWeight: 900,
  },
  date: {
    marginTop: 4,
    color: "#A66B17",
    fontSize: 18,
    fontWeight: 700,
  },
  summary: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: theme.spacing(2),
  },
  summaryChip: {
    height: 34,
    color: "#5A4938",
    backgroundColor: "#F6EEE1",
    fontSize: 16,
    fontWeight: 700,
  },
  searchField: {
    marginBottom: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      backgroundColor: "#FFFFFF",
      fontSize: 17,
    },
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(2),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 14,
  },
  rowMine: {
    borderColor: "#B7791F",
    backgroundColor: "#FFFBF2",
    boxShadow: "0 0 0 2px rgba(183, 121, 31, 0.18)",
  },
  rowTop: {
    borderColor: "#CBB48A",
    backgroundColor: "#FDF8EE",
  },
  rank: {
    flex: "0 0 auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 44,
    height: 44,
    color: "#7A2E2E",
    backgroundColor: "#F6EEE1",
    borderRadius: "50%",
    fontSize: 18,
    fontWeight: 800,
  },
  rankTop: {
    color: "#FFFFFF",
    backgroundColor: "#B7791F",
  },
  who: {
    flex: "1 1 auto",
    minWidth: 0,
  },
  name: {
    color: "#33291F",
    fontSize: 18,
    fontWeight: 700,
    overflowWrap: "anywhere",
  },
  place: {
    marginTop: 2,
    color: "#8A7A66",
    fontSize: 15,
  },
  suggestion: {
    marginTop: 6,
    color: "#6B5A46",
    fontSize: 15,
    fontStyle: "italic",
    overflowWrap: "anywhere",
  },
  score: {
    flex: "0 0 auto",
    minWidth: 62,
    color: "#FFFFFF",
    backgroundColor: "#7A2E2E",
    borderRadius: 999,
    fontSize: 17,
    fontWeight: 800,
  },
  scoreFull: {
    backgroundColor: "#3F7D52",
  },
  youBadge: {
    marginLeft: 8,
    height: 24,
    color: "#7A4B12",
    backgroundColor: "#F6E3C3",
    fontSize: 13,
    fontWeight: 800,
  },
  status: {
    padding: theme.spacing(8, 2),
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
    color: "#6B5A46",
    fontSize: 17,
    textAlign: "center",
  },
  backButton: {
    marginTop: theme.spacing(3),
    color: "#7A2E2E",
    borderColor: "#DCC7A8",
    borderRadius: 999,
    fontSize: 16,
    fontWeight: 700,
  },
  [theme.breakpoints.down("md")]: {
    page: { paddingTop: 24, paddingBottom: 48 },
  },
  [theme.breakpoints.down("xs")]: {
    page: { width: "calc(100% - 24px)" },
    row: { gap: theme.spacing(1.5), padding: theme.spacing(1.5) },
  },
}));

function ClassicQuizResult(props) {
  const classes = useStyles();
  const { t } = useLanguage();
  const date = props.match.params.date;

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const myId = useMemo(() => {
    const profile = loadProfile();
    return profile && profile.fullname && profile.mobile
      ? userIdFor(profile.fullname, profile.mobile)
      : null;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    let active = true;
    fetch(`${links.backendURL}usersresponse?allresult=true&date=${date}`)
      .then((response) => response.json())
      .then((payload) => {
        if (!active) return;
        const list = Array.isArray(payload) ? payload : [];
        // Highest score first; ties go to whoever submitted earlier.
        list.sort(
          (a, b) =>
            (b.score || 0) - (a.score || 0) ||
            moment(a.time, "DD:MM:YYYY HH:mm:ss") -
              moment(b.time, "DD:MM:YYYY HH:mm:ss")
        );
        setRows(list);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setError(
          t(
            "परिणाम लोड नहीं हो पाया। कृपया पृष्ठ पुनः लोड करें।",
            "The result could not be loaded. Please reload the page."
          )
        );
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [date, t]);

  const ranked = useMemo(
    () => rows.map((row, index) => ({ ...row, rank: index + 1 })),
    [rows]
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return ranked;
    return ranked.filter((row) =>
      `${row.fullname || ""} ${row.city || ""}`.toLowerCase().includes(needle)
    );
  }, [ranked, query]);

  const topScore = ranked.length ? ranked[0].score || 0 : 0;
  const mine = myId ? ranked.find((row) => row.userId === myId) : null;

  const renderBody = () => {
    if (loading) {
      return (
        <div className={classes.status}>
          <CircularProgress style={{ color: "#7A2E2E" }} />
          <Typography className={classes.statusText}>
            {t("परिणाम लोड हो रहा है…", "Loading the result…")}
          </Typography>
        </div>
      );
    }

    if (error) {
      return <Paper className={classes.empty} elevation={0}>{error}</Paper>;
    }

    if (!ranked.length) {
      return (
        <Paper className={classes.empty} elevation={0}>
          {t(
            "इस तिथि के लिए अभी कोई उत्तर जमा नहीं हुआ है।",
            "No answers have been submitted for this date yet."
          )}
        </Paper>
      );
    }

    if (!visible.length) {
      return (
        <Paper className={classes.empty} elevation={0}>
          {t("इस नाम से कोई प्रतिभागी नहीं मिला।", "No participant found by that name.")}
        </Paper>
      );
    }

    return visible.map((row) => {
      const isMine = Boolean(myId) && row.userId === myId;
      const isTop = (row.score || 0) === topScore && topScore > 0;
      return (
        <Paper
          key={row.userId || `${row.fullname}-${row.time}`}
          elevation={0}
          className={`${classes.row} ${isTop ? classes.rowTop : ""} ${
            isMine ? classes.rowMine : ""
          }`}
        >
          <span className={`${classes.rank} ${isTop ? classes.rankTop : ""}`}>
            {row.rank}
          </span>
          <div className={classes.who}>
            <Typography component="div" className={classes.name}>
              {row.fullname}
              {isMine && (
                <Chip
                  size="small"
                  className={classes.youBadge}
                  label={t("आप", "You")}
                />
              )}
            </Typography>
            {row.city && (
              <Typography className={classes.place}>{row.city}</Typography>
            )}
            {row.suggestion && (
              <Typography className={classes.suggestion}>
                “{row.suggestion}”
              </Typography>
            )}
          </div>
          <Chip
            className={`${classes.score} ${isTop ? classes.scoreFull : ""}`}
            label={row.score}
          />
        </Paper>
      );
    });
  };

  return (
    <ClassicLayout>
      <main className={classes.page}>
        <header className={classes.header}>
          <Typography component="h1" className={classes.title}>
            {t("आज का परिणाम", "Today's Result")}
          </Typography>
          <Typography className={classes.date}>{date}</Typography>
          {!loading && !error && ranked.length > 0 && (
            <div className={classes.summary}>
              <Chip
                className={classes.summaryChip}
                label={t(
                  `कुल प्रतिभागी: ${ranked.length}`,
                  `Participants: ${ranked.length}`
                )}
              />
              <Chip
                className={classes.summaryChip}
                label={t(`सर्वोच्च अंक: ${topScore}`, `Top score: ${topScore}`)}
              />
              {mine && (
                <Chip
                  className={classes.summaryChip}
                  label={t(
                    `आपका स्थान: ${mine.rank} — अंक ${mine.score}`,
                    `Your rank: ${mine.rank} — score ${mine.score}`
                  )}
                />
              )}
            </div>
          )}
        </header>

        {!loading && !error && ranked.length > 0 && (
          <TextField
            className={classes.searchField}
            variant="outlined"
            fullWidth
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("नाम से खोजें", "Search by name")}
            InputProps={{
              inputProps: { "aria-label": t("नाम से खोजें", "Search by name") },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#A08C6A" }} />
                </InputAdornment>
              ),
            }}
          />
        )}

        {renderBody()}

        <div style={{ textAlign: "center" }}>
          <Button
            component={Link}
            to="/v2"
            className={classes.backButton}
            variant="outlined"
          >
            {t("मुख्य पृष्ठ", "Home")}
          </Button>
        </div>
      </main>
    </ClassicLayout>
  );
}

export default ClassicQuizResult;
