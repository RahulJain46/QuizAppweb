import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";
import KbcQuestion from "./KbcQuestion";
import KbcQuestionCount from "./KbcQuestionCount";
import KbcAnswerOption from "./KbcAnswerOption";

function KbcQuiz(props) {
  function renderAnswerOptions(key) {
    return (
      <KbcAnswerOption
        key={key.answerOption}
        answerContent={key.answerOption}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    <TransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <KbcQuestionCount
          counter={props.questionId}
          total={props.questionTotal}
        />
        <KbcQuestion content={props.question} />
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
      </div>
    </TransitionGroup>
  );
}

KbcQuiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default KbcQuiz;
