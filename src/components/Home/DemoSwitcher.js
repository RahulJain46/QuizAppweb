import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  switcher: {
    position: "fixed",
    bottom: 18,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    maxWidth: "calc(100% - 24px)",
    backgroundColor: "#111827",
    padding: 6,
    borderRadius: 18,
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    border: "1px solid #374151",
  },
  btn: {
    background: "transparent",
    color: "#D1D5DB",
    border: "none",
    padding: "9px 13px",
    fontSize: 13,
    fontWeight: 700,
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    "&:hover": {
      color: "#FFFFFF",
    },
  },
  activeBtn: {
    background: "#3B82F6",
    color: "#FFFFFF",
    boxShadow: "0 2px 10px rgba(59, 130, 246, 0.5)",
  },
  [theme.breakpoints.down("xs")]: {
    switcher: {
      bottom: 8,
      borderRadius: 14,
    },
    btn: {
      padding: "8px 10px",
      fontSize: 11,
    },
  },
}));

const designs = [
  ["/design1", "1 Classic"],
  ["/design2", "2 Modern"],
  ["/design3", "3 List"],
  ["/design4", "4 Temple"],
  ["/design5", "5 Big Actions"],
  ["/design6", "6 Premium"],
];

export default function DemoSwitcher() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  if (!location.pathname.startsWith("/design")) return null;

  return (
    <div className={classes.switcher}>
      {designs.map(([path, label]) => (
        <button
          key={path}
          onClick={() => history.push(path)}
          className={`${classes.btn} ${location.pathname === path ? classes.activeBtn : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
