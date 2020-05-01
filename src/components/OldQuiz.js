import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

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

function OldQuiz() {
  const classes = useStyles();
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dateArray = [];
    fetch("https://samplecovide19s.herokuapp.com/data")
      .then(questionJson => {
        return questionJson.json();
      })
      .then(questions => {
        questions.map(question => {
          dateArray.push(question.date);
        });
        setDates(dateArray);
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              OLD QUIZ & RESULTS
            </Typography>
          </Paper>
        </Grid>
        {dates.length != 0 && !loading ? (
          dates.map(date => (
            <React.Fragment>
              <Grid item xs={6}>
                <Link to={`/datemonthquiz` + `/${date}`}>
                  <Paper className={classes.paper}>
                    <Button variant="contained" className={classes.button}>
                      QUIZ {date}
                    </Button>
                  </Paper>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link to={`/quizresult` + `/${date}`}>
                  <Paper className={classes.paper}>
                    <Button variant="contained" className={classes.button}>
                      QUIZ RESULT {date}
                    </Button>
                  </Paper>
                </Link>
              </Grid>
            </React.Fragment>
          ))
        ) : (
          <div className={classes.loading}>
            Loading
            <CircularProgress />
          </div>
        )}
      </Grid>
    </div>
  );
}

export default OldQuiz;
