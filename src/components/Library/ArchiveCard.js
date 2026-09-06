import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useLanguage } from "../../contexts/LanguageContext";

/** Question card in the original site theme: white paper, blue actions. */
const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
  meta: {
    marginBottom: 8,
    color: "#607d8b",
    fontSize: 14,
    fontWeight: 600,
  },
  metaTag: {
    display: "inline-block",
    marginRight: 8,
    marginBottom: 4,
    padding: "2px 8px",
    color: "#234f64",
    backgroundColor: "#e9ecef",
    borderRadius: 3,
  },
  metaDate: {
    color: "#8a6d1f",
  },
  question: {
    color: "#212121",
    fontSize: 18,
    lineHeight: 1.6,
    fontWeight: 500,
  },
  actions: {
    marginTop: theme.spacing(1.5),
  },
  button: {
    marginRight: 8,
    marginTop: 6,
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#303f9f",
    },
  },
  imageButton: {
    marginTop: 6,
    color: "#1976d2",
    borderColor: "#1976d2",
  },
  answerBox: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(1.5),
    backgroundColor: "#e9ecef",
    borderRadius: 4,
  },
  answerLine: {
    fontSize: 17,
    fontWeight: 700,
  },
  answerYes: {
    color: "#127c28",
  },
  answerNo: {
    color: "#aa1050",
  },
  remarksLabel: {
    marginTop: 10,
    color: "#607d8b",
    fontSize: 14,
    fontWeight: 700,
  },
  remarks: {
    marginTop: 2,
    color: "#212121",
    fontSize: 17,
    lineHeight: 1.6,
  },
  dialogContent: {
    position: "relative",
    padding: 0,
    backgroundColor: "#212121",
  },
  hintImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },
  closeImage: {
    position: "absolute",
    top: 8,
    right: 8,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.55)",
    "&:hover": { backgroundColor: "rgba(0,0,0,0.75)" },
  },
  imageFallback: {
    padding: theme.spacing(3),
    color: "#eceff1",
    fontSize: 16,
    textAlign: "center",
  },
}));

function ArchiveCard({ item, startRevealed = false }) {
  const classes = useStyles();
  const { lang, t } = useLanguage();
  const [revealed, setRevealed] = useState(startRevealed);
  const [imageOpen, setImageOpen] = useState(false);
  const [imageBroken, setImageBroken] = useState(false);

  const label = (entry) => (entry ? (lang === "hi" ? entry.hi : entry.en) : "");
  const isYes = item.answer === "YES";

  return (
    <Paper className={classes.card} component="article">
      <Typography component="div" className={classes.meta}>
        {item.level !== undefined && (
          <span className={classes.metaTag}>{t(`स्तर ${item.level}`, `Level ${item.level}`)}</span>
        )}
        {item.book && <span className={classes.metaTag}>{label(item.book)}</span>}
        {item.page !== undefined && (
          <span className={classes.metaTag}>{t(`पृष्ठ ${item.page}`, `Page ${item.page}`)}</span>
        )}
        <span className={classes.metaDate}>{item.date}</span>
      </Typography>

      <Typography component="h3" className={classes.question}>
        {item.question}
      </Typography>

      <div className={classes.actions}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => setRevealed((open) => !open)}
          aria-expanded={revealed}
        >
          {revealed ? t("उत्तर छिपाएँ", "Hide answer") : t("उत्तर देखें", "Show answer")}
        </Button>
        {item.hint && (
          <Button
            variant="outlined"
            className={classes.imageButton}
            onClick={() => setImageOpen(true)}
          >
            {t("पृष्ठ चित्र", "Page image")}
          </Button>
        )}
      </div>

      <Collapse in={revealed} unmountOnExit>
        <div className={classes.answerBox}>
          <Typography
            className={`${classes.answerLine} ${isYes ? classes.answerYes : classes.answerNo}`}
          >
            {t("सही उत्तर", "Correct answer")}:{" "}
            {isYes ? t("सही (YES)", "TRUE (YES)") : t("गलत (NO)", "FALSE (NO)")}
          </Typography>
          {item.remarks ? (
            <>
              <Typography className={classes.remarksLabel}>
                {t("शुद्ध कथन / स्पष्टीकरण", "Correct statement / explanation")}
              </Typography>
              <Typography className={classes.remarks}>{item.remarks}</Typography>
            </>
          ) : (
            <Typography className={classes.remarks}>
              {isYes
                ? t("कथन शास्त्र के अनुसार सही है।", "The statement is correct as per the text.")
                : t(
                    "इस प्रश्न के लिए संग्रह में स्पष्टीकरण उपलब्ध नहीं है। कृपया पृष्ठ चित्र देखें।",
                    "No explanation is stored for this question. Please see the page image."
                  )}
            </Typography>
          )}
        </div>
      </Collapse>

      {item.hint && (
        <Dialog
          open={imageOpen}
          onClose={() => setImageOpen(false)}
          maxWidth="md"
          fullWidth
          aria-label={t("पृष्ठ चित्र", "Page image")}
        >
          <DialogContent className={classes.dialogContent}>
            <IconButton
              className={classes.closeImage}
              onClick={() => setImageOpen(false)}
              aria-label={t("बंद करें", "Close")}
            >
              <CloseIcon />
            </IconButton>
            {imageBroken ? (
              <Typography className={classes.imageFallback}>
                {t("यह चित्र अभी लोड नहीं हो पाया।", "This image could not be loaded.")}
              </Typography>
            ) : (
              <img
                src={item.hint}
                alt={t("शास्त्र का पृष्ठ", "Scripture page")}
                className={classes.hintImage}
                onError={() => setImageBroken(true)}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </Paper>
  );
}

export default ArchiveCard;
