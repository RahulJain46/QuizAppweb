import React, { useEffect, useMemo, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import MicNoneIcon from "@material-ui/icons/MicNone";
import SendIcon from "@material-ui/icons/Send";
import StopIcon from "@material-ui/icons/Stop";
import VolumeUpOutlinedIcon from "@material-ui/icons/VolumeUpOutlined";
import { Link } from "react-router-dom";
import ClassicLayout from "../common/ClassicLayout";
import QuestionCard from "../Library/QuestionCard";
import useSpeech from "./useSpeech";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  MIN_CONFIDENT_SCORE,
  loadArchive,
  pickRandom,
  searchArchive,
} from "../../data/archive";

const useStyles = makeStyles((theme) => ({
  page: {
    width: "min(860px, calc(100% - 32px))",
    margin: "0 auto",
    paddingTop: 170,
    paddingBottom: 40,
  },
  hero: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  title: {
    color: "#572020",
    fontSize: "clamp(28px, 4.5vw, 40px)",
    lineHeight: 1.2,
    fontWeight: 900,
  },
  subtitle: {
    marginTop: theme.spacing(1),
    color: "#6B5A46",
    fontSize: 17,
    lineHeight: 1.55,
  },
  scoreBar: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: theme.spacing(1.5),
  },
  scoreChip: {
    color: "#5A4938",
    backgroundColor: "#F6EEE1",
    fontSize: 15,
    fontWeight: 700,
  },
  thread: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 16,
  },
  row: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "92%",
  },
  rowUser: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  rowBot: {
    alignSelf: "flex-start",
  },
  bubble: {
    padding: theme.spacing(1.5, 2),
    fontSize: 18,
    lineHeight: 1.6,
    borderRadius: 14,
    whiteSpace: "pre-wrap",
  },
  bubbleUser: {
    color: "#FFFFFF",
    backgroundColor: "#7A2E2E",
    borderBottomRightRadius: 4,
  },
  bubbleBot: {
    color: "#33291F",
    backgroundColor: "#F6EEE1",
    borderBottomLeftRadius: 4,
  },
  bubbleWarn: {
    color: "#5A3B22",
    backgroundColor: "#FBEFD9",
    border: "1px solid #E5D2B5",
  },
  cardSlot: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  speakButton: {
    alignSelf: "flex-start",
    marginTop: 2,
    color: "#7A2E2E",
    fontSize: 14,
    fontWeight: 700,
  },
  suggestions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: theme.spacing(1),
  },
  suggestChip: {
    height: 34,
    color: "#5A4938",
    backgroundColor: "#FFFFFF",
    border: "1px solid #DCC7A8",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  quizActions: {
    display: "flex",
    gap: theme.spacing(1.5),
    marginTop: theme.spacing(1),
  },
  quizButton: {
    flex: 1,
    padding: theme.spacing(1.25, 2),
    color: "#FFFFFF",
    borderRadius: 10,
    fontSize: 17,
    fontWeight: 800,
  },
  quizYes: {
    backgroundColor: "#3F7D52",
    "&:hover": { backgroundColor: "#356B46" },
  },
  quizNo: {
    backgroundColor: "#A33A3A",
    "&:hover": { backgroundColor: "#8C3131" },
  },
  composer: {
    position: "sticky",
    bottom: 0,
    display: "flex",
    alignItems: "flex-end",
    gap: theme.spacing(1),
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 16,
  },
  input: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      backgroundColor: "#FDFBF7",
      fontSize: 18,
    },
  },
  iconButton: {
    color: "#7A2E2E",
    backgroundColor: "#F6EEE1",
    "&:hover": { backgroundColor: "#EEE1CC" },
  },
  listening: {
    color: "#FFFFFF",
    backgroundColor: "#A33A3A",
    "&:hover": { backgroundColor: "#8C3131" },
  },
  sendButton: {
    color: "#FFFFFF",
    backgroundColor: "#7A2E2E",
    "&:hover": { backgroundColor: "#672424" },
    "&.Mui-disabled": { color: "#EFE4D4", backgroundColor: "#D8C7AF" },
  },
  quickRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: theme.spacing(1.5),
    justifyContent: "center",
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
  libraryLink: {
    color: "#7A2E2E",
    borderColor: "#DCC7A8",
    borderRadius: 999,
    fontSize: 15,
    fontWeight: 700,
  },
  [theme.breakpoints.down("md")]: {
    page: { paddingTop: 24 },
  },
  [theme.breakpoints.down("xs")]: {
    page: { width: "calc(100% - 20px)" },
    thread: { padding: theme.spacing(1.5) },
    row: { maxWidth: "100%" },
  },
}));

