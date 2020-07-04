import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import KbcResult from "./KbcResult";
import KbcQuiz from "./KbcQuiz";
import "./KbcContainer.scss";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import logo from "../svg/logo.svg";
import { links } from "../Config";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  welcomeMessage: {
    color: "aquamarine"
  },
  helplineText: {
    color: "aqua"
  },
  topicButton: {
    backgroundColor: "#008b11",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#981212cf"
    }
  },
  container: {
    backgroundColor: "beige"
  },
  quizitems: {
    maxWidth: "100%",
    padding: "0px ! important",
    paddingTop: "10px ! important"
  },
  displayScore: {
    textAlign: "center",
    color: "#ff0d00"
  },
  container: {
    height: 127,
    backgroundColor: "beige"
  }
}));

function KbcContainer(props) {
  const classes = new useStyles();
  const [questions, setQuestions] = useState([]);
  const [temQuestions, setTemQuestions] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(0);
  const [message, setMessage] = useState("");
  let [counter, setCounter] = useState(1);
  const [duration, setDuration] = useState("");
  let [flag, setFlag] = useState(false);
  let [clicked, setClicked] = useState(false);
  let [userScore, setUserScore] = useState(0);
  const [resultQuestion, setResultQuestion] = useState("");
  const [resultUserAnswer, setResultUserAnswer] = useState("");
  const [resultCorrectAnswer, setResultCorrectAnswer] = useState("");
  let [startTime, setStartTime] = useState("");
  let [randomQuestionsIndex, setRandomQuestionsIndex] = useState(0);
  let [randomQuestionIndex, setRandomQuestionIndex] = useState(0);
  const name = props.location.state.fullname;
  const city = props.location.state.city;
  const userId = props.location.state.userId;
  let timeLeft = {};
  let startingTime = moment().format("DD:MM:YYYY HH:mm:ss");

  const date = new Date();
  const [toggleButton, setToggleButton] = useState(false);
  const day =
    new Date().getDate() > 9
      ? new Date().getDate()
      : "0" + new Date().getDate();
  const year = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();

  const today = day + "-0" + currentMonth + "-" + year;

  useEffect(() => {
    const questionsArray = [];
    setStartTime(
      moment()
        .utc()
        .valueOf()
    );
    fetch(links.backendURL + "questions")
      .then(questionsJosn => {
        return questionsJosn.json();
      })
      .then(questionsJson => {
        questionsJson.map(question => {
          questionsArray.push(question.questions);
        });
        setQuestions(questionsArray);
        setTemQuestions(questionsArray);
        setAnswerOptions([{ answerOption: "YES" }, { answerOption: "NO" }]);
        let questionsIndex = Math.floor(Math.random() * questions.length);
        let questionIndex = Math.floor(Math.random() * 20);
        setRandomQuestionsIndex(questionsIndex);
        setRandomQuestionIndex(questionIndex);
        setQuestion(questionsArray[questionsIndex][questionIndex].question);
        setCorrectAnswer(questionsArray[questionsIndex][questionIndex].answer);
      });
  }, []);

  const calculateScore = (userAnswer, counter) => {
    if (userAnswer.toUpperCase() === correctAnswer.toUpperCase()) {
      if (counter == 1) {
        userScore = 5000;
      } else {
        userScore = userScore + 5000;
      }
    } else {
      const endTime = moment()
        .utc()
        .valueOf();
      const duration = endTime - startTime;
      if (duration > 0) {
        timeLeft = {
          days: Math.floor(duration / (1000 * 60 * 60 * 24)),
          hours: Math.floor((duration / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((duration / 1000 / 60) % 60),
          seconds: Math.floor((duration / 1000) % 60)
        };
      }
      submitResponse(
        name,
        city,
        userScore,
        duration,
        `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`,
        userAnswer,
        correctAnswer
      );
      setFlag(true);
      setDuration(`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`);
      setResult(userScore);
      setStartTime("");
    }
    setUserScore(userScore);
  };

  const submitResponse = (
    name,
    city,
    score,
    timeDuration,
    duration,
    userAnswer,
    correctAnswer
  ) => {
    const usersResponseJson = {
      name,
      city,
      score,
      duration,
      startingTime,
      userId,
      timeDuration,
      question,
      userAnswer,
      correctAnswer
    };
    setResultQuestion(question);
    setResultUserAnswer(userAnswer);
    setResultCorrectAnswer(correctAnswer);
    let userOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usersResponseJson)
    };
    fetch(
      links.backendURL + "kbcusersresponse?" + `date=${today}` + `&update=true`,
      userOptions
    ).then(response => {
      // setDuration(duration);
    });
  };

  const submit = (event, randomQuestions, randomQuestion) => {
    setUserAnswer(event.currentTarget.value);
    calculateScore(event.currentTarget.value, counter);
    counter++;

    if (counter <= 20) {
      if (counter == 2 || counter == 4 || counter == 6 || counter == 8) {
        setMessage("Good 🙂");
      } else if (
        counter == 3 ||
        counter == 9 ||
        counter == 12 ||
        counter == 14
      ) {
        setMessage("keep it up 😃!!");
      } else if (counter == 15 || counter == 17 || counter == 19) {
        setMessage("execellent 😍");
      }
      setTimeout(
        () => setNextQuestion(counter, randomQuestions, randomQuestion),
        300
      );
    } else {
      const endTime = moment()
        .utc()
        .valueOf();
      const duration = endTime - startTime;
      if (duration > 0) {
        timeLeft = {
          days: Math.floor(duration / (1000 * 60 * 60 * 24)),
          hours: Math.floor((duration / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((duration / 1000 / 60) % 60),
          seconds: Math.floor((duration / 1000) % 60)
        };
      }
      submitResponse(
        name,
        city,
        userScore,
        duration,
        `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`,
        event.currentTarget.value,
        correctAnswer
      );
      setFlag(true);
      setDuration(`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`);
      setResult(userScore);
      setStartTime("");
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
        questionTotal="20"
        answerOptions={answerOptions}
        onAnswerSelected={event =>
          submit(event, randomQuestionsIndex, randomQuestionIndex)
        }
      />
    );
  };

  const renderResult = () => {
    return (
      <KbcResult
        quizResult={result}
        time={duration}
        userId={userId}
        question={resultQuestion}
        userAnswer={resultUserAnswer}
        correctAnswer={resultCorrectAnswer}
      />
    );
  };
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Jain KBC</h2>
        <h6 className={classes.welcomeMessage}>
          Welcome : {props.location.state.fullname}
        </h6>

        {flag ? (
          ""
        ) : (
          <React.Fragment>
            <h6 className={classes.helplineText}>Help Line</h6>
            <Button
              variant="contained"
              className={classes.topicButton}
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
              Flip the Question
            </Button>
          </React.Fragment>
        )}
      </div>
      {questions.length != 0 ? (
        <React.Fragment>{flag ? renderResult() : renderQuiz()}</React.Fragment>
      ) : (
        ""
      )}
      {flag ? (
        ""
      ) : (
        <Card className={classes.container}>
          <CardContent>
            <h3 className={classes.displayScore}>{message}</h3>
            <h2 className={classes.displayScore}>Score : {userScore}</h2>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default KbcContainer;
