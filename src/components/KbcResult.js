import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";

const useStyles = makeStyles(theme => ({
  topicButton: {
    backgroundColor: "#613c8b",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#981212cf"
    }
  },
  playAgainButton: {
    width: 144,
    color: "#fff",
    backgroundColor: "#6036b3",
    "&:hover": {
      backgroundColor: "#981212cf"
    }
  },
  container: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    top: 176,
    position: "absolute",
    maxWidth: "45%",
    marginBottom: 75,
    left: "30%",
    width: "100%"
  },
  firstButton: {
    padding: 1,
    padding: "12px ! important",
    paddingBottom: "24px ! important"
  },
  secondButton: {
    padding: 1,
    paddingBottom: "23px  !important"
  },
  question: {
    color: "#ff0039"
  },
  correctAnswer: {
    color: "#ff0039"
  },
  [theme.breakpoints.down("600")]: {
    lastButton: {
      width: 144,
      color: "#fff",
      backgroundColor: "darkred",
      "&:hover": {
        backgroundColor: "#981212cf"
      }
    },
    resultButton: {
      display: "inline-Block"
    },
    homeButton: {
      width: 144,
      color: "#fff",
      backgroundColor: "darkred",
      "&:hover": {
        backgroundColor: "#981212cf"
      }
    },
    paper: {
      width: 144
    },
    paperButton: {
      width: 144,
      left: "27%",
      position: "relative"
    },
    container: {
      maxWidth: "100%",
      top: 176,
      marginBottom: "22%",
      left: "0%",
      display: "contents"
    },
    kbcResult: {
      flexGrow: 1
    },
    paperButton: {
      left: 0
    },
    homeGridButton: {
      width: 144,
      paddingBottom: "62px  !important"
    }
  },
  [theme.breakpoints.between("300", "340")]: {
    paperButton: {
      left: 0
    },
    paperButton: {
      left: 0
    }
  }
}));

function KbcResult(props) {
  debugger;
  const classes = new useStyles();
  const history = useHistory();
  const referesh = () => {
    window.location.reload();
  };

  const viewRank = () => {
    history.push(`/kbcallresult`, props.userId);
  };

  return (
    <TransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div className={classes.kbcResult}>
        <Grid container spacing={3} className={classes.resultButton}>
          <Grid item xs={6} className={classes.firstButton}>
            <Paper className={classes.paper}>
              <Button
                variant="contained"
                className={classes.playAgainButton}
                onClick={() => referesh()}
              >
                Play Again
              </Button>
            </Paper>
          </Grid>
          <Card className={classes.container}>
            <CardContent>
              <h2>Congratulations !!</h2>
              <h3>
                Your final score is <strong>{props.quizResult}</strong>
              </h3>
              <h3>
                Play Time <strong>{props.time}</strong>
              </h3>
              <h3 className={classes.question}>
                Question <strong>{props.question}</strong>
              </h3>
              <h3 className={classes.correctAnswer}>
                Your Answer <strong>{props.correctAnswer}</strong>
              </h3>
            </CardContent>
          </Card>
          <Grid item xs={6} className={classes.secondButton}>
            <Paper className={classes.paper}>
              <Button
                variant="contained"
                className={classes.lastButton}
                onClick={() => viewRank()}
              >
                Your Rank
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.homeGridButton}>
            <Link to={`/`}>
              <Paper className={classes.paperButton}>
                <Button variant="contained" className={classes.homeButton}>
                  Home
                </Button>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </div>
    </TransitionGroup>
  );
}

KbcResult.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default KbcResult;
