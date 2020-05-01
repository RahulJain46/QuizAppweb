import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%"
  },
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
  }
}));

function Home() {
  const classes = useStyles();
  const date = new Date();
  const day = new Date().getDate();
  const year = new Date().getFullYear();
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Link to={`/datemonthquiz` + `/${day + "-" + month}`}>
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                QUIZ {day + "-" + month + "-" + year}
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to={`/quizresult` + `/${day + "-" + month}`}>
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.button}>
                QUIZ RESULT {day + "-" + month + "-" + year}
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12}>
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
