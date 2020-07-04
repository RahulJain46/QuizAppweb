import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  question: {
    backgroundColor: "#89eddf59",
    fontSize: 24,
    padding: 10
  }
}));

function KbcQuestion(props) {
  const classes = new useStyles();
  return (
    <Typography variant="h6" gutterBottom className={classes.question}>
      {props.content}
    </Typography>
  );
}

KbcQuestion.propTypes = {
  content: PropTypes.string.isRequired
};

export default KbcQuestion;
