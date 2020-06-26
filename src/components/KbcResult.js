import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { TransitionGroup } from "react-transition-group";

const useStyles = makeStyles(theme => ({
  topicButton: {
    backgroundColor: "darkred",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#981212cf"
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
        <Button className={classes.topicButton} onClick={() => referesh()}>
          Play Again
        </Button>
        <h2>Congratulations !!</h2>
        <h3>
          Your final score is <strong>{props.quizResult}</strong>
        </h3>
        <h3>
          Play Time <strong>{props.time}</strong>
        </h3>
      </div>
    </TransitionGroup>
  );
}

KbcResult.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default KbcResult;
