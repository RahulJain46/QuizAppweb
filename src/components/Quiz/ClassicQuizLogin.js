import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import ClassicLayout from "../common/ClassicLayout";
import { useLanguage } from "../../contexts/LanguageContext";
import { clearProfile, loadProfile } from "../../data/userProfile";
import { links } from "../../Config";

const useStyles = makeStyles((theme) => ({
  page: {
    width: "min(560px, calc(100% - 32px))",
    margin: "0 auto",
    paddingTop: 170,
    paddingBottom: 80,
  },
  card: {
    padding: theme.spacing(4),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 16,
    textAlign: "center",
  },
  title: {
    color: "#572020",
    fontSize: 30,
    fontWeight: 900,
  },
  date: {
    marginTop: theme.spacing(1),
    color: "#A66B17",
    fontSize: 18,
    fontWeight: 700,
  },
  welcome: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: "#F5EBDD",
    border: "1px solid #E5D2B5",
    borderRadius: 12,
  },
  welcomeName: {
    color: "#572020",
    fontSize: 22,
    fontWeight: 800,
  },
  welcomeHint: {
    marginTop: 4,
    color: "#6B5A46",
    fontSize: 16,
  },
  field: {
    marginTop: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: 12,
      backgroundColor: "#FDFBF7",
      fontSize: 22,
    },
    "& input": {
      textAlign: "center",
      letterSpacing: "0.06em",
    },
    "& .MuiFormLabel-root": {
      fontSize: 18,
    },
  },
  primaryButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
    width: "100%",
    color: "#FFFFFF",
    backgroundColor: "#7A2E2E",
    borderRadius: 12,
    fontSize: 20,
    fontWeight: 800,
    "&:hover": { backgroundColor: "#672424" },
    "&.Mui-disabled": { color: "#F2E7D8", backgroundColor: "#C7B49A" },
  },
  linkButton: {
    marginTop: theme.spacing(1.5),
    color: "#7A2E2E",
    fontSize: 16,
    fontWeight: 700,
  },
  error: {
    marginTop: theme.spacing(2),
    color: "#A33A3A",
    fontSize: 17,
    fontWeight: 600,
  },
  [theme.breakpoints.down("md")]: {
    page: { paddingTop: 28, paddingBottom: 48 },
  },
  [theme.breakpoints.down("xs")]: {
    card: { padding: theme.spacing(3, 2) },
  },
}));

function ClassicQuizLogin(props) {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useLanguage();
  const date = props.match.params.date;

  const [remembered, setRemembered] = useState(null);
  const [mobile, setMobile] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const profile = loadProfile();
    if (profile) {
      setRemembered(profile);
      setMobile(profile.mobile || "");
    }
  }, []);

  const isValid = /^\d{10}$/.test(mobile.trim());

  const continueToQuiz = async (event) => {
    if (event) event.preventDefault();
    if (!isValid || busy) return;

    setBusy(true);
    setError("");
    const number = mobile.trim();

    try {
      const users = await fetch(`${links.backendURL}users?mobile=${number}`).then(
        (response) => response.json()
      );

      // The API returns either a bare object or a list of past registrations.
      const known =
        Array.isArray(users) && users.length ? users[users.length - 1] : null;

      history.push(`/v2/quiz/${date}`, known || { mobile: number });
    } catch (requestError) {
      setError(
        t(
          "अभी जुड़ नहीं पा रहे। कृपया थोड़ी देर बाद प्रयास करें।",
          "Could not connect. Please try again in a moment."
        )
      );
      setBusy(false);
    }
  };

  const forgetMe = () => {
    clearProfile();
    setRemembered(null);
    setMobile("");
  };

  return (
    <ClassicLayout>
      <main className={classes.page}>
        <Paper className={classes.card} elevation={0} component="form" onSubmit={continueToQuiz}>
          <Typography component="h1" className={classes.title}>
            {t("आज की प्रश्नोत्तरी", "Today's Quiz")}
          </Typography>
          <Typography className={classes.date}>{date}</Typography>

          {remembered && remembered.fullname && (
            <div className={classes.welcome}>
              <Typography className={classes.welcomeName}>
                {t(`जय जिनेन्द्र, ${remembered.fullname}`, `Jai Jinendra, ${remembered.fullname}`)}
              </Typography>
              <Typography className={classes.welcomeHint}>
                {t(
                  "आपका मोबाइल नंबर भर दिया गया है।",
                  "Your mobile number has been filled in."
                )}
              </Typography>
            </div>
          )}

          <TextField
            className={classes.field}
            variant="outlined"
            fullWidth
            type="tel"
            label={t("मोबाइल नंबर", "Mobile number")}
            value={mobile}
            onChange={(event) =>
              setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))
            }
            inputProps={{
              inputMode: "numeric",
              maxLength: 10,
              "aria-label": t("मोबाइल नंबर", "Mobile number"),
            }}
            helperText={
              mobile && !isValid
                ? t("कृपया 10 अंक भरें", "Please enter 10 digits")
                : " "
            }
            error={Boolean(mobile) && !isValid}
          />

          <Button
            className={classes.primaryButton}
            variant="contained"
            disableElevation
            type="submit"
            disabled={!isValid || busy}
          >
            {busy ? (
              <CircularProgress size={26} style={{ color: "#FFFFFF" }} />
            ) : (
              t("आगे बढ़ें", "Continue")
            )}
          </Button>

          {error && <Typography className={classes.error}>{error}</Typography>}

          {remembered && (
            <Button className={classes.linkButton} onClick={forgetMe}>
              {t("यह मैं नहीं हूँ — विवरण हटाएँ", "Not me — clear saved details")}
            </Button>
          )}
        </Paper>
      </main>
    </ClassicLayout>
  );
}

export default ClassicQuizLogin;
