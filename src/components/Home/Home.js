import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  home: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%"
  },
  [theme.breakpoints.down("sm")]: {
    home: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "10%"
    },
    quizbutton: {
      display: "inline-block"
    },
    quizitems: {
      maxWidth: "100%",
      padding: "0px ! important",
      paddingTop: "10px ! important"
    },
    button: {
      padding: "4px 6px"
    }
  }
}));

function Home() {
  const classes = useStyles();
  const date = new Date();
  const day =
    new Date().getDate() > 9
      ? new Date().getDate()
      : "0" + new Date().getDate();
  const year = new Date().getFullYear();
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  return (
    <div className={classes.home}>
      <Grid container spacing={3} className={classes.quizbutton}>
        <Grid item xs={6} className={classes.quizitems}>
          <Link to={`/datemonthquiz` + `/${day + "-" + month}`}>
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                QUIZ {day + "-" + month + "-" + year}
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6} className={classes.quizitems}>
          <Link to={`/quizresult` + `/${day + "-" + month}`}>
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                QUIZ RESULT {day + "-" + month + "-" + year}
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} className={classes.quizitems}>
          <Link to="/oldquizresults">
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                OLD QUIZ & RESULTS
              </Button>
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
