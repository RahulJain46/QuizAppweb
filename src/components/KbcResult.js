import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";

const useStyles = makeStyles(theme => ({
  topicButton: {
    backgroundColor: "darkred",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#981212cf"
    }
  },
  [theme.breakpoints.down("361")]: {
    lastButton: {
      width: 144,
      color: "#fff",
      backgroundColor: "darkred",
      "&:hover": {
        backgroundColor: "#981212cf"
      }
    },
    paper: {
      width: 144
    }
  }
}));

function KbcResult(props) {
  const classes = new useStyles();
  const referesh = () => {
    window.location.reload();
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
      <div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Button
                variant="contained"
                className={classes.lastButton}
                onClick={() => referesh()}
              >
                Play Again
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Link to={`/kbcallresult`}>
              <Paper className={classes.paper}>
                <Button variant="contained" className={classes.lastButton}>
                  Your Rank
                </Button>
              </Paper>
            </Link>
          </Grid>
        </Grid>
        <h2>Congratulations !!</h2>
        <h3>
          Your final score is <strong>{props.quizResult}</strong>
        </h3>
        <h3>
          Play Time <strong>{props.time}</strong>
        </h3>
        <Grid item xs={12}>
          <Link to={`/`}>
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.lastButton}>
                Home
              </Button>
            </Paper>
          </Link>
        </Grid>
      </div>
    </TransitionGroup>
  );
}

KbcResult.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default KbcResult;
