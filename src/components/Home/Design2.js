import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper, ButtonBase, AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import EmojiEventsOutlinedIcon from "@material-ui/icons/EmojiEventsOutlined";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#F7FAFC",
    paddingBottom: 100,
    fontFamily: '"Segoe UI", sans-serif',
  },
  appBar: {
    backgroundColor: "#1A365D",
    boxShadow: "none",
  },
  toolbar: {
    justifyContent: "space-between",
    width: "min(1200px, 100%)",
    margin: "0 auto",
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: 800,
    textDecoration: "none",
  },
  langBtn: {
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: 8,
  },
  hero: {
    backgroundColor: "#1A365D",
    color: "#FFFFFF",
    padding: theme.spacing(6, 2, 10, 2),
    textAlign: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 800,
    marginBottom: theme.spacing(1),
  },
  heroSub: {
    color: "#A0AEC0",
    fontSize: "1.1rem",
  },
  gridContainer: {
    width: "min(1000px, calc(100% - 32px))",
    margin: "0 auto",
    marginTop: -50,
  },
  cardBase: {
    width: "100%",
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },
  cardContent: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(3),
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    textAlign: "left",
  },
  iconBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#EDF2F7",
    color: "#2B6CB0",
    marginRight: theme.spacing(2.5),
    "& svg": {
      fontSize: 32,
    },
  },
  iconOrange: {
    backgroundColor: "#FFFAF0",
    color: "#DD6B20",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: "#2D3748",
  },
  cardDate: {
    display: "block",
    fontSize: "0.9rem",
    color: "#718096",
    marginTop: 4,
  },
}));

export default function Design2() {
  const classes = useStyles();
  const { t, lang, toggleLanguage } = useLanguage();
  
  const date = new Date();
  const displayDate = `${date.getDate()}-${date.toLocaleString("en", { month: "short" }).toUpperCase()}`;
  const routeDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

  const actions = [
    {
      title: t("आज की प्रश्नोत्तरी", "Today's Quiz"),
      sub: displayDate,
      to: `/quizlogin/${routeDate}`,
      icon: <EventAvailableOutlinedIcon />,
      iconClass: classes.iconOrange,
    },
    {
      title: t("आज का परिणाम", "Today's Result"),
      sub: displayDate,
      to: `/quizresult/${routeDate}`,
      icon: <AssignmentTurnedInIcon />,
      iconClass: classes.iconOrange,
    },
    {
      title: t("कौन बनेगा धर्मज्ञ", "Kaun Banega Dharmagya"),
      to: "/kbcinstruction",
      icon: <EmojiEventsOutlinedIcon />,
    },
    {
      title: t("KBD रैंकिंग", "KBD Ranking"),
      to: "/kbcallresult",
      icon: <SchoolOutlinedIcon />,
    },
    {
      title: t("पुरानी प्रश्नोत्तरी", "Old Quizzes"),
      to: "/oldquizresults",
      icon: <HistoryOutlinedIcon />,
    },
    {
      title: t("उत्तर पुस्तिकाएँ", "Answer Sheets"),
      to: "/answerSheets",
      icon: <MenuBookOutlinedIcon />,
    },
  ];

  return (
    <div className={classes.wrapper}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to="/design2" className={classes.brand}>
            {t("जिनदर्शन", "Jindarshan")}
          </Link>
          <Button onClick={toggleLanguage} className={classes.langBtn}>
            {lang === 'hi' ? 'EN' : 'हिन्दी'}
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.hero}>
        <Typography className={classes.heroTitle}>{t("जय जिनेन्द्र", "Jai Jinendra")}</Typography>
        <Typography className={classes.heroSub}>
          {t("स्वाध्याय के माध्यम से अपने ज्ञान को निरंतर बढ़ाएँ", "Enhance your knowledge through continuous study")}
        </Typography>
      </div>

      <div className={classes.gridContainer}>
        <Grid container spacing={3}>
          {actions.map((act, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <ButtonBase component={Link} to={act.to} className={classes.cardBase}>
                <Paper className={classes.cardContent} elevation={0}>
                  <div className={`${classes.iconBox} ${act.iconClass || ""}`}>
                    {act.icon}
                  </div>
                  <div>
                    <Typography className={classes.cardTitle}>{act.title}</Typography>
                    {act.sub && <Typography className={classes.cardDate}>{act.sub}</Typography>}
                  </div>
                </Paper>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
