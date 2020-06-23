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
