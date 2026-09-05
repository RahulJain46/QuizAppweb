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
  page: {
    minHeight: "100vh",
    paddingBottom: 110,
    color: "#FFF7E8",
    background: "radial-gradient(circle at top, #6B2E2E 0%, #2D1A18 46%, #17100F 100%)",
  },
  appBar: { background: "rgba(23,16,15,0.55)", boxShadow: "none", backdropFilter: "blur(8px)" },
  toolbar: { width: "min(1100px, calc(100% - 32px))", margin: "0 auto", justifyContent: "space-between", minHeight: 72 },
  brand: { color: "#FFE7B6", textDecoration: "none", fontSize: 27, fontWeight: 900 },
  lang: { color: "#FFE7B6", border: "1px solid rgba(255,231,182,.45)", borderRadius: 999 },
  main: { width: "min(1040px, calc(100% - 32px))", margin: "0 auto", paddingTop: theme.spacing(5) },
  hero: { textAlign: "center", marginBottom: theme.spacing(5) },
  greeting: { color: "#E9BD6D", fontSize: 20, fontWeight: 800 },
  title: { color: "#FFFFFF", fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 900, lineHeight: 1.05 },
  grid: { alignItems: "stretch" },
  base: { width: "100%", height: "100%", borderRadius: 20 },
  card: { minHeight: 175, padding: theme.spacing(3), borderRadius: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(255, 247, 232, 0.09)", border: "1px solid rgba(255,231,182,.22)", color: "#FFFFFF", backdropFilter: "blur(10px)", textAlign: "left" },
  icon: { color: "#E9BD6D", "& svg": { fontSize: 38 } },
  label: { fontSize: 22, fontWeight: 850, lineHeight: 1.25 },
  date: { marginTop: 7, color: "#E9BD6D", fontSize: 16, fontWeight: 800 },
  footerNote: { marginTop: theme.spacing(4), color: "#FFE7B6", textAlign: "center", fontSize: 16, opacity: 0.9 },
  [theme.breakpoints.down("xs")]: { main: { paddingTop: theme.spacing(3) }, card: { minHeight: 140 } },
}));

function today() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  return { display: `${day}-${d.toLocaleString("en", { month: "short" }).toUpperCase()}`, route: `${day}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}` };
}

export default function Design6() {
  const classes = useStyles();
  const { t, lang, toggleLanguage } = useLanguage();
  const date = today();
  const items = [
    [t("आज की प्रश्नोत्तरी", "Today's Quiz"), `/quizlogin/${date.route}`, <EventAvailableOutlinedIcon />, date.display],
    [t("आज का परिणाम", "Today's Result"), `/quizresult/${date.route}`, <AssignmentTurnedInIcon />, date.display],
    [t("कौन बनेगा धर्मज्ञ", "Kaun Banega Dharmagya"), "/kbcinstruction", <EmojiEventsOutlinedIcon />],
    [t("KBD रैंकिंग", "KBD Ranking"), "/kbcallresult", <SchoolOutlinedIcon />],
    [t("पुरानी प्रश्नोत्तरी", "Old Quizzes"), "/oldquizresults", <HistoryOutlinedIcon />],
    [t("उत्तर पुस्तिकाएँ", "Answer Sheets"), "/answerSheets", <MenuBookOutlinedIcon />],
  ];
  return (
    <div className={classes.page}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link className={classes.brand} to="/design6">{t("जिनदर्शन", "Jindarshan")}</Link>
          <Button className={classes.lang} onClick={toggleLanguage}>{lang === "hi" ? "EN" : "हिन्दी"}</Button>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <section className={classes.hero}>
          <Typography className={classes.greeting}>{t("जय जिनेन्द्र", "Jai Jinendra")}</Typography>
          <Typography className={classes.title}>{t("जिनदर्शन", "Jindarshan")}</Typography>
        </section>
        <Grid container spacing={3} className={classes.grid}>
          {items.map(([label, to, icon, sub]) => (
            <Grid item xs={12} sm={6} md={4} key={to}>
              <ButtonBase component={Link} to={to} className={classes.base}>
                <Paper className={classes.card} elevation={0}>
                  <span className={classes.icon}>{icon}</span>
                  <div>
                    <Typography className={classes.label}>{label}</Typography>
                    {sub && <Typography className={classes.date}>{sub}</Typography>}
                  </div>
                </Paper>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
        <Typography className={classes.footerNote}>{t("नई प्रश्नोत्तरी प्रतिदिन 12:01 AM", "New quiz daily at 12:01 AM")}</Typography>
      </main>
    </div>
  );
}
