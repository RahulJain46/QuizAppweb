import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 48,
    padding: theme.spacing(1, 2),
    color: "#F7EDE3",
    backgroundColor: "#3F2E27",
    boxShadow: "0 -3px 14px rgba(56, 36, 27, 0.10)",
    textAlign: "center",
  },
  fixedFooter: {
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: theme.zIndex.appBar,
  },
  footerText: {
    fontSize: 13,
    lineHeight: 1.5,
  },
  separator: {
    margin: theme.spacing(0, 1),
    color: "#D5A966",
  },
  [theme.breakpoints.down("xs")]: {
    footer: {
      minHeight: 42,
      padding: theme.spacing(0.75, 1),
    },
    footerText: {
      fontSize: 11,
    },
    separator: {
      margin: theme.spacing(0, 0.5),
    },
  },
}));

function SiteFooter() {
  const classes = useStyles();
  const location = useLocation();
  const { t } = useLanguage();
  const footerClassName =
    location.pathname === "/"
      ? classes.footer
      : `${classes.footer} ${classes.fixedFooter}`;

  return (
    <footer className={footerClassName}>
      <Typography className={classes.footerText}>
        {t("जिनदर्शन सेवा", "Jindarshan Service")}
        <span className={classes.separator} aria-hidden="true">
          •
        </span>
        {t("राजेश, राहुल एवं अनुज जैन, उज्जैन", "Rajesh, Rahul & Anuj Jain, Ujjain")}
        <span className={classes.separator} aria-hidden="true">
          •
        </span>
        {t("संपर्क: 8989984415", "Contact: 8989984415")}
      </Typography>
    </footer>
  );
}

export default SiteFooter;
