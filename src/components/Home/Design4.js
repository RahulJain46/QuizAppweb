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
    background: "linear-gradient(180deg, #FFF7E8 0%, #F9EFE0 100%)",
  },
  appBar: {
    background: "transparent",
    color: "#6B2F22",
    boxShadow: "none",
  },
  toolbar: {
    width: "min(1100px, calc(100% - 32px))",
    margin: "0 auto",
    justifyContent: "space-between",
  },
  brand: {
    fontSize: 26,
    fontWeight: 900,
    color: "#6B2F22",
    textDecoration: "none",
  },
  lang: {
    border: "1px solid #D8AF72",
    color: "#6B2F22",
    borderRadius: 999,
    padding: "7px 18px",
  },
  shell: {
    width: "min(1050px, calc(100% - 32px))",
    margin: "18px auto 0",
  },
  temple: {
    position: "relative",
    overflow: "hidden",
    padding: theme.spacing(5, 3),
    marginBottom: theme.spacing(4),
    textAlign: "center",
    borderRadius: 28,
    background: "linear-gradient(135deg, #FFFFFF 0%, #FFF4DD 100%)",
    border: "1px solid #E4C99C",
    boxShadow: "0 20px 50px rgba(111, 67, 31, 0.12)",
    "&:before": {
      content: '""',
      position: "absolute",
      left: "50%",
      top: -90,
      width: 260,
      height: 180,
      transform: "translateX(-50%)",
      border: "24px solid rgba(183, 121, 31, 0.12)",
      borderBottom: 0,
      borderRadius: "140px 140px 0 0",
    },
  },
  greeting: {
    color: "#A35C17",
    fontSize: 19,
    fontWeight: 800,
  },
  title: {
    color: "#682B21",
    fontSize: "clamp(42px, 7vw, 74px)",
    fontWeight: 900,
    lineHeight: 1.05,
  },
  tile: {
    width: "100%",
    borderRadius: 22,
  },
  card: {
    minHeight: 170,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    borderRadius: 22,
    background: "#FFFFFF",
    border: "1px solid #E7D3B1",
    boxShadow: "0 10px 26px rgba(100, 55, 25, 0.08)",
  },
  icon: {
    width: 62,
    height: 62,
    display: "grid",
    placeItems: "center",
    marginBottom: theme.spacing(2),
    color: "#A35C17",
    background: "#FFF1D8",
    borderRadius: "50%",
    "& svg": { fontSize: 34 },
  },
  cardTitle: {
    color: "#392D26",
    fontSize: 22,
    fontWeight: 850,
  },
  date: {
    marginTop: 5,
    color: "#A35C17",
    fontWeight: 800,
  },
}));

function today() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, "0");
  return {
    display: `${day}-${d.toLocaleString("en", { month: "short" }).toUpperCase()}`,
    route: `${day}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`,
  };
}

export default function Design4() {
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
          <Link className={classes.brand} to="/design4">{t("जिनदर्शन", "Jindarshan")}</Link>
          <Button className={classes.lang} onClick={toggleLanguage}>{lang === "hi" ? "EN" : "हिन्दी"}</Button>
        </Toolbar>
      </AppBar>
      <main className={classes.shell}>
        <Paper className={classes.temple} elevation={0}>
          <Typography className={classes.greeting}>{t("जय जिनेन्द्र", "Jai Jinendra")}</Typography>
          <Typography className={classes.title}>{t("धर्म ज्ञान", "Dharma Knowledge")}</Typography>
        </Paper>
        <Grid container spacing={3}>
          {items.map(([label, to, icon, sub]) => (
            <Grid item xs={12} sm={6} md={4} key={to}>
              <ButtonBase component={Link} to={to} className={classes.tile}>
                <Paper className={classes.card} elevation={0}>
                  <span className={classes.icon}>{icon}</span>
                  <Typography className={classes.cardTitle}>{label}</Typography>
                  {sub && <Typography className={classes.date}>{sub}</Typography>}
                </Paper>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
}
