import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import * as XLSX from "xlsx";
import ClassicLayout from "../common/ClassicLayout";
import { links } from "../../Config";

const EXPECTED_ROWS = 20;
const ADMIN_CODE = process.env.REACT_APP_ADMIN_CODE;

const useStyles = makeStyles((theme) => ({
  page: {
    width: "min(1100px, calc(100% - 32px))",
    margin: "0 auto",
    paddingTop: 170,
    paddingBottom: 80,
  },
  title: {
    color: "#572020",
    fontSize: "clamp(26px, 4vw, 36px)",
    fontWeight: 900,
    textAlign: "center",
  },
  card: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 16,
  },
  gate: {
    width: "min(430px, 100%)",
    margin: "0 auto",
    textAlign: "center",
  },
  field: {
    marginTop: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      backgroundColor: "#FDFBF7",
      fontSize: 20,
    },
  },
  primary: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.5, 4),
    color: "#FFFFFF",
    backgroundColor: "#7A2E2E",
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 800,
    "&:hover": { backgroundColor: "#672424" },
    "&.Mui-disabled": { color: "#F2E7D8", backgroundColor: "#C7B49A" },
  },
  secondary: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1.5),
    color: "#7A2E2E",
    borderColor: "#DCC7A8",
    borderRadius: 12,
    fontSize: 17,
    fontWeight: 700,
  },
  summaryRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginBottom: theme.spacing(2),
  },
  chip: {
    height: 32,
    color: "#5A4938",
    backgroundColor: "#F6EEE1",
    fontSize: 15,
    fontWeight: 700,
  },
  chipBad: {
    color: "#FFFFFF",
    backgroundColor: "#A33A3A",
  },
  chipGood: {
    color: "#FFFFFF",
    backgroundColor: "#3F7D52",
  },
  problems: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#FBEAEA",
    border: "1px solid #E7C4C4",
    borderRadius: 12,
  },
  problemItem: {
    color: "#8C3131",
    fontSize: 16,
    lineHeight: 1.6,
  },
  notice: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: 12,
    fontSize: 17,
    fontWeight: 600,
  },
  noticeGood: {
    color: "#2E5C3E",
    backgroundColor: "#E9F3EC",
    border: "1px solid #BFD9C8",
  },
  noticeBad: {
    color: "#8C3131",
    backgroundColor: "#FBEAEA",
    border: "1px solid #E7C4C4",
  },
  tableWrap: {
    border: "1px solid #EBE3D5",
    borderRadius: 12,
  },
  headCell: {
    color: "#5A4938",
    backgroundColor: "#F6EEE1",
    fontSize: 15,
    fontWeight: 800,
    whiteSpace: "nowrap",
  },
  cell: {
    color: "#33291F",
    fontSize: 16,
    verticalAlign: "top",
  },
  questionCell: {
    minWidth: 320,
    lineHeight: 1.55,
  },
  rowBad: {
    backgroundColor: "#FDF3F3",
  },
  answerYes: { color: "#2E5C3E", fontWeight: 800 },
  answerNo: { color: "#8C3131", fontWeight: 800 },
  hint: {
    marginTop: theme.spacing(1),
    color: "#6B5A46",
    fontSize: 15,
  },
  [theme.breakpoints.down("md")]: {
    page: { paddingTop: 24, paddingBottom: 48 },
  },
}));

const text = (value) => String(value == null ? "" : value).replace(/\s+/g, " ").trim();

/**
 * Reads the workbook the admin picked and reports anything that would make a
 * bad quiz day, so mistakes are caught before they reach the live site.
 */
