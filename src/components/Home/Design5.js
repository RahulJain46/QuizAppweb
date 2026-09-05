import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import EmojiEventsOutlinedIcon from "@material-ui/icons/EmojiEventsOutlined";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";

const useStyles = makeStyles((theme) => ({
  page: { minHeight: "100vh", paddingBottom: 110, background: "#FAFAF8" },
  appBar: { background: "#FFFFFF", color: "#27342E", boxShadow: "0 1px 0 #E6E2D8" },
  toolbar: { width: "min(980px, calc(100% - 32px))", margin: "0 auto", justifyContent: "space-between", minHeight: 74 },
  brand: { color: "#27342E", textDecoration: "none", fontSize: 28, fontWeight: 900 },
  lang: { color: "#27342E", border: "1px solid #BFC9BD", borderRadius: 10, fontWeight: 800 },
  main: { width: "min(980px, calc(100% - 28px))", margin: "0 auto", paddingTop: theme.spacing(5) },
  hello: { color: "#6D7D4F", fontSize: 24, fontWeight: 800, textAlign: "center", marginBottom: theme.spacing(3) },
  primaryGrid: { marginBottom: theme.spacing(3) },
  bigAction: { width: "100%", borderRadius: 18 },
  bigCard: { minHeight: 220, padding: theme.spacing(4), borderRadius: 18, color: "#FFFFFF", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
  quizCard: { background: "#6B2E2E" },
  resultCard: { background: "#56705A" },
  bigIcon: { marginBottom: theme.spacing(2), "& svg": { fontSize: 54 } },
  bigTitle: { fontSize: 31, fontWeight: 900, lineHeight: 1.2 },
  bigDate: { marginTop: 8, fontSize: 20, fontWeight: 800, opacity: 0.9 },
  smallAction: { width: "100%", borderRadius: 16 },
  smallCard: { minHeight: 135, borderRadius: 16, padding: theme.spacing(2.5), display: "flex", alignItems: "center", background: "#FFFFFF", border: "1px solid #E6E2D8" },
  smallIcon: { width: 52, height: 52, display: "grid", placeItems: "center", marginRight: theme.spacing(2), borderRadius: 14, color: "#6B2E2E", background: "#F4ECE4", "& svg": { fontSize: 30 } },
  smallTitle: { fontSize: 21, fontWeight: 850, color: "#2E332F", textAlign: "left" },
  [theme.breakpoints.down("xs")]: { bigCard: { minHeight: 170 }, bigTitle: { fontSize: 26 }, main: { paddingTop: theme.spacing(3) } },
}));

function today() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  return { display: `${day}-${d.toLocaleString("en", { month: "short" }).toUpperCase()}`, route: `${day}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}` };
}

export default function Design5() {
  const classes = useStyles();
  const { t, lang, toggleLanguage } = useLanguage();
  const date = today();
  const secondary = [
    [t("कौन बनेगा धर्मज्ञ", "Kaun Banega Dharmagya"), "/kbcinstruction", <EmojiEventsOutlinedIcon />],
    [t("KBD रैंकिंग", "KBD Ranking"), "/kbcallresult", <SchoolOutlinedIcon />],
    [t("पुरानी प्रश्नोत्तरी", "Old Quizzes"), "/oldquizresults", <HistoryOutlinedIcon />],
    [t("उत्तर पुस्तिकाएँ", "Answer Sheets"), "/answerSheets", <MenuBookOutlinedIcon />],
  ];
  return (
    <div className={classes.page}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link className={classes.brand} to="/design5">{t("जिनदर्शन", "Jindarshan")}</Link>
          <Button className={classes.lang} onClick={toggleLanguage}>{lang === "hi" ? "EN" : "हिन्दी"}</Button>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <Typography className={classes.hello}>{t("जय जिनेन्द्र", "Jai Jinendra")}</Typography>
        <Grid container spacing={3} className={classes.primaryGrid}>
          <Grid item xs={12} sm={6}>
            <ButtonBase component={Link} to={`/quizlogin/${date.route}`} className={classes.bigAction}>
              <Paper className={`${classes.bigCard} ${classes.quizCard}`} elevation={0}>
                <span className={classes.bigIcon}><EventAvailableOutlinedIcon /></span>
                <Typography className={classes.bigTitle}>{t("आज की प्रश्नोत्तरी", "Today's Quiz")}</Typography>
                <Typography className={classes.bigDate}>{date.display}</Typography>
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ButtonBase component={Link} to={`/quizresult/${date.route}`} className={classes.bigAction}>
              <Paper className={`${classes.bigCard} ${classes.resultCard}`} elevation={0}>
                <span className={classes.bigIcon}><AssignmentTurnedInIcon /></span>
                <Typography className={classes.bigTitle}>{t("आज का परिणाम", "Today's Result")}</Typography>
                <Typography className={classes.bigDate}>{date.display}</Typography>
              </Paper>
            </ButtonBase>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {secondary.map(([label, to, icon]) => (
            <Grid item xs={12} sm={6} key={to}>
              <ButtonBase component={Link} to={to} className={classes.smallAction}>
                <Paper className={classes.smallCard} elevation={0}>
                  <span className={classes.smallIcon}>{icon}</span>
                  <Typography className={classes.smallTitle}>{label}</Typography>
                </Paper>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
}
