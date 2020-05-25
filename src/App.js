import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import ReactGA from "react-ga";
import HomePage from "./components/Home/Home";
import OldQuiz from "./components/OldQuiz";
import QuizForm from "./components/QuizForm";
import QuizFormSanganer from "./components/QuizFormSanganer";
import QuizAnswers from "./components/QuizAnswers";
import ResponseDates from "./components/ResponseDates";
import Login from "./components/Login";
import QuizResult from "./components/QuizResult";
import KbcContainer from "./components/KbcContainer";
import Comments from "./components/Comments";
import ExamInstruction from "./components/ExamInstruction";
import QuizTopic from "./components/QuizTopic";
import Exams from "./components/Exams";
import ExamScore from "./components/ExamScore";
import ExamLogin from "./components/ExamLogin";
import ExamUserResponse from "./components/ExamUserResponse";
import QuizResultAdmin from "./components/QuizResultAdmin";
import QuizResultSanganer from "./components/QuizResultSanganer";
import UserResponse from "./components/UserResponse";
import Bhajan from "./components/Bhajan";
import QuizAnswer from "./components/QuizAnswer";
import QuizAnswerSanganer from "./components/QuizAnswerSanganer";
import DesktopHeader from "./components/common/DesktopHeader";
import AppBar from "./components/common/AppBar";
import Footer from "./components/common/Footer";
import PageNotFound from "./components/PageNotFound";
import ExamInstruction from "./components/ExamInstruction";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  [theme.breakpoints.down("1124")]: {
    container: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%"
    }
  }
}));

function App() {
  const classes = useStyles();
  useEffect(() => {
    ReactGA.initialize("UA-165998646-2");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <div className={classes.container}>
      <AppBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/oldquizresults" component={OldQuiz} />
        <Route path="/datemonthquiz/:date" component={QuizForm} />
        <Route path="/sanganer/:date" component={QuizFormSanganer} />
        <Route path="/datemonthresult" component={OldQuiz} />
        <Route path="/answerSheets" component={QuizAnswers} />
        <Route path="/comments" component={Comments} />
        <Route path="/responsedates/:userid" component={ResponseDates} />
        <Route path="/login" component={Login} />
        <Route path="/bhajan" component={Bhajan} />
        <Route path="/answerSheet/:date" component={QuizAnswer} />
        <Route path="/answerSheetSanganer" component={QuizAnswerSanganer} />
        <Route path="/exams" component={Exams} />
        <Route path="/quiztopic" component={QuizTopic} />
        <Route path="/examScore" component={ExamScore} />
        <Route path="/examlogin" component={ExamLogin} />
        <Route path="/examInstruction" component={ExamInstruction} />
        <Route
          exact
          path="/examuserresponse/:userid/:date"
          component={ExamUserResponse}
        />
        <Route
          exact
          path="/examuserresponse/:userid"
          component={ExamUserResponse}
        />
        <Route
          path="/quizresultsanganer/:date"
          component={QuizResultSanganer}
        />
        <Route path="/quizresult/:date" component={QuizResultAdmin} />
        <Route path="/yourresponse/:id/:date" component={UserResponse} />
        <Route path="/kbc" component={KbcContainer} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
