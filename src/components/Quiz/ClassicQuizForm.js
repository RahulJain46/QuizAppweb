import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import { useHistory } from "react-router-dom";
import ClassicLayout from "../common/ClassicLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { loadProfile, saveProfile } from "../../data/userProfile";
import { submitQuizResponse } from "./quizSubmission";
import { links } from "../../Config";

const FEEDBACK_OPTIONS = ["उत्कृष्ट", "बहुत अच्छी", "अच्छी", "औसत"];

const useStyles = makeStyles((theme) => ({
  page: {
    width: "min(820px, calc(100% - 32px))",
    margin: "0 auto",
    paddingTop: 170,
    paddingBottom: 120,
  },
  header: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  title: {
    color: "#572020",
    fontSize: "clamp(26px, 4vw, 36px)",
    fontWeight: 900,
  },
  date: {
    marginTop: 4,
    color: "#A66B17",
    fontSize: 18,
    fontWeight: 700,
  },
  section: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 16,
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    color: "#572020",
    fontSize: 20,
    fontWeight: 800,
  },
  field: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      backgroundColor: "#FDFBF7",
      fontSize: 18,
    },
    "& .MuiFormLabel-root": { fontSize: 17 },
  },
  savedNote: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1.5),
    color: "#5A4938",
    backgroundColor: "#F5EBDD",
    border: "1px solid #E5D2B5",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 600,
  },
  progressWrap: {
    position: "sticky",
    top: 0,
    zIndex: 2,
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 2),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 12,
  },
  progressLabel: {
    marginBottom: 6,
    color: "#5A4938",
    fontSize: 16,
    fontWeight: 700,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#F0E6D6",
    borderRadius: 999,
    "& .MuiLinearProgress-bar": { backgroundColor: "#7A2E2E" },
  },
  question: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2.5),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 16,
    scrollMarginTop: 96,
  },
  questionUnanswered: {
    borderColor: "#D98C8C",
    backgroundColor: "#FFF9F9",
  },
  questionNumber: {
    color: "#A66B17",
    fontSize: 15,
    fontWeight: 800,
    letterSpacing: "0.06em",
  },
  questionText: {
    marginTop: 6,
    color: "#33291F",
    fontSize: 19,
    lineHeight: 1.65,
    fontWeight: 600,
  },
  choices: {
    display: "flex",
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(2),
  },
  choice: {
    flex: 1,
    padding: theme.spacing(1.5),
    color: "#5A4938",
    backgroundColor: "#FBF7EF",
    border: "2px solid #E0D2BC",
    borderRadius: 12,
    fontSize: 19,
    fontWeight: 800,
  },
  choiceYes: {
    color: "#FFFFFF",
    backgroundColor: "#3F7D52",
    borderColor: "#3F7D52",
    "&:hover": { backgroundColor: "#356B46" },
  },
  choiceNo: {
    color: "#FFFFFF",
    backgroundColor: "#A33A3A",
    borderColor: "#A33A3A",
    "&:hover": { backgroundColor: "#8C3131" },
  },
  helpLink: {
    marginTop: theme.spacing(1.5),
    color: "#7A2E2E",
    borderColor: "#DCC7A8",
    borderRadius: 9,
    fontSize: 16,
    fontWeight: 700,
  },
  feedbackRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
  },
  feedbackChoice: {
    padding: theme.spacing(1, 2.5),
    color: "#5A4938",
    backgroundColor: "#FBF7EF",
    border: "2px solid #E0D2BC",
    borderRadius: 999,
    fontSize: 17,
    fontWeight: 700,
  },
  feedbackChosen: {
    color: "#FFFFFF",
    backgroundColor: "#7A2E2E",
    borderColor: "#7A2E2E",
    "&:hover": { backgroundColor: "#672424" },
  },
  submit: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.75, 4),
    width: "100%",
    color: "#FFFFFF",
    backgroundColor: "#7A2E2E",
    borderRadius: 12,
    fontSize: 21,
    fontWeight: 800,
    "&:hover": { backgroundColor: "#672424" },
    "&.Mui-disabled": { color: "#F2E7D8", backgroundColor: "#C7B49A" },
  },
  warning: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    color: "#8C3131",
    backgroundColor: "#FBEAEA",
    border: "1px solid #E7C4C4",
    borderRadius: 12,
    fontSize: 17,
    fontWeight: 600,
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
  resultDialog: {
    padding: theme.spacing(4, 3),
    textAlign: "center",
  },
  resultScore: {
    color: "#572020",
    fontSize: 48,
    fontWeight: 900,
  },
  resultLabel: {
    marginTop: theme.spacing(1),
    color: "#5A4938",
    fontSize: 19,
    fontWeight: 600,
  },
  [theme.breakpoints.down("md")]: {
    page: { paddingTop: 24, paddingBottom: 80 },
  },
  [theme.breakpoints.down("xs")]: {
    page: { width: "calc(100% - 24px)" },
    section: { padding: theme.spacing(2) },
    question: { padding: theme.spacing(2) },
  },
}));