let messageId = 0;
const nextId = () => {
  messageId += 1;
  return messageId;
};

function ArchiveChat() {
  const classes = useStyles();
  const { lang, t } = useLanguage();
  const speech = useSpeech(lang);

  const [archive, setArchive] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [pendingQuiz, setPendingQuiz] = useState(null);
  const [score, setScore] = useState({ correct: 0, asked: 0 });
  const [mistakes, setMistakes] = useState([]);
  const threadEndRef = useRef(null);

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
    if (!archive || messages.length) return;
    setMessages([
      {
        id: nextId(),
        role: "bot",
        text: t(
          `जय जिनेन्द्र! मेरे पास ${archive.items.length} पुराने प्रश्न संग्रहीत हैं।\n` +
            "कोई शब्द या प्रश्न लिखिए — मैं संग्रह में से उत्तर और शास्त्र का सन्दर्भ दिखाऊँगा।\n" +
            "अभ्यास करना हो तो “अभ्यास शुरू करें” दबाइए।",
          `Jai Jinendra! I have ${archive.items.length} past questions stored.\n` +
            "Type a word or a question — I will answer only from the archive and show the source.\n" +
            "Tap “Start practice” to be quizzed."
        ),
      },
    ]);
  }, [archive, messages.length, t]);

  useEffect(() => {
    if (threadEndRef.current) {
      threadEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  const addMessages = (...entries) =>
    setMessages((current) => [
      ...current,
      ...entries.map((entry) => ({ id: nextId(), ...entry })),
    ]);

  const sourceLine = (item) => {
    const parts = [];
    if (item.book) parts.push(lang === "hi" ? item.book.hi : item.book.en);
    if (item.page !== undefined) parts.push(t(`पृष्ठ ${item.page}`, `page ${item.page}`));
    if (item.level !== undefined) parts.push(t(`स्तर ${item.level}`, `level ${item.level}`));
    parts.push(t(`प्रश्नोत्तरी ${item.date}`, `quiz ${item.date}`));
    return parts.join(" · ");
  };

  /** Answers strictly from stored text; refuses when nothing matches well. */
  const answerQuestion = (text) => {
    const matches = searchArchive(archive.items, text, 4);
    const best = matches[0];

    if (!best || best.score < MIN_CONFIDENT_SCORE) {
      addMessages({
        role: "bot",
        tone: "warn",
        text: t(
          "यह हमारे प्रश्न संग्रह में स्पष्ट रूप से नहीं मिला, इसलिए मैं अनुमान से उत्तर नहीं दूँगा।\n" +
            "कृपया कोई दूसरा शब्द लिखकर देखिए।",
          "I could not find this clearly in the question archive, so I will not guess.\n" +
            "Please try another word."
        ),
        suggestions: matches.slice(0, 3).map((match) => match.item),
      });
      return;
    }

    const isYes = best.item.answer === "YES";
    const verdict = isYes
      ? t("संग्रह के अनुसार यह कथन सही है।", "As per the archive, this statement is true.")
      : t("संग्रह के अनुसार यह कथन गलत है।", "As per the archive, this statement is false.");

    addMessages({
      role: "bot",
      text: `${verdict}\n${t("सन्दर्भ", "Source")}: ${sourceLine(best.item)}`,
      speakText: `${verdict} ${best.item.remarks || best.item.question}`,
      item: best.item,
      others: matches.slice(1, 4).map((match) => match.item),
    });
  };

  const askQuizQuestion = (fromMistakes = false) => {
    const pool = fromMistakes && mistakes.length ? mistakes : archive.items;
    const item = pickRandom(pool);
    setPendingQuiz(item);
    addMessages({
      role: "bot",
      text: `${t("बताइए, यह कथन सही है या गलत?", "Tell me — is this statement true or false?")}\n\n${item.question}`,
      speakText: item.question,
    });
  };

  const submitQuizAnswer = (choice) => {
    const item = pendingQuiz;
    if (!item) return;
    const isCorrect = item.answer === choice;

    setPendingQuiz(null);
    setScore((current) => ({
      correct: current.correct + (isCorrect ? 1 : 0),
      asked: current.asked + 1,
    }));
    if (!isCorrect) {
      setMistakes((current) =>
        current.some((entry) => entry.key === item.key) ? current : [...current, item]
      );
    }

    addMessages(
      {
        role: "user",
        text: choice === "YES" ? t("सही", "True") : t("गलत", "False"),
      },
      {
        role: "bot",
        tone: isCorrect ? undefined : "warn",
        text: isCorrect
          ? `${t("सही उत्तर!", "Correct!")} ${t("सन्दर्भ", "Source")}: ${sourceLine(item)}`
          : `${t("यह उत्तर ठीक नहीं है।", "That is not right.")} ${t("सन्दर्भ", "Source")}: ${sourceLine(item)}`,
        speakText: isCorrect
          ? t("सही उत्तर!", "Correct!")
          : `${t("यह उत्तर ठीक नहीं है।", "That is not right.")} ${item.remarks || ""}`,
        item,
        askNext: true,
      }
    );
  };

  const handleSend = (rawText) => {
    const text = (rawText === undefined ? draft : rawText).trim();
    if (!text || !archive) return;
    setDraft("");

    // A yes/no reply while a quiz question is open is graded, not searched.
    const normalized = text.toLowerCase();
    if (pendingQuiz) {
      if (/^(हाँ|हा|सही|yes|true|y)$/.test(normalized)) return submitQuizAnswer("YES");
      if (/^(नहीं|नही|गलत|no|false|n)$/.test(normalized)) return submitQuizAnswer("NO");
    }

    addMessages({ role: "user", text });
    answerQuestion(text);
    return undefined;
  };

  const startPractice = () => {
    if (!archive) return;
    addMessages({ role: "user", text: t("अभ्यास शुरू करें", "Start practice") });
    askQuizQuestion();
  };

  const drillMistakes = () => {
    addMessages({ role: "user", text: t("गलतियाँ दोहराएँ", "Revise my mistakes") });
    askQuizQuestion(true);
  };

  // Opening words of frequently asked entries, as ready-made things to try.
  const quickPrompts = useMemo(() => {
    if (!archive) return [];
    const prompts = new Set();
    for (const item of archive.items) {
      if (prompts.size >= 3) break;
      if (item.timesAsked > 8 && item.remarks) {
        prompts.add(item.question.split(" ").slice(0, 3).join(" "));
      }
    }
    return Array.from(prompts);
  }, [archive]);

  if (error) {
    return (
      <ClassicLayout>
        <main className={classes.page}>
          <div className={classes.status}>
            <Typography style={{ color: "#A33A3A", fontSize: 18 }}>
              {t(
                "प्रश्न संग्रह लोड नहीं हो पाया। कृपया पृष्ठ पुनः लोड करें।",
                "The question archive could not be loaded. Please reload the page."
              )}
            </Typography>
          </div>
        </main>
      </ClassicLayout>
    );
  }

  return (
    <ClassicLayout>
      <main className={classes.page}>
        <header className={classes.hero}>
          <Typography component="h1" className={classes.title}>
            {t("प्रश्न संग्रह से पूछें", "Ask the archive")}
          </Typography>
          <Typography className={classes.subtitle}>
            {t(
              "उत्तर केवल संग्रहीत प्रश्नोत्तरियों में से दिए जाते हैं — हर उत्तर के साथ ग्रंथ, पृष्ठ और तिथि का सन्दर्भ रहता है।",
              "Answers come only from stored quiz questions — every reply cites the book, page and date."
            )}
          </Typography>
          <div className={classes.scoreBar}>
            {score.asked > 0 && (
              <Chip
                className={classes.scoreChip}
                label={t(
                  `अभ्यास: ${score.correct}/${score.asked} सही`,
                  `Practice: ${score.correct}/${score.asked} correct`
                )}
              />
            )}
            <Button
              component={Link}
              to="/v2/library"
              className={classes.libraryLink}
              variant="outlined"
              startIcon={<MenuBookOutlinedIcon />}
            >
              {t("स्वाध्याय संग्रह", "Practice Library")}
            </Button>
          </div>
        </header>

        {!archive ? (
          <div className={classes.status}>
            <CircularProgress style={{ color: "#7A2E2E" }} />
            <Typography className={classes.statusText}>
              {t("प्रश्न संग्रह लोड हो रहा है…", "Loading the question archive…")}
            </Typography>
          </div>
        ) : (
          <>
            <div className={classes.thread}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${classes.row} ${
                    message.role === "user" ? classes.rowUser : classes.rowBot
                  }`}
                >
                  <Typography
                    className={`${classes.bubble} ${
                      message.role === "user"
                        ? classes.bubbleUser
                        : `${classes.bubbleBot} ${
                            message.tone === "warn" ? classes.bubbleWarn : ""
                          }`
                    }`}
                  >
                    {message.text}
                  </Typography>

                  {message.role === "bot" && speech.canSpeak && (
                    <Button
                      className={classes.speakButton}
                      size="small"
                      startIcon={<VolumeUpOutlinedIcon />}
                      onClick={() => speech.speak(message.speakText || message.text)}
                    >
                      {t("सुनें", "Listen")}
                    </Button>
                  )}

                  {message.item && (
                    <div className={classes.cardSlot}>
                      <QuestionCard item={message.item} startRevealed />
                    </div>
                  )}

                  {message.suggestions && message.suggestions.length > 0 && (
                    <>
                      <Typography className={classes.subtitle} style={{ fontSize: 15 }}>
                        {t("शायद आप यह खोज रहे हैं:", "Perhaps you meant:")}
                      </Typography>
                      <div className={classes.suggestions}>
                        {message.suggestions.map((item) => (
                          <Chip
                            key={item.key}
                            className={classes.suggestChip}
                            label={`${item.question.slice(0, 38)}…`}
                            onClick={() => handleSend(item.question)}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {message.others && message.others.length > 0 && (
                    <div className={classes.suggestions}>
                      {message.others.map((item) => (
                        <Chip
                          key={item.key}
                          className={classes.suggestChip}
                          label={`${item.question.slice(0, 34)}…`}
                          onClick={() => handleSend(item.question)}
                        />
                      ))}
                    </div>
                  )}

                  {message.askNext && (
                    <div className={classes.suggestions}>
                      <Chip
                        className={classes.suggestChip}
                        label={t("अगला प्रश्न", "Next question")}
                        onClick={() => askQuizQuestion()}
                      />
                      {mistakes.length > 0 && (
                        <Chip
                          className={classes.suggestChip}
                          label={t(
                            `गलतियाँ दोहराएँ (${mistakes.length})`,
                            `Revise mistakes (${mistakes.length})`
                          )}
                          onClick={drillMistakes}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}

              {pendingQuiz && (
                <div className={classes.quizActions}>
                  <Button
                    className={`${classes.quizButton} ${classes.quizYes}`}
                    variant="contained"
                    disableElevation
                    startIcon={<CheckCircleOutlineIcon />}
                    onClick={() => submitQuizAnswer("YES")}
                  >
                    {t("सही", "True")}
                  </Button>
                  <Button
                    className={`${classes.quizButton} ${classes.quizNo}`}
                    variant="contained"
                    disableElevation
                    startIcon={<HighlightOffIcon />}
                    onClick={() => submitQuizAnswer("NO")}
                  >
                    {t("गलत", "False")}
                  </Button>
                </div>
              )}

              <div ref={threadEndRef} />
            </div>

            {!pendingQuiz && (
              <div className={classes.quickRow}>
                <Chip
                  className={classes.suggestChip}
                  label={t("अभ्यास शुरू करें", "Start practice")}
                  onClick={startPractice}
                />
                {mistakes.length > 0 && (
                  <Chip
                    className={classes.suggestChip}
                    label={t(
                      `गलतियाँ दोहराएँ (${mistakes.length})`,
                      `Revise mistakes (${mistakes.length})`
                    )}
                    onClick={drillMistakes}
                  />
                )}
                {quickPrompts.map((prompt) => (
                  <Chip
                    key={prompt}
                    className={classes.suggestChip}
                    label={prompt}
                    onClick={() => handleSend(prompt)}
                  />
                ))}
              </div>
            )}

            <Paper className={classes.composer} elevation={0}>
              <TextField
                className={classes.input}
                variant="outlined"
                fullWidth
                multiline
                rowsMax={4}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t("अपना प्रश्न लिखिए…", "Type your question…")}
                inputProps={{ "aria-label": t("अपना प्रश्न लिखिए", "Type your question") }}
              />
              {speech.canListen && (
                <IconButton
                  className={`${classes.iconButton} ${
                    speech.listening ? classes.listening : ""
                  }`}
                  onClick={() =>
                    speech.listening
                      ? speech.stopListening()
                      : speech.listen((transcript) => handleSend(transcript))
                  }
                  aria-label={t("बोलकर पूछें", "Ask by voice")}
                >
                  {speech.listening ? <StopIcon /> : <MicNoneIcon />}
                </IconButton>
              )}
              <IconButton
                className={`${classes.iconButton} ${classes.sendButton}`}
                onClick={() => handleSend()}
                disabled={!draft.trim()}
                aria-label={t("भेजें", "Send")}
              >
                <SendIcon />
              </IconButton>
            </Paper>
          </>
        )}
      </main>
    </ClassicLayout>
  );
}

export default ArchiveChat;
