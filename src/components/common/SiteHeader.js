import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const useStyles = makeStyles((theme) => ({
  desktopHeader: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
    boxShadow: "0 3px 18px rgba(65, 32, 25, 0.16)",
  },
  appBar: {
    color: "#FFFFFF",
    backgroundColor: "#6B2929",
  },
  toolbar: {
    width: "min(1180px, calc(100% - 48px))",
    minHeight: 76,
    margin: "0 auto",
    padding: 0,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 11,
    color: "#FFFFFF",
    textDecoration: "none",
  },
  brandMark: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    color: "#6B2929",
    backgroundColor: "#F2D7A7",
    borderRadius: "50%",
    fontSize: 19,
    fontWeight: 800,
  },
  brandName: {
    fontSize: 28,
    lineHeight: 1,
    fontWeight: 800,
  },
  brandCaption: {
    display: "block",
    marginTop: 5,
    color: "#EFDCC9",
    fontSize: 12,
    letterSpacing: "0.08em",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginLeft: "auto",
  },
  navLink: {
    padding: theme.spacing(1, 1.5),
    color: "#F9EDE4",
    borderRadius: 7,
    fontSize: 16,
    fontWeight: 600,
    textDecoration: "none",
    "&:hover": {
      color: "#FFFFFF",
      backgroundColor: "rgba(255,255,255,0.10)",
      textDecoration: "none",
    },
  },
  activeNavLink: {
    color: "#FFFFFF",
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  adminButton: {
    marginLeft: theme.spacing(1),
    color: "#5A2B1F",
    backgroundColor: "#F2D7A7",
    "&:hover": {
      backgroundColor: "#E8C486",
    },
  },
  langToggle: {
    marginLeft: theme.spacing(1),
    color: "#FFFFFF",
    minWidth: 48,
    fontWeight: 700,
    fontSize: 16,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
  },
  announcement: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
    padding: theme.spacing(1, 2),
    color: "#5A3B22",
    backgroundColor: "#F1E3CC",
    borderBottom: "1px solid #DEC49E",
    fontSize: 15,
    fontWeight: 600,
    textAlign: "center",
  },
  mobileToolbar: {
    minHeight: 64,
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  menuButton: {
    flex: "0 0 auto",
    color: "#FFFFFF",
  },
  mobileBrand: {
    flex: "1 1 auto",
    minWidth: 0,
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: 800,
    textAlign: "center",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  mobileLangToggle: {
    flex: "0 0 auto",
    minWidth: 56,
    color: "#FFFFFF",
    fontWeight: 700,
  },
  menuPaper: {
    minWidth: 235,
  },
  menuItem: {
    minHeight: 52,
    fontSize: 17,
  },
  mobileAnnouncement: {
    fontSize: 14,
  },
}));

function SiteHeader() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const { lang, toggleLanguage, t } = useLanguage();

  const navigation = [
    { label: t("मुख्य पृष्ठ", "Home"), to: "/v2" },
    { label: t("पुरानी प्रश्नोत्तरी", "Old Quizzes"), to: "/oldquizresults" },
    { label: t("उत्तर पुस्तिकाएँ", "Answer Sheets"), to: "/answerSheets" },
  ];

  const navigate = (path) => {
    setAnchorEl(null);
    history.push(path);
  };

  return (
    <header>
      <Hidden mdDown>
        <div className={classes.desktopHeader}>
          <AppBar position="static" className={classes.appBar} elevation={0}>
            <Toolbar className={classes.toolbar}>
              <Link to="/v2" className={classes.brand} aria-label="जिनदर्शन मुख्य पृष्ठ">
                <span className={classes.brandMark} aria-hidden="true">
                  जि
                </span>
                <span>
                  <span className={classes.brandName}>जिनदर्शन</span>
                  <span className={classes.brandCaption}>JINDARSHAN</span>
                </span>
              </Link>
              <nav className={classes.nav} aria-label="मुख्य नेविगेशन">
                {navigation.map((item) => (
                  <NavLink
                    exact={item.to === "/"}
                    key={item.to}
                    to={item.to}
                    className={classes.navLink}
                    activeClassName={classes.activeNavLink}
                  >
                    {item.label}
                  </NavLink>
                ))}
                <Button
                  component={Link}
                  to="/login"
                  className={classes.adminButton}
                >
                  {t("लॉग इन", "Login")}
                </Button>
                <Button onClick={toggleLanguage} className={classes.langToggle}>
                  {lang === 'hi' ? 'EN' : 'हिन्दी'}
                </Button>
              </nav>
            </Toolbar>
          </AppBar>
          <div className={classes.announcement}>
            {t("“प्रच्छना स्वाध्याय” — नई प्रश्नोत्तरी प्रतिदिन रात 12:01 बजे उपलब्ध", "“Prachhana Swadhyay” — New quiz available daily at 12:01 AM")}
          </div>
        </div>
      </Hidden>

      <Hidden lgUp>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.mobileToolbar}>
            <IconButton
              className={classes.menuButton}
              onClick={(event) => setAnchorEl(event.currentTarget)}
              color="inherit"
              aria-label="नेविगेशन मेनू खोलें"
              aria-controls="mobile-navigation"
              aria-haspopup="true"
            >
              <MenuIcon />
            </IconButton>
            <Typography component="div" className={classes.mobileBrand}>
              {t("जिनदर्शन", "Jindarshan")}
            </Typography>
            <Button
              onClick={toggleLanguage}
              className={classes.mobileLangToggle}
            >
              {lang === "hi" ? "EN" : "हिन्दी"}
            </Button>
          </Toolbar>
        </AppBar>
        <div className={`${classes.announcement} ${classes.mobileAnnouncement}`}>
          {t("नई प्रश्नोत्तरी प्रतिदिन रात 12:01 बजे", "New quiz daily at 12:01 AM")}
        </div>
        <Menu
          id="mobile-navigation"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          classes={{ paper: classes.menuPaper }}
        >
          {navigation.map((item) => (
            <MenuItem
              className={classes.menuItem}
              key={item.to}
              onClick={() => navigate(item.to)}
            >
              {item.label}
            </MenuItem>
          ))}
          <MenuItem className={classes.menuItem} onClick={() => navigate("/login")}>
            {t("लॉग इन", "Login")}
          </MenuItem>
        </Menu>
      </Hidden>
    </header>
  );
}

export default SiteHeader;