const PROFILE_FIELDS = [
  { name: "mobile", hi: "मोबाइल नंबर", en: "Mobile number", type: "tel", max: 10 },
  { name: "fullname", hi: "पूरा नाम", en: "Full name", max: 22 },
  { name: "city", hi: "शहर / गाँव", en: "City / village", max: 22 },
  { name: "address", hi: "संक्षिप्त पता", en: "Short address" },
];

function ClassicQuizForm(props) {
  const classes = useStyles();
  const history = useHistory();
  const { lang, t } = useLanguage();
  const date = props.match.params.date;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [profile, setProfile] = useState({
    mobile: "",
    fullname: "",
    city: "",
    address: "",
  });
  const [hadSavedProfile, setHadSavedProfile] = useState(false);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showProblems, setShowProblems] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState(null);
  const questionRefs = useRef({});

  useEffect(() => {
    window.scrollTo(0, 0);

    // Details can arrive from the login lookup; otherwise use what we stored.
    const fromLogin = props.location.state || {};
    const saved = loadProfile();
    if (saved) setHadSavedProfile(true);
    setProfile({
      mobile: fromLogin.mobile || (saved && saved.mobile) || "",
      fullname: fromLogin.fullname || (saved && saved.fullname) || "",
      city: fromLogin.city || (saved && saved.city) || "",
      address: fromLogin.address || (saved && saved.address) || "",
    });
  }, [props.location.state]);

  useEffect(() => {
    let active = true;
    fetch(`${links.backendURL}questions?date=${date}`)
      .then((response) => response.json())
      .then((payload) => {
        if (!active) return;
        const list = (payload && payload.questions) || [];
        setQuestions(list);
        setLoading(false);
        if (!list.length) {
          setLoadError(
            t(
              "इस तिथि की प्रश्नोत्तरी उपलब्ध नहीं है।",
              "No quiz is available for this date."
            )
          );
        }
      })
      .catch(() => {
        if (!active) return;
        setLoading(false);
        setLoadError(
          t(
            "प्रश्न लोड नहीं हो पाए। कृपया पृष्ठ पुनः लोड करें।",
            "Questions could not be loaded. Please reload the page."
          )
        );
      });
    return () => {
      active = false;
    };
  }, [date, t]);

  const answeredCount = useMemo(
    () => questions.filter((question) => answers[question.question]).length,
    [questions, answers]
  );

  const missingProfile = PROFILE_FIELDS.filter(
    (field) => !String(profile[field.name] || "").trim()
  ).map((field) => field.name);
  const mobileValid = /^\d{10}$/.test(String(profile.mobile || "").trim());
  const firstUnanswered = questions.find((question) => !answers[question.question]);
  const ready =
    !missingProfile.length &&
    mobileValid &&
    !firstUnanswered &&
    Boolean(feedback) &&
    questions.length > 0;

  const setField = (name, value) =>
    setProfile((current) => ({ ...current, [name]: value }));

  const choose = (questionText, value) =>
    setAnswers((current) => ({ ...current, [questionText]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    if (!ready) {
      setShowProblems(true);
      const target = firstUnanswered && questionRefs.current[firstUnanswered.question];
      if (target && target.scrollIntoView) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    saveProfile(profile);

    try {
      const outcome = await submitQuizResponse({
        date,
        profile,
        questions,
        answers,
        feedback,
        suggestion,
      });
      setResult(outcome);
    } catch (error) {
      setSubmitError(
        t(
          "उत्तर सहेजे नहीं जा सके। कृपया पुनः प्रयास करें।",
          "Your answers could not be saved. Please try again."
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ClassicLayout>
        <main className={classes.page}>
          <div className={classes.status}>
            <CircularProgress style={{ color: "#7A2E2E" }} />
            <Typography className={classes.statusText}>
              {t("प्रश्न लोड हो रहे हैं…", "Loading questions…")}
            </Typography>
          </div>
        </main>
      </ClassicLayout>
    );
  }

  if (loadError) {
    return (
      <ClassicLayout>
        <main className={classes.page}>
          <Paper className={classes.section} elevation={0}>
            <Typography className={classes.warning}>{loadError}</Typography>
          </Paper>
        </main>
      </ClassicLayout>
    );
  }

  return (
    <ClassicLayout>
      <main className={classes.page}>
        <header className={classes.header}>
          <Typography component="h1" className={classes.title}>
            {t("आज की प्रश्नोत्तरी", "Today's Quiz")}
          </Typography>
          <Typography className={classes.date}>{date}</Typography>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <Paper className={classes.section} elevation={0}>
            <Typography component="h2" className={classes.sectionTitle}>
              {t("आपका विवरण", "Your details")}
            </Typography>
            {hadSavedProfile && (
              <Typography className={classes.savedNote}>
                {t(
                  "आपका विवरण पिछली बार से भर दिया गया है — आवश्यकता हो तो बदल सकते हैं।",
                  "Filled in from last time — change it if you need to."
                )}
              </Typography>
            )}
            <Grid container spacing={2}>
              {PROFILE_FIELDS.map((field) => {
                const value = profile[field.name] || "";
                const isMobile = field.name === "mobile";
                const invalid =
                  showProblems &&
                  (!String(value).trim() || (isMobile && !mobileValid));
                return (
                  <Grid item xs={12} sm={6} key={field.name}>
                    <TextField
                      className={classes.field}
                      variant="outlined"
                      fullWidth
                      type={field.type || "text"}
                      label={lang === "hi" ? field.hi : field.en}
                      value={value}
                      error={invalid}
                      helperText={
                        invalid
                          ? isMobile
                            ? t("कृपया 10 अंक भरें", "Please enter 10 digits")
                            : t("यह जानकारी आवश्यक है", "This field is required")
                          : " "
                      }
                      onChange={(event) => {
                        const next = isMobile
                          ? event.target.value.replace(/\D/g, "").slice(0, 10)
                          : event.target.value.slice(0, field.max || 120);
                        setField(field.name, next);
                      }}
                      inputProps={{
                        inputMode: isMobile ? "numeric" : undefined,
                        "aria-label": lang === "hi" ? field.hi : field.en,
                      }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Paper>

          <Paper className={classes.progressWrap} elevation={0}>
            <Typography className={classes.progressLabel}>
              {t(
                `उत्तर दिए: ${answeredCount} / ${questions.length}`,
                `Answered: ${answeredCount} / ${questions.length}`
              )}
            </Typography>
            <LinearProgress
              variant="determinate"
              className={classes.progressBar}
              value={questions.length ? (answeredCount / questions.length) * 100 : 0}
            />
          </Paper>

          {questions.map((question, index) => {
            const chosen = answers[question.question];
            const unanswered = showProblems && !chosen;
            return (
              <Paper
                key={question._id || question.question}
                elevation={0}
                className={`${classes.question} ${
                  unanswered ? classes.questionUnanswered : ""
                }`}
                ref={(node) => {
                  questionRefs.current[question.question] = node;
                }}
              >
                <Typography className={classes.questionNumber}>
                  {t(`प्रश्न ${index + 1}`, `Question ${index + 1}`)}
                </Typography>
                <Typography className={classes.questionText}>
                  {question.question}
                </Typography>

                <div className={classes.choices}>
                  <Button
                    className={`${classes.choice} ${
                      chosen === "YES" ? classes.choiceYes : ""
                    }`}
                    onClick={() => choose(question.question, "YES")}
                    startIcon={<CheckCircleOutlineIcon />}
                    aria-pressed={chosen === "YES"}
                  >
                    {t("सही", "True")}
                  </Button>
                  <Button
                    className={`${classes.choice} ${
                      chosen === "NO" ? classes.choiceNo : ""
                    }`}
                    onClick={() => choose(question.question, "NO")}
                    startIcon={<HighlightOffIcon />}
                    aria-pressed={chosen === "NO"}
                  >
                    {t("गलत", "False")}
                  </Button>
                </div>

                {question.hint && (
                  <Button
                    className={classes.helpLink}
                    variant="outlined"
                    href={question.hint}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<ImageOutlinedIcon />}
                  >
                    {t("सहायता — पृष्ठ देखें", "Help — view page")}
                  </Button>
                )}
              </Paper>
            );
          })}

          <Paper className={classes.section} elevation={0}>
            <Typography component="h2" className={classes.sectionTitle}>
              {t("आपको यह प्रश्नोत्तरी कैसी लगी?", "How was this quiz?")}
            </Typography>
            <div className={classes.feedbackRow}>
              {FEEDBACK_OPTIONS.map((option) => (
                <Button
                  key={option}
                  className={`${classes.feedbackChoice} ${
                    feedback === option ? classes.feedbackChosen : ""
                  }`}
                  onClick={() => setFeedback(option)}
                  aria-pressed={feedback === option}
                >
                  {option}
                </Button>
              ))}
            </div>
            {showProblems && !feedback && (
              <Typography className={classes.warning}>
                {t("कृपया अपनी राय चुनें।", "Please choose an option.")}
              </Typography>
            )}

            <TextField
              className={classes.field}
              style={{ marginTop: 20 }}
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              label={t("टिप / सुझाव (वैकल्पिक)", "Suggestion (optional)")}
              value={suggestion}
              onChange={(event) => setSuggestion(event.target.value)}
            />
          </Paper>

          {showProblems && !ready && (
            <Typography className={classes.warning}>
              {firstUnanswered
                ? t(
                    "कुछ प्रश्नों के उत्तर बाकी हैं। कृपया सभी प्रश्न पूरे करें।",
                    "Some questions are still unanswered. Please complete all of them."
                  )
                : t(
                    "कृपया ऊपर का विवरण पूरा करें।",
                    "Please complete the details above."
                  )}
            </Typography>
          )}

          {submitError && (
            <Typography className={classes.warning}>{submitError}</Typography>
          )}

          <Button
            className={classes.submit}
            variant="contained"
            disableElevation
            type="submit"
            disabled={submitting}
          >
            {submitting ? (
              <CircularProgress size={28} style={{ color: "#FFFFFF" }} />
            ) : (
              t("उत्तर जमा करें", "Submit answers")
            )}
          </Button>
        </form>

        <Dialog open={Boolean(result)} maxWidth="xs" fullWidth>
          <DialogContent className={classes.resultDialog}>
            {result && result.status === "duplicate" ? (
              <>
                <Typography className={classes.resultLabel}>
                  {t(
                    "आपके द्वारा आज की प्रश्नोत्तरी पहले ही जमा की जा चुकी है।",
                    "You have already submitted today's quiz."
                  )}
                </Typography>
              </>
            ) : (
              <>
                <Typography className={classes.resultScore}>
                  {result ? result.score : 0}
                </Typography>
                <Typography className={classes.resultLabel}>
                  {result
                    ? t(
                        `${questions.length} में से ${result.correct} उत्तर सही`,
                        `${result.correct} of ${questions.length} answers correct`
                      )
                    : ""}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions style={{ padding: 16, justifyContent: "center" }}>
            <Button
              className={classes.submit}
              style={{ marginTop: 0 }}
              variant="contained"
              disableElevation
              onClick={() => history.push(`/v2/result/${date}`)}
            >
              {t("सबका परिणाम देखें", "See everyone's result")}
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </ClassicLayout>
  );
}

export default ClassicQuizForm;
