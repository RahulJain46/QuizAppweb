import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import KbcResult from "./KbcResult";
import KbcQuiz from "./KbcQuiz";
import "./KbcContainer.scss";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import logo from "../svg/logo.svg";

//import KbcQuestion from "./KbcQuestion.js";
//const useStyles = makeStyles(theme => ({}));

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  topicButton: {
    backgroundColor: "darkred",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#981212cf"
    }
  },
  quizitems: {
    maxWidth: "100%",
    padding: "0px ! important",
    paddingTop: "10px ! important"
  }
}));

function KbcContainer() {
  const classes = new useStyles();
  const [questions, setQuestions] = useState([]);
  const [temQuestions, setTemQuestions] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(0);
  let [counter, setCounter] = useState(1);
  let [flag, setFlag] = useState(false);
  let [clicked, setClicked] = useState(false);
  let [userScore, setUserScore] = useState(0);
  let [randomQuestionsIndex, setRandomQuestionsIndex] = useState(0);
  let [randomQuestionIndex, setRandomQuestionIndex] = useState(0);

  useEffect(() => {
    const questionsArray = [];
    fetch("https://prodbackendjin.herokuapp.com/questions")
      .then(questionsJosn => {
        return questionsJosn.json();
      })
      .then(questionsJson => {
        questionsJson.map(question => {
          questionsArray.push(question.questions);
        });
        // setResult(0);
        setQuestions(questionsArray);
        setTemQuestions(questionsArray);
        setAnswerOptions([{ answerOption: "YES" }, { answerOption: "NO" }]);
        // setCounter(counter + 1);
        let questionsIndex = Math.floor(Math.random() * questions.length);
        let questionIndex = Math.floor(Math.random() * 20);
        setRandomQuestionsIndex(questionsIndex);
        setRandomQuestionIndex(questionIndex);
        setQuestion(questionsArray[questionsIndex][questionIndex].question);
        setCorrectAnswer(questionsArray[questionsIndex][questionIndex].answer);
        // delete temQuestions[randomQuestionsIndex][randomQuestionIndex]
        // setTemQuestions()
      });
  }, []);

  const calculateScore = (userAnwer, counter) => {
    if (userAnwer.toUpperCase() === correctAnswer.toUpperCase()) {
      if (counter == 1) {
        userScore = 5000;
      } else {
        userScore = userScore * 2;
      }
    } else {
      setTimeout(() => {
        setFlag(true);
        setResult(userScore);
      }, 300);
    }
    setUserScore(userScore);
  };

  const submit = (event, randomQuestions, randomQuestion) => {
    setUserAnswer(event.currentTarget.value);
    calculateScore(event.currentTarget.value, counter);
    counter++;
    if (counter <= 5) {
      setTimeout(
        () => setNextQuestion(counter, randomQuestions, randomQuestion),
        300
      );
    } else {
      setTimeout(() => {
        setFlag(true);
        setResult(userScore);
      }, 300);
    }
  };

  const setNextQuestion = (
    counter,
    randomQuestions,
    randomQuestion,
    clicked
  ) => {
    setUserAnswer("");
    setCounter(counter);
    if (clicked) {
      setClicked(clicked);
    }

    if (
      temQuestions[randomQuestions] != undefined &&
      temQuestions[randomQuestions][randomQuestion] != undefined &&
      temQuestions[randomQuestions][randomQuestion]
    ) {
      delete temQuestions[randomQuestions][randomQuestion];
    }
    let randomQuestionsIndex = Math.floor(Math.random() * questions.length);
    let randomQuestionIndex = Math.floor(Math.random() * 20);
    setRandomQuestionsIndex(randomQuestionsIndex);
    setRandomQuestionIndex(randomQuestionIndex);
    if (
      temQuestions[randomQuestionsIndex] != undefined &&
      temQuestions[randomQuestionsIndex][randomQuestionIndex] != undefined &&
      temQuestions[randomQuestionsIndex][randomQuestionIndex]
    ) {
      setQuestion(
        questions[randomQuestionsIndex][randomQuestionIndex].question
      );
      setCorrectAnswer(
        questions[randomQuestionsIndex][randomQuestionIndex].answer
      );
    } else {
      setNextQuestion(counter);
    }
  };
  const renderQuiz = () => {
    return (
      <KbcQuiz
        answer={userAnswer}
        questionId={counter}
        question={question}
        questionTotal="5"
        answerOptions={answerOptions}
        onAnswerSelected={event =>
          submit(event, randomQuestionsIndex, randomQuestionIndex)
        }
      />
    );
  };

  const renderResult = () => {
    return <KbcResult quizResult={result} />;
  };
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Jain KBC</h2>
        Correct Answer : {correctAnswer}
        <h2>Jain KBC</h2>
        Score : {userScore}
      </div>
      {questions.length != 0 ? (
        <React.Fragment>{flag ? renderResult() : renderQuiz()}</React.Fragment>
      ) : (
        ""
      )}
      <Grid item xs={12} className={classes.quizitems}>
        <Paper className={classes.paper}>
          <Button variant="contained" className={classes.topicButton}>
            Flip the Question
          </Button>
        </Paper>
      </Grid>
      <button
        className={`flipquestion` + clicked}
        disabled={clicked}
        onClick={() =>
          setNextQuestion(
            counter,
            randomQuestionsIndex,
            randomQuestionIndex,
            (clicked = true)
          )
        }
      >
        Flip the question
      </button>
    </div>
  );
}

export default KbcContainer;
