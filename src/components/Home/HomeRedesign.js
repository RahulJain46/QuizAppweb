import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import EmojiEventsOutlinedIcon from "@material-ui/icons/EmojiEventsOutlined";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const useStyles = makeStyles((theme) => ({
  home: {
    width: "min(1040px, calc(100% - 32px))",
    margin: "0 auto",
    paddingTop: 170,
    paddingBottom: 92,
  },
  hero: {
    textAlign: "center",
    marginBottom: theme.spacing(5),
  },
  greeting: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    position: "relative",
    zIndex: 1,
    padding: theme.spacing(0.75, 2),
    color: "#7A2E2E",
    backgroundColor: "transparent",
    borderRadius: 999,
    fontSize: 20,
    fontWeight: 700,
  },
  greetingMark: {
    color: "#B7791F",
    fontSize: 18,
  },
  heroTitle: {
    marginTop: theme.spacing(0.5),
    color: "#572020",
    fontSize: "clamp(38px, 6vw, 64px)",
    lineHeight: 1.18,
    letterSpacing: "-0.02em",
    fontWeight: 900,
  },
  cardButtonBase: {
    display: "block",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(60, 35, 20, 0.08)",
    transition: "transform 180ms ease, box-shadow 180ms ease",
    "&:hover, &:focus-visible": {
      transform: "translateY(-4px)",
      boxShadow: "0 14px 32px rgba(60, 35, 20, 0.14)",
    },
  },
  actionCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: theme.spacing(4, 2),
    backgroundColor: "#FFFFFF",
    border: "1px solid #EBE3D5",
    borderRadius: 16,
    minHeight: 160,
  },
  iconWrap: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    marginBottom: theme.spacing(2.5),
    borderRadius: "50%",
    "& svg": {
      fontSize: 34,
    },
  },
  cardTitle: {
    color: "#3E342C",
    fontSize: 22,
    lineHeight: 1.35,
    fontWeight: 800,
  },
  cardDate: {
    marginTop: 4,
    color: "#A66B17",
    fontSize: 16,
    fontWeight: 700,
  },
  iconGold: {
    color: "#A66B17",
    backgroundColor: "#FDF6ED",
  },
  iconMaroon: {
    color: "#7A2E2E",
    backgroundColor: "#FDF2F2",
  },
  iconGreen: {
    color: "#587158",
    backgroundColor: "#F3F6F3",
  },
  iconBrown: {
    color: "#786548",
    backgroundColor: "#F5F2EE",
  },
  dailyNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    color: "#5A4938",
    backgroundColor: "#F5EBDD",
    border: "1px solid #E5D2B5",
    fontSize: 17,
    fontWeight: 600,
  },
  [theme.breakpoints.down("sm")]: {
    home: {
      paddingTop: 28,
    },
  },
  [theme.breakpoints.down("xs")]: {
    home: {
      width: "calc(100% - 24px)",
      paddingTop: 20,
      paddingBottom: 76,
    },
    actionCard: {
      padding: theme.spacing(3, 2),
      minHeight: 140,
    },
    dailyNote: {
      alignItems: "flex-start",
      fontSize: 15,
      textAlign: "left",
    },
  },
}));

function getCurrentDate() {
  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const monthNumber =
    date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const monthName = date
    .toLocaleString("en", { month: "short" })
    .toUpperCase();

  return {
    routeDate: `${day}-${monthNumber}-${date.getFullYear()}`,
    displayDate: `${day}-${monthName}`,
  };
}

function HomeRedesign() {
  const classes = useStyles();
  const [currentDate, setCurrentDate] = useState(getCurrentDate);
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);

    const refreshDate = () => setCurrentDate(getCurrentDate());
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);
    const midnightTimer = setTimeout(refreshDate, nextMidnight - now);

    document.addEventListener("visibilitychange", refreshDate);
    window.addEventListener("focus", refreshDate);
    window.addEventListener("pageshow", refreshDate);

    return () => {
      clearTimeout(midnightTimer);
      document.removeEventListener("visibilitychange", refreshDate);
      window.removeEventListener("focus", refreshDate);
      window.removeEventListener("pageshow", refreshDate);
    };
  }, []);

  const actions = [
    {
      title: t("कौन बनेगा धर्मज्ञ", "Kaun Banega Dharmagya"),
      to: "/kbcinstruction",
      icon: <EmojiEventsOutlinedIcon />,
      iconClass: classes.iconGold,
    },
    {
      title: t("KBD रैंकिंग", "KBD Ranking"),
      to: "/kbcallresult",
      icon: <SchoolOutlinedIcon />,
      iconClass: classes.iconGold,
    },
    {
      title: t("आज की प्रश्नोत्तरी", "Today's Quiz"),
      dateLabel: currentDate.displayDate,
      to: `/quizlogin/${currentDate.routeDate}`,
      icon: <EventAvailableOutlinedIcon />,
      iconClass: classes.iconMaroon,
    },
    {
      title: t("आज का परिणाम", "Today's Result"),
      dateLabel: currentDate.displayDate,
      to: `/quizresult/${currentDate.routeDate}`,
      icon: <AssignmentTurnedInIcon />,
      iconClass: classes.iconGreen,
    },
    {
      title: t("पुरानी प्रश्नोत्तरी", "Old Quizzes"),
      to: "/oldquizresults",
      icon: <HistoryOutlinedIcon />,
      iconClass: classes.iconBrown,
    },
    {
      title: t("उत्तर पुस्तिकाएँ", "Answer Sheets"),
      to: "/answerSheets",
      icon: <MenuBookOutlinedIcon />,
      iconClass: classes.iconBrown,
    },
  ];

  return (
    <main className={classes.home}>
      <header className={classes.hero}>
        <div className={classes.greeting}>
          <span className={classes.greetingMark}>◆</span>
          {t("जय जिनेन्द्र", "Jai Jinendra")}
          <span className={classes.greetingMark}>◆</span>
        </div>
        <Typography component="h1" className={classes.heroTitle}>
          {t("जिनदर्शन", "Jindarshan")}
        </Typography>
      </header>

      <Grid container spacing={3}>
        {actions.map((action) => (
          <Grid item xs={12} sm={6} md={4} key={action.to}>
            <ButtonBase
              component={Link}
              to={action.to}
              className={classes.cardButtonBase}
            >
              <Paper
                component="article"
                className={classes.actionCard}
                elevation={0}
              >
                <div className={`${classes.iconWrap} ${action.iconClass}`} aria-hidden="true">
                  {action.icon}
                </div>
                <Typography component="h3" className={classes.cardTitle}>
                  {action.title}
                </Typography>
                {action.dateLabel && (
                  <Typography component="span" className={classes.cardDate}>
                    {action.dateLabel}
                  </Typography>
                )}
              </Paper>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>

      <Paper className={classes.dailyNote} elevation={0}>
        <EventAvailableOutlinedIcon aria-hidden="true" />
        {t("नई “प्रच्छना स्वाध्याय” प्रश्नोत्तरी प्रतिदिन रात 12:01 बजे उपलब्ध होती है।", "New “Prachhana Swadhyay” quiz is available daily at 12:01 AM.")}
      </Paper>
    </main>
  );
}

export default HomeRedesign;