function inspectWorkbook(workbook) {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const dateCell = sheet.A2;
  const date = dateCell ? text(dateCell.w || dateCell.v) : "";
  const rows = XLSX.utils.sheet_to_json(sheet, { raw: true });

  const problems = [];
  if (!date) {
    problems.push("तिथि (cell A2) नहीं मिली।");
  } else if (!/^\d{1,2}-\d{1,2}-\d{4}$/.test(date)) {
    problems.push(`तिथि का प्रारूप गलत है: "${date}" (DD-MM-YYYY होना चाहिए)।`);
  }
  if (rows.length !== EXPECTED_ROWS) {
    problems.push(`${EXPECTED_ROWS} प्रश्न होने चाहिए, इस फ़ाइल में ${rows.length} हैं।`);
  }

  const seen = new Map();
  const questions = rows.map((row, index) => {
    const number = index + 1;
    const question = text(row.question);
    const answer = text(row.answer).toUpperCase();
    const rowProblems = [];

    if (!question) rowProblems.push(`प्रश्न ${number}: प्रश्न खाली है।`);
    if (!answer) rowProblems.push(`प्रश्न ${number}: उत्तर खाली है।`);
    else if (answer !== "YES" && answer !== "NO") {
      rowProblems.push(`प्रश्न ${number}: उत्तर "${text(row.answer)}" है, YES या NO होना चाहिए।`);
    }
    if (row.__EMPTY !== undefined) {
      rowProblems.push(`प्रश्न ${number}: फ़ाइल में एक अतिरिक्त कॉलम है।`);
    }
    if (question) {
      const earlier = seen.get(question.toLowerCase());
      if (earlier) {
        rowProblems.push(`प्रश्न ${number}: प्रश्न ${earlier} जैसा ही है।`);
      } else {
        seen.set(question.toLowerCase(), number);
      }
    }

    problems.push(...rowProblems);

    // The stored shape carries no per-row date; the day is on the parent record.
    const cleaned = { ...row };
    delete cleaned.date;

    return { number, row: cleaned, question, answer, hasProblem: rowProblems.length > 0 };
  });

  return { date, questions, problems };
}

