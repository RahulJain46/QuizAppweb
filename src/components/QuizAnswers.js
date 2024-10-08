import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import { links } from "../Config";
import moment from "moment";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  answers: {
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
  backButton: {
    backgroundColor: "#1976d2"
  },
  loading: {
    position: "absolute",
    left: "40%",
    top: "40%"
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  [theme.breakpoints.down("1105")]: {
    answers: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%"
    },
    answerButton: {
      minWidth: "100%",
      maxWidth: "100%",
      padding: "1px ! important"
    },
    answerbuttons: {
      display: "inlineBlock"
    },
    answersHeading: {
      fontSize: 22
    },
    answerbuttonsItem: {
      padding: 1,
      padding: "1px ! important"
    },
    button: {
      padding: "4px 6px",
      width: 185
    },
    backButton: {
      backgroundColor: "#1976d2",
      padding: "3px 10px",
      fontSize: 11
    },
    backArrow: {
      fontSize: 15
    }
  }
}));

function QuizAnswers() {
  const classes = useStyles();
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const date = new Date();
  const day =
    new Date().getDate() > 9
      ? new Date().getDate()
      : "0" + new Date().getDate();
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const presentDate = `${day}-${month}`;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const dateArray = [];
    fetch(links.backendURL + "questions?" + "date=1&date=all")
      .then(questionJson => {
        return questionJson.json();
      })
      .then(questions => {
        questions.map(question => {
           let quesdate = question.date;
          const today = moment(presentDate, "DD-MM-YYYY");
          const someday = moment(quesdate, "DD-MM-YYYY");
          if (someday < today) {
            dateArray.push(quesdate);
          }
        });
        dateArray.sort(
          (a, b) => moment(b, "DD-MM-YYYY") - moment(a, "DD-MM-YYYY")
        );
        setDates(dateArray);
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.answers}>
      <Grid container spacing={3} className={classes.answerbuttons}>
        <Grid item xs={12} className={classes.answerbuttonsItem}>
          <Paper className={classes.paper}>
            <Typography
              variant="h4"
              gutterBottom
              className={classes.answersHeading}
            >
              ANSWER SHEETS
            </Typography>
            <Link to={`/`}>
              <Button
                variant="contained"
                color="primary"
                className={classes.backButton}
              >
                <ArrowBackIosIcon className={classes.backArrow} />
                Go to home
              </Button>
            </Link>
          </Paper>
        </Grid>
        {dates.length != 0 && !loading ? (
          dates.map(date => (
            <Grid item xs={6} className={classes.answerButton}>
              <Link to={`/answersheet` + `/${date}`}>
                <Paper className={classes.paper}>
                  <Button variant="contained" className={classes.button}>
                    {moment(date, "DD-MM-YYYY").format("DD-MMM")}
                  </Button>
                </Paper>
              </Link>
            </Grid>
          ))
        ) : (
          <div className={classes.loading}>
            <Fade
              in={loading}
              style={{
                transitionDelay: loading ? "800ms" : "0ms"
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          </div>
        )}
      </Grid>
    </div>
  );
}

export default QuizAnswers;
