import React, { useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link as DomLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { links } from "../Config";
import { LEVEL_LABELS } from "../data/archive";

const ADMIN_FLAG = "ujq_admin";
const ADMIN_CODE = "252510";

const BOOK_OPTIONS = [
  "jaindarshan_paribhashik_kosh",
  "jain ramayan",
  "bhakamar strotra",
  "dhanyakumar charitra",
  "ratnkarand sharwkachar",
  "mahapuran sar",
  "ishtopdesh",
  "mahaveer puran",
  "pandav puran",
  "prashnawali bhag 1",
  "prasnottar sangrah bhag 2",
  "jin sarswati",
  "jain darshan",
];

const TOPIC_OPTIONS = [
  "prathmanuyog",
  "dravyanuyog",
  "charnanuyog",
  "karnanuyog",
  "tatvarth sutra",
  "granthkar",
  "darshan stuti",
];

const emptyDraft = {
  question: "",
  answer: "YES",
  remarks: "",
  hint: "",
  Book: "",
  page_no: "",
  level: 2,
  topic: "",
  subtopic: "",
};

const useStyles = makeStyles((theme) => ({
  page: {
    width: "min(1100px, 92%)",
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
    marginBottom: theme.spacing(2),
    color: "#546e7a",
    fontSize: 16,
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
  },
  codeForm: {
    maxWidth: 360,
    margin: "0 auto",
    padding: theme.spacing(3),
    textAlign: "center",
  },
  field: {
    marginTop: theme.spacing(1.5),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": { backgroundColor: "#303f9f" },
  },
  dateRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  dateField: {
    flex: 1,
    minWidth: 220,
    marginRight: theme.spacing(1),
  },
  dateButton: {
    marginTop: 0,
    marginBottom: 4,
  },
  listItem: {
    display: "block",
    width: "100%",
    marginBottom: 8,
    padding: "8px 10px",
    textAlign: "left",
    textTransform: "none",
    color: "#234f64",
    backgroundColor: "#e9ecef",
    "&:hover": { backgroundColor: "#cfd8dc" },
  },
  listItemActive: {
    color: "#fff",
    backgroundColor: "#1976d2",
    "&:hover": { backgroundColor: "#303f9f" },
  },
  warn: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1.5),
    color: "#5d4037",
    backgroundColor: "cornsilk",
  },
  error: {
    marginTop: theme.spacing(1),
    color: "#bf1650",
  },
  ok: {
    marginTop: theme.spacing(1),
    color: "#127c28",
    fontWeight: 700,
  },
  preview: {
    marginTop: theme.spacing(2),
    maxWidth: "100%",
  },
  navLink: {
    display: "inline-block",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    color: "#1976d2",
    fontWeight: 700,
  },
  [theme.breakpoints.down("1123")]: {
    page: {
      width: "100%",
      padding: theme.spacing(1),
      paddingBottom: theme.spacing(4),
      boxSizing: "border-box",
    },
  },
}));

function isPublished(dateText) {
  const match = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(String(dateText || "").trim());
  if (!match) return false;
  const stamp = Number(match[3]) * 10000 + Number(match[2]) * 100 + Number(match[1]);
  const now = new Date();
  const today = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  return stamp <= today;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function todayIso() {
  const now = new Date();
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

function isoToQuizDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || "").trim());
  if (!match) return "";
  return `${match[3]}-${match[2]}-${match[1]}`;
}

function toDraft(item) {
  if (!item) return { ...emptyDraft };
  return {
    question: item.question || "",
    answer: String(item.answer || "YES").toUpperCase() === "NO" ? "NO" : "YES",
    remarks: item.remarks || item.remark || "",
    hint: item.hint || "",
    Book: item.Book || item.book || "",
    page_no: item.page_no != null ? item.page_no : item.Book_page_no || "",
    level: item.level || 2,
    topic: item.topic || "",
    subtopic: item.subtopic || "",
  };
}

function uniqueNames(...groups) {
  const seen = new Set();
  const names = [];
  groups.forEach((group) => {
    (group || []).forEach((item) => {
      const value = String(item || "").trim();
      if (!value) return;
      const key = value.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      names.push(value);
    });
  });
  return names;
}

