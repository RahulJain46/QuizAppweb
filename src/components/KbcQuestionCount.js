import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  questionCount: {
    fontSize: 20,
    backgroundColor: "beige",
    paddingLeft: 10,
    padding: 10
  }
}));

function KbcQuestionCount(props) {
  const classes = new useStyles();
  return (
    <Typography variant="h6" gutterBottom className={classes.questionCount}>
      Question <span>{props.counter}</span> of <span>{props.total}</span>
    </Typography>
  );
}

KbcQuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default KbcQuestionCount;
