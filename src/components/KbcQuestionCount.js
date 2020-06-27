import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

function KbcQuestionCount(props) {
  return (
    <Typography variant="h6" gutterBottom className="questionCount">
      Question <span>{props.counter}</span> of <span>{props.total}</span>
    </Typography>
  );
}

KbcQuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default KbcQuestionCount;
