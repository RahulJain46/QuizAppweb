import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import { links } from "../Config";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  oldQuiz: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#303f9f",
    },
  },
  topicButton: {
    backgroundColor: "purple",
    color: "#fff",
    width: 160,
    "&:hover": {
      backgroundColor: "#820999cf",
    },
  },
  quizitems: {
    maxWidth: "100%",
    padding: "0px ! important",
    paddingTop: "10px ! important",
  },
  resultbutton: {
    backgroundColor: "#aa1050e3",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#610c2b",
    },
  },
  loading: {
    position: "relative",
    top: 77,
    left: "38%",
  },
  backButton: {
    backgroundColor: "#1976d2",
  },
  [theme.breakpoints.down("1105")]: {
    oldQuiz: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%",
    },
    oldQuizButton: {
      minWidth: "100%",
      maxWidth: "100%",
      padding: "1px ! important",
    },
    quizbuttons: {
      display: "inlineBlock",
    },
    oldQuizHeading: {
      fontSize: 22,
    },
    quizbuttonsItem: {
      padding: 1,
      padding: "1px ! important",
    },
    button: {
      padding: "4px 6px",
      width: 185,
    },
    resultbutton: {
      padding: "4px 6px",
      width: 185,
    },
    backButton: {
      backgroundColor: "#1976d2",
      padding: "3px 10px",
      fontSize: 11,
    },
    backArrow: {
      fontSize: 15,
    },
  },
}));

function OldQuiz() {
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

  //const year = new Date().getFullYear();
  const presentDate = `${day}-${month}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const dateArray = [];
    let userOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    fetch(
      links.backendURL + "questions?" + "date=1&date=all&date=allDates",
      userOptions
    )
      .then((questionJson) => {
        return questionJson.json();
      })
      .then((questions) => {
        questions.map((question) => {
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
    <div className={classes.oldQuiz}>
      <Grid container spacing={3} className={classes.quizbuttons}>
        <Grid item xs={12} className={classes.quizbuttonsItem}>
          <Paper className={classes.paper}>
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
            <Grid item xs={12} className={classes.quizitems}>
              <Link to="/quiztopic">
                <Button variant="contained" className={classes.topicButton}>
                  Old Quiz Topics
                </Button>
              </Link>
            </Grid>

            <Typography
              variant="h4"
              gutterBottom
              className={classes.oldQuizHeading}
            >
              OLD QUIZ & RESULTS
            </Typography>
          </Paper>
        </Grid>
        {dates.length != 0 && !loading ? (
          dates.map((date) => (
            <React.Fragment>
              <Grid item xs={6} className={classes.oldQuizButton}>
                <Link to={`/datemonthquiz` + `/${date}`}>
                  <Paper className={classes.paper}>
                    <Button variant="contained" className={classes.button}>
                      QUIZ {moment(date, "DD-MM-YYYY").format("DD-MMM")}
                    </Button>
                  </Paper>
                </Link>
              </Grid>
              <Grid item xs={6} className={classes.oldQuizButton}>
                <Link to={`/quizresult` + `/${date}`}>
                  <Paper className={classes.paper}>
                    <Button
                      variant="contained"
                      className={classes.resultbutton}
                    >
                      QUIZ RESULT {moment(date, "DD-MM-YYYY").format("DD-MMM")}
                    </Button>
                  </Paper>
                </Link>
              </Grid>
            </React.Fragment>
          ))
        ) : (
          <div className={classes.loading}>
            <Fade
              in={loading}
              style={{
                transitionDelay: loading ? "800ms" : "0ms",
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

export default OldQuiz;
