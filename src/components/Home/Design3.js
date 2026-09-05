import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, ButtonBase, AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import EmojiEventsOutlinedIcon from "@material-ui/icons/EmojiEventsOutlined";
import EventAvailableOutlinedIcon from "@material-ui/icons/EventAvailableOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#F0FFF4", // Soft Mint/Sage
    paddingBottom: 120,
    fontFamily: '"Segoe UI", sans-serif',
  },
  appBar: {
    backgroundColor: "#234E52", // Deep Teal
    boxShadow: "0 2px 10px rgba(35, 78, 82, 0.2)",
  },
  toolbar: {
    justifyContent: "space-between",
    width: "min(800px, 100%)",
    margin: "0 auto",
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: 700,
    textDecoration: "none",
    letterSpacing: "1px",
  },
  langBtn: {
    color: "#FFFFFF",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: "6px 16px",
  },
  headerArea: {
    width: "min(800px, calc(100% - 32px))",
    margin: "40px auto 30px",
    color: "#234E52",
  },
  pageTitle: {
    fontSize: "2.5rem",
    fontWeight: 800,
  },
  listContainer: {
    width: "min(800px, calc(100% - 32px))",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  listItemBase: {
    width: "100%",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "translateX(6px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    },
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(3),
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderLeft: "6px solid #319795",
  },
  listIcon: {
    color: "#319795",
    marginRight: theme.spacing(3),
    "& svg": {
      fontSize: 36,
    },
  },
  listTextContent: {
    flexGrow: 1,
    textAlign: "left",
  },
  listTitle: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#1A202C",
  },
  listSub: {
    fontSize: "1rem",
    color: "#4A5568",
    marginTop: 4,
  },
  chevron: {
    color: "#CBD5E0",
    fontSize: 40,
  },
}));

export default function Design3() {
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
    },
    {
      title: t("आज का परिणाम", "Today's Result"),
      sub: displayDate,
      to: `/quizresult/${routeDate}`,
      icon: <AssignmentTurnedInIcon />,
    },
    {
      title: t("कौन बनेगा धर्मज्ञ", "Kaun Banega Dharmagya"),
      sub: t("खेलें और ज्ञान बढ़ाएं", "Play and increase knowledge"),
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
          <Link to="/design3" className={classes.brand}>
            {t("जिनदर्शन", "Jindarshan")}
          </Link>
          <Button onClick={toggleLanguage} className={classes.langBtn}>
            {lang === 'hi' ? 'Switch to English' : 'हिंदी में देखें'}
          </Button>
        </Toolbar>
      </AppBar>

      <div className={classes.headerArea}>
        <Typography className={classes.pageTitle}>{t("जय जिनेन्द्र", "Jai Jinendra")}</Typography>
        <Typography variant="h6" style={{ color: "#4A5568", marginTop: 8 }}>
          {t("कृपया नीचे दिए गए विकल्पों में से चुनें:", "Please select from the options below:")}
        </Typography>
      </div>

      <div className={classes.listContainer}>
        {actions.map((act, i) => (
          <ButtonBase key={i} component={Link} to={act.to} className={classes.listItemBase}>
            <Paper className={classes.listItem} elevation={0}>
              <div className={classes.listIcon}>{act.icon}</div>
              <div className={classes.listTextContent}>
                <Typography className={classes.listTitle}>{act.title}</Typography>
                {act.sub && <Typography className={classes.listSub}>{act.sub}</Typography>}
              </div>
              <ChevronRightIcon className={classes.chevron} />
            </Paper>
          </ButtonBase>
        ))}
      </div>
    </div>
  );
}
