import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { useLanguage } from "../../contexts/LanguageContext";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2.5),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 16,
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginBottom: theme.spacing(1.5),
  },
  metaChip: {
    height: 26,
    color: "#6B5233",
    backgroundColor: "#F6EEE1",
    fontSize: 13,
    fontWeight: 700,
  },
  levelChip: {
    color: "#7A2E2E",
    backgroundColor: "#FBEAEA",
  },
  metaText: {
    marginLeft: "auto",
    color: "#8A7A66",
    fontSize: 13,
    fontWeight: 600,
  },
  question: {
    color: "#33291F",
    fontSize: 19,
    lineHeight: 1.6,
    fontWeight: 600,
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: theme.spacing(2),
  },
  revealButton: {
    color: "#FFFFFF",
    backgroundColor: "#7A2E2E",
    borderRadius: 9,
    fontSize: 16,
    fontWeight: 700,
    "&:hover": { backgroundColor: "#672424" },
  },
  hintButton: {
    color: "#7A2E2E",
    borderColor: "#DCC7A8",
    borderRadius: 9,
    fontSize: 16,
    fontWeight: 700,
  },
  answerBox: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#FBF7EF",
    border: "1px dashed #E0D2BC",
    borderRadius: 12,
  },
  answerRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  answerLabel: {
    color: "#5A4938",
    fontSize: 16,
    fontWeight: 700,
  },
  answerYes: {
    color: "#FFFFFF",
    backgroundColor: "#3F7D52",
    fontSize: 15,
    fontWeight: 800,
  },
  answerNo: {
    color: "#FFFFFF",
    backgroundColor: "#A33A3A",
    fontSize: 15,
    fontWeight: 800,
  },
  remarksLabel: {
    marginTop: theme.spacing(1.5),
    color: "#8A7A66",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.04em",
  },
  remarks: {
    marginTop: 4,
    color: "#3E342C",
    fontSize: 17,
    lineHeight: 1.65,
  },
  imageDialogContent: {
    position: "relative",
    padding: 0,
    backgroundColor: "#2B2118",
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
    color: "#FFFFFF",
    backgroundColor: "rgba(0,0,0,0.55)",
    "&:hover": { backgroundColor: "rgba(0,0,0,0.75)" },
  },
  imageFallback: {
    padding: theme.spacing(3),
    color: "#F4E9DA",
    fontSize: 16,
    textAlign: "center",
  },
}));

function QuestionCard({ item, startRevealed = false }) {
  const classes = useStyles();
  const { lang, t } = useLanguage();
  const [revealed, setRevealed] = useState(startRevealed);
  const [imageOpen, setImageOpen] = useState(false);
  const [imageBroken, setImageBroken] = useState(false);

  const label = (entry) => (entry ? (lang === "hi" ? entry.hi : entry.en) : "");
  const isYes = item.answer === "YES";

  return (
    <Paper className={classes.card} elevation={0} component="article">
      <div className={classes.meta}>
        {item.level !== undefined && (
          <Chip
            size="small"
            className={`${classes.metaChip} ${classes.levelChip}`}
            label={t(`स्तर ${item.level}`, `Level ${item.level}`)}
          />
        )}
        {item.book && <Chip size="small" className={classes.metaChip} label={label(item.book)} />}
        {item.page !== undefined && (
          <Chip
            size="small"
            className={classes.metaChip}
            label={t(`पृष्ठ ${item.page}`, `Page ${item.page}`)}
          />
        )}
        <Typography component="span" className={classes.metaText}>
          {item.date}
        </Typography>
      </div>

      <Typography component="h3" className={classes.question}>
        {item.question}
      </Typography>

      <div className={classes.actions}>
        <Button
          className={classes.revealButton}
          variant="contained"
          disableElevation
          startIcon={<VisibilityOutlinedIcon />}
          onClick={() => setRevealed((open) => !open)}
          aria-expanded={revealed}
        >
          {revealed ? t("उत्तर छिपाएँ", "Hide answer") : t("उत्तर देखें", "Show answer")}
        </Button>
        {item.hint && (
          <Button
            className={classes.hintButton}
            variant="outlined"
            startIcon={<ImageOutlinedIcon />}
            onClick={() => setImageOpen(true)}
          >
            {t("पृष्ठ चित्र", "Page image")}
          </Button>
        )}
      </div>

      <Collapse in={revealed} unmountOnExit>
        <div className={classes.answerBox}>
          <div className={classes.answerRow}>
            <Typography component="span" className={classes.answerLabel}>
              {t("सही उत्तर", "Correct answer")}
            </Typography>
            <Chip
              size="small"
              className={isYes ? classes.answerYes : classes.answerNo}
              label={
                isYes ? t("सही (YES)", "TRUE (YES)") : t("गलत (NO)", "FALSE (NO)")
              }
            />
          </div>
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
          <DialogContent className={classes.imageDialogContent}>
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

export default QuestionCard;