function ClassicUpload() {
  const classes = useStyles();
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [gateError, setGateError] = useState("");
  const [fileName, setFileName] = useState("");
  const [review, setReview] = useState(null);
  const [readError, setReadError] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [outcome, setOutcome] = useState(null);

  const unlock = (event) => {
    event.preventDefault();
    if (!ADMIN_CODE) {
      setGateError(
        "प्रवेश कोड सेट नहीं है। कृपया REACT_APP_ADMIN_CODE environment variable जोड़ें।"
      );
      return;
    }
    if (code.trim() === ADMIN_CODE) {
      setUnlocked(true);
      setGateError("");
    } else {
      setGateError("कोड गलत है।");
    }
  };

  const handleFile = (event) => {
    const file = event.target.files && event.target.files[0];
    setReview(null);
    setOutcome(null);
    setReadError("");
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (loaded) => {
      try {
        const workbook = XLSX.read(loaded.target.result, {
          type: "binary",
          bookVBA: true,
        });
        setReview(inspectWorkbook(workbook));
      } catch (error) {
        setReadError("यह फ़ाइल पढ़ी नहीं जा सकी। कृपया सही Excel फ़ाइल चुनें।");
      }
    };
    reader.onerror = () => setReadError("फ़ाइल पढ़ने में समस्या हुई।");
    reader.readAsBinaryString(file);
  };

  const publish = async () => {
    if (!review || publishing) return;
    setPublishing(true);
    setOutcome(null);

    try {
      const existing = await fetch(
        `${links.backendURL}questions?date=${review.date}`
      ).then((response) => response.json());

      // The API answers with an empty list when the day is still free.
      const alreadyThere = Array.isArray(existing)
        ? existing.length > 0
        : Boolean(existing && existing.date);
      if (alreadyThere) {
        setOutcome({
          ok: false,
          message: `${review.date} की प्रश्नोत्तरी पहले से मौजूद है। पहले उसे हटाएँ।`,
        });
        setPublishing(false);
        return;
      }

      const response = await fetch(`${links.backendURL}questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: review.date,
          questions: review.questions.map((entry) => entry.row),
        }),
      });
      if (!response.ok) throw new Error(`status ${response.status}`);

      setOutcome({
        ok: true,
        message: `${review.date} की प्रश्नोत्तरी सफलतापूर्वक जोड़ दी गई।`,
      });
      setReview(null);
      setFileName("");
    } catch (error) {
      setOutcome({ ok: false, message: "अपलोड नहीं हो सका। कृपया पुनः प्रयास करें।" });
    } finally {
      setPublishing(false);
    }
  };

  const canPublish = useMemo(
    () => Boolean(review && review.problems.length === 0 && review.date),
    [review]
  );

  if (!unlocked) {
    return (
      <ClassicLayout>
        <main className={classes.page}>
          <Typography component="h1" className={classes.title}>
            प्रश्नोत्तरी अपलोड
          </Typography>
          <Paper className={`${classes.card} ${classes.gate}`} elevation={0}>
            <form onSubmit={unlock}>
              <Typography style={{ color: "#5A4938", fontSize: 17 }}>
                यह पृष्ठ केवल व्यवस्थापक के लिए है।
              </Typography>
              <TextField
                className={classes.field}
                id="admin-code"
                variant="outlined"
                fullWidth
                type="password"
                label="प्रवेश कोड"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
              <Button className={classes.primary} type="submit" variant="contained" disableElevation>
                आगे बढ़ें
              </Button>
              {gateError && (
                <Typography className={`${classes.notice} ${classes.noticeBad}`}>
                  {gateError}
                </Typography>
              )}
            </form>
          </Paper>
        </main>
      </ClassicLayout>
    );
  }

  return (
    <ClassicLayout>
      <main className={classes.page}>
        <Typography component="h1" className={classes.title}>
          प्रश्नोत्तरी अपलोड
        </Typography>

        <Paper className={classes.card} elevation={0}>
          <Button
            className={classes.primary}
            style={{ marginTop: 0 }}
            variant="contained"
            disableElevation
            component="label"
            startIcon={<CloudUploadOutlinedIcon />}
          >
            Excel फ़ाइल चुनें
            <input
              type="file"
              hidden
              accept=".xlsx, .xls, .csv"
              onChange={handleFile}
            />
          </Button>
          {fileName && (
            <Typography className={classes.hint}>चुनी गई फ़ाइल: {fileName}</Typography>
          )}
          <Typography className={classes.hint}>
            तिथि cell A2 से ली जाती है। {EXPECTED_ROWS} प्रश्न, उत्तर YES या NO।
          </Typography>
          {readError && (
            <Typography className={`${classes.notice} ${classes.noticeBad}`}>
              {readError}
            </Typography>
          )}
          {outcome && (
            <Typography
              className={`${classes.notice} ${
                outcome.ok ? classes.noticeGood : classes.noticeBad
              }`}
            >
              {outcome.message}
            </Typography>
          )}
        </Paper>

        {review && (
          <Paper className={classes.card} elevation={0}>
            <div className={classes.summaryRow}>
              <Chip className={classes.chip} label={`तिथि: ${review.date || "—"}`} />
              <Chip className={classes.chip} label={`प्रश्न: ${review.questions.length}`} />
              <Chip
                className={`${classes.chip} ${
                  review.problems.length ? classes.chipBad : classes.chipGood
                }`}
                label={
                  review.problems.length
                    ? `${review.problems.length} समस्याएँ`
                    : "कोई समस्या नहीं"
                }
              />
            </div>

            {review.problems.length > 0 && (
              <div className={classes.problems}>
                {review.problems.map((problem) => (
                  <Typography key={problem} className={classes.problemItem}>
                    • {problem}
                  </Typography>
                ))}
              </div>
            )}

            <TableContainer className={classes.tableWrap}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.headCell}>#</TableCell>
                    <TableCell className={classes.headCell}>प्रश्न</TableCell>
                    <TableCell className={classes.headCell}>उत्तर</TableCell>
                    <TableCell className={classes.headCell}>स्तर</TableCell>
                    <TableCell className={classes.headCell}>ग्रंथ</TableCell>
                    <TableCell className={classes.headCell}>पृष्ठ</TableCell>
                    <TableCell className={classes.headCell}>चित्र</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {review.questions.map((entry) => (
                    <TableRow
                      key={entry.number}
                      className={entry.hasProblem ? classes.rowBad : ""}
                    >
                      <TableCell className={classes.cell}>{entry.number}</TableCell>
                      <TableCell className={`${classes.cell} ${classes.questionCell}`}>
                        {entry.question || "—"}
                      </TableCell>
                      <TableCell
                        className={`${classes.cell} ${
                          entry.answer === "YES" ? classes.answerYes : classes.answerNo
                        }`}
                      >
                        {entry.answer || "—"}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {text(entry.row.level) || "—"}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {text(entry.row.Book || entry.row.book) || "—"}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {text(entry.row.page_no) || "—"}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {text(entry.row.hint) ? "हाँ" : "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              className={classes.primary}
              variant="contained"
              disableElevation
              disabled={!canPublish || publishing}
              onClick={publish}
            >
              {publishing ? (
                <CircularProgress size={24} style={{ color: "#FFFFFF" }} />
              ) : (
                "प्रश्नोत्तरी प्रकाशित करें"
              )}
            </Button>
            <Button
              className={classes.secondary}
              variant="outlined"
              onClick={() => {
                setReview(null);
                setFileName("");
              }}
            >
              रद्द करें
            </Button>
            {!canPublish && (
              <Typography className={`${classes.notice} ${classes.noticeBad}`}>
                समस्याएँ ठीक करने के बाद ही प्रकाशित किया जा सकता है।
              </Typography>
            )}
          </Paper>
        )}
      </main>
    </ClassicLayout>
  );
}

export default ClassicUpload;
