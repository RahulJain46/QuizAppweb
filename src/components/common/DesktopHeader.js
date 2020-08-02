import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  navlinks: {
    top: 18,
    position: "relative",
    height: 0
  },
  navheader: {
    position: "relative",
    padding: 30,
    color: "#f5f5f5",
    "&:hover": {
      color: "#b0bec5"
    }
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#ac7818",
    color: "#e9ecef"
  },
  header: {
    position: "fixed",
    width: "100%",
    zIndex: 1,
    left: 2
  },
  upperheader: {
    padding: theme.spacing(2),
    textAlign: "center",
    background: "#234f64",
    color: "#fafafa"
  },
  login: {
    position: "absolute",
    right: 31,
    top: 18
  },
  loginButton: {
    padding: "8px 21px",
    fontSize: 16,
    fontWeight: 700
  },
  admin: {
    position: "absolute",
    right: 150,
    top: 18
  },
  [theme.breakpoints.down("361")]: {
    paper: {
      fontSize: 9
    }
  },
  [theme.breakpoints.between("361", "xs")]: {
    paper: {
      fontSize: 12
    }
  },
  [theme.breakpoints.between("1120", "1380")]: {
    navheader: {
      paddingLeft: 14,
      paddingRight: 0,
      paddingTop: 0,
      paddingbotton: 0
    }
  }
}));

const DesktopHeader = () => {
  const classes = useStyles();
  const activeStyle = { color: "#4fc3f7" };
  return (
    <div className={classes.header}>
      <nav className={classes.navlinks}>
        <NavLink
          to="/"
          activeStyle={activeStyle}
          exact
          className={classes.navheader}
        >
          Home
        </NavLink>
        {" | "}
        <NavLink
          to="/oldquizresults"
          activeStyle={activeStyle}
          className={classes.navheader}
        >
          Old Quiz & Results
        </NavLink>
        {" | "}
        <NavLink
          to="/answerSheets"
          activeStyle={activeStyle}
          className={classes.navheader}
        >
          Answer Sheets
        </NavLink>
      </nav>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.upperheader}>
              <Typography variant="h4" gutterBottom>
                UJJAIN JAIN QUIZ PORTAL
              </Typography>
            </Paper>
            <Paper className={classes.paper}>
              "प्रच्छना स्वाध्याय" NEW QUIZ WILL BE UPLOADED DAILY BY 12:01 AM
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Link className={classes.login} to={`/login`}>
        <Paper>
          <Button className={classes.loginButton}>Login</Button>
        </Paper>
      </Link>
      <Link className={classes.admin} to={`/fileupload`}>
        <Paper>
          <Button className={classes.loginButton}>Admin</Button>
        </Paper>
      </Link>
    </div>
  );
};

export default DesktopHeader;
