import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";
import KbcQuestion from "./KbcQuestion";
import KbcQuestionCount from "./KbcQuestionCount";
import KbcAnswerOption from "./KbcAnswerOption";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  answerOptions: {
    backgroundColor: "antiquewhite",
    margin: 0,
    padding: 0,
    listStyle: "none"
  }
}));

function KbcQuiz(props) {
  const classes = new useStyles();
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
        <ul className={classes.answerOptions}>
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
