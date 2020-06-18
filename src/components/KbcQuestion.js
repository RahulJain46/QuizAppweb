import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

function KbcQuestion(props) {
  return (
    <Typography variant="h6" gutterBottom className="question">
      {props.content}
    </Typography>
  );
}

KbcQuestion.propTypes = {
  content: PropTypes.string.isRequired
};

export default KbcQuestion;
