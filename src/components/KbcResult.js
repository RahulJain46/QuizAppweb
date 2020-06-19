import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";

function KbcResult(props) {
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
        <h2>
          Congratulations !! Your final score is{" "}
          <strong>{props.quizResult}</strong>
        </h2>
      </div>
    </TransitionGroup>
  );
}

KbcResult.propTypes = {
  quizResult: PropTypes.string.isRequired
};

export default KbcResult;