function SuggestField({ classes, label, value, options, onChange, onRemember }) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const pick = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <TextField
        ref={anchorRef}
        className={classes.field}
        variant="outlined"
        label={label}
        fullWidth
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => onRemember && onRemember(value)}
        helperText="Pick from the list or type a new name"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label={`Show ${label} list`}
                onClick={() => setOpen(true)}
              >
                <ArrowDropDownIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={() => setOpen(false)}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{ style: { maxHeight: 320, minWidth: 260 } }}
      >
        {options.length === 0 ? <MenuItem disabled>No names saved yet</MenuItem> : null}
        {options.map((option) => (
          <MenuItem key={option} selected={option === value} onClick={() => pick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

function QuestionEditor() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [unlocked, setUnlocked] = useState(
    typeof sessionStorage !== "undefined" && sessionStorage.getItem(ADMIN_FLAG) === "1"
  );
  const [codeError, setCodeError] = useState("");
  const [dateInput, setDateInput] = useState(todayIso);
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState(0);
  const [draft, setDraft] = useState(emptyDraft);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extraBooks, setExtraBooks] = useState([]);
  const [extraTopics, setExtraTopics] = useState([]);
  const [extraSubtopics, setExtraSubtopics] = useState([]);

  const questions = quiz && Array.isArray(quiz.questions) ? quiz.questions : [];
  const current = questions[selected];
  const published = quiz ? isPublished(quiz.date) : false;

  const quizNames = useMemo(() => {
    const books = [];
    const topics = [];
    const subtopics = [];
    questions.forEach((item) => {
      books.push(item.Book || item.book);
      topics.push(item.topic);
      subtopics.push(item.subtopic);
    });
    return { books, topics, subtopics };
  }, [questions]);

  const bookChoices = uniqueNames(BOOK_OPTIONS, quizNames.books, extraBooks, [draft.Book]);
  const topicChoices = uniqueNames(TOPIC_OPTIONS, quizNames.topics, extraTopics, [draft.topic]);
  const subtopicChoices = uniqueNames(quizNames.subtopics, extraSubtopics, [draft.subtopic]);

  const rememberName = (value, setExtras) => {
    const name = String(value || "").trim();
    if (!name) return;
    setExtras((currentExtras) => uniqueNames(currentExtras, [name]));
  };

  const onCodeSubmit = (event) => {
    if (event.code === ADMIN_CODE) {
      sessionStorage.setItem(ADMIN_FLAG, "1");
      setUnlocked(true);
      setCodeError("");
    } else {
      setCodeError("Wrong code");
    }
  };

  const setField = (name, value) => setDraft((currentDraft) => ({ ...currentDraft, [name]: value }));

  const selectQuestion = (index) => {
    setSelected(index);
    setDraft(toDraft(questions[index]));
    setStatus("");
    setError("");
  };

  const loadQuiz = async () => {
    const date = isoToQuizDate(dateInput);
    if (!date) {
      setError("Choose a quiz date");
      return;
    }
    setLoading(true);
    setError("");
    setStatus("");
    try {
      const response = await fetch(`${links.backendURL}questions?date=${encodeURIComponent(date)}`);
      const data = await response.json();
      if (!data || !data.questions || !data.questions.length) {
        setQuiz(null);
        setError("No quiz found for this date");
        return;
      }
      setQuiz(data);
      setSelected(0);
      setDraft(toDraft(data.questions[0]));
      setStatus(`${data.questions.length} questions loaded`);
    } catch (loadError) {
      setQuiz(null);
      setError("Could not load this quiz");
    } finally {
      setLoading(false);
    }
  };

  const saveQuestion = async () => {
    if (!quiz || !current) return;
    const question = String(draft.question || "").trim();
    const answer = String(draft.answer || "").toUpperCase();
    if (question.length < 5) {
      setError("Question text is too short");
      return;
    }
    if (answer !== "YES" && answer !== "NO") {
      setError("Answer must be YES or NO");
      return;
    }
    const payload = {
      questionId: current._id,
      index: selected,
      question,
      answer,
      remarks: String(draft.remarks || "").trim(),
      hint: String(draft.hint || "").trim(),
      Book: String(draft.Book || "").trim(),
      page_no: draft.page_no === "" ? "" : Number(draft.page_no),
      level: Number(draft.level) || 2,
      topic: String(draft.topic || "").trim(),
      subtopic: String(draft.subtopic || "").trim(),
    };
    setSaving(true);
    setError("");
    setStatus("");
    try {
      const response = await fetch(
        `${links.backendURL}questions?date=${encodeURIComponent(quiz.date)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        // A 404 here means the backend still has no PATCH route, not a missing quiz.
        if (response.status === 404) {
          throw new Error("Save failed: the backend update route is not deployed yet.");
        }
        throw new Error(data.message || `Save failed (${response.status})`);
      }
      const nextQuestions = questions.slice();
      nextQuestions[selected] = data.question || { ...current, ...payload };
      setQuiz({ ...quiz, questions: nextQuestions });
      setDraft(toDraft(nextQuestions[selected]));
      rememberName(payload.Book, setExtraBooks);
      rememberName(payload.topic, setExtraTopics);
      rememberName(payload.subtopic, setExtraSubtopics);
      setStatus("Saved to database");
    } catch (saveError) {
      setError(saveError.message || "Save failed. Deploy the backend PATCH first.");
    } finally {
      setSaving(false);
    }
  };

  if (!unlocked) {
    return (
      <div className={classes.page}>
        <Typography variant="h5" className={classes.heading} gutterBottom>
          Edit questions
        </Typography>
        <Paper className={classes.codeForm}>
          <form onSubmit={handleSubmit(onCodeSubmit)}>
            <label htmlFor="admin-code">Code</label>
            <input
              id="admin-code"
              name="code"
              type="tel"
              ref={register({ required: true })}
              className={classes.field}
            />
            <div>
              <Button variant="contained" className={classes.button} type="submit">
                Submit
              </Button>
            </div>
            {codeError ? <Typography className={classes.error}>{codeError}</Typography> : null}
          </form>
        </Paper>
      </div>
    );
  }

  return (
    <div className={classes.page}>
      <Typography variant="h5" className={classes.heading} gutterBottom>
        Edit questions
      </Typography>
      <Typography className={classes.subheading}>
        Choose a quiz date, open one of its questions, change any field, then save that question.
      </Typography>

      <Paper className={classes.paper}>
        <div className={classes.dateRow}>
          <TextField
            className={classes.dateField}
            variant="outlined"
            label="Quiz date"
            type="date"
            value={dateInput}
            onChange={(event) => setDateInput(event.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            className={`${classes.button} ${classes.dateButton}`}
            onClick={loadQuiz}
            disabled={loading}
          >
            {loading ? "Loading…" : "Load quiz"}
          </Button>
        </div>
        {error ? <Typography className={classes.error}>{error}</Typography> : null}
        {status ? <Typography className={classes.ok}>{status}</Typography> : null}
        {published ? (
          <Typography className={classes.warn}>
            This quiz date is already live. Changing the question or answer will not recalculate scores already submitted.
          </Typography>
        ) : null}
      </Paper>

      {quiz ? (
        <Grid container spacing={2} style={{ marginTop: 8 }}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography style={{ fontWeight: 700, color: "#234f64", marginBottom: 8 }}>
                {quiz.date} · {questions.length} questions
              </Typography>
              {questions.map((item, index) => (
                <Button
                  key={item._id || index}
                  className={`${classes.listItem} ${index === selected ? classes.listItemActive : ""}`}
                  onClick={() => selectQuestion(index)}
                >
                  {index + 1}. {(item.question || "").slice(0, 70)}
                  {(item.question || "").length > 70 ? "…" : ""}
                </Button>
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Typography style={{ fontWeight: 700, color: "#234f64", marginBottom: 8 }}>
                Question {selected + 1}
              </Typography>
              <TextField
                className={classes.field}
                variant="outlined"
                label="Question"
                fullWidth
                multiline
                rows={4}
                value={draft.question}
                onChange={(event) => setField("question", event.target.value)}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.field}
                    select
                    variant="outlined"
                    label="Answer"
                    fullWidth
                    value={draft.answer}
                    onChange={(event) => setField("answer", event.target.value)}
                  >
                    <MenuItem value="YES">YES</MenuItem>
                    <MenuItem value="NO">NO</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.field}
                    select
                    variant="outlined"
                    label="Difficulty"
                    fullWidth
                    value={Number(draft.level) || 2}
                    onChange={(event) => setField("level", Number(event.target.value))}
                  >
                    {[1, 2, 3].map((level) => (
                      <MenuItem key={level} value={level}>
                        {LEVEL_LABELS[level].en} / {LEVEL_LABELS[level].hi}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <SuggestField
                    classes={classes}
                    label="Book"
                    value={draft.Book}
                    options={bookChoices}
                    onChange={(value) => setField("Book", value)}
                    onRemember={(value) => rememberName(value, setExtraBooks)}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    className={classes.field}
                    variant="outlined"
                    label="Page no"
                    type="number"
                    fullWidth
                    value={draft.page_no}
                    onChange={(event) => setField("page_no", event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SuggestField
                    classes={classes}
                    label="Topic"
                    value={draft.topic}
                    options={topicChoices}
                    onChange={(value) => setField("topic", value)}
                    onRemember={(value) => rememberName(value, setExtraTopics)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SuggestField
                    classes={classes}
                    label="Subtopic"
                    value={draft.subtopic}
                    options={subtopicChoices}
                    onChange={(value) => setField("subtopic", value)}
                    onRemember={(value) => rememberName(value, setExtraSubtopics)}
                  />
                </Grid>
              </Grid>
              <TextField
                className={classes.field}
                variant="outlined"
                label="Hint (image URL)"
                fullWidth
                value={draft.hint}
                onChange={(event) => setField("hint", event.target.value)}
              />
              {draft.hint ? (
                <img className={classes.preview} src={draft.hint} alt="Hint preview" />
              ) : null}
              <TextField
                className={classes.field}
                variant="outlined"
                label="Remarks"
                fullWidth
                multiline
                rows={4}
                value={draft.remarks}
                onChange={(event) => setField("remarks", event.target.value)}
              />
              <Button
                variant="contained"
                className={classes.button}
                onClick={saveQuestion}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save this question"}
              </Button>
              {error ? <Typography className={classes.error}>{error}</Typography> : null}
              {status ? <Typography className={classes.ok}>{status}</Typography> : null}
            </Paper>
          </Grid>
        </Grid>
      ) : null}

      <DomLink className={classes.navLink} to="/fileupload">
        Upload Excel
      </DomLink>
      <DomLink className={classes.navLink} to="/">
        Home
      </DomLink>
    </div>
  );
}

export default QuestionEditor;
