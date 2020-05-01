import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/Home/Home";
import OldQuiz from "./components/OldQuiz";
import QuizForm from "./components/QuizForm";
import QuizAnswers from "./components/QuizAnswers";
import QuizResult from "./components/QuizResult";
import UserResponse from "./components/UserResponse";
import QuizAnswer from "./components/QuizAnswer";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/oldquizresults" component={OldQuiz} />
        <Route path="/datemonthquiz/:date" component={QuizForm} />
        <Route path="/datemonthresult" component={OldQuiz} />
        <Route path="/answerSheets" component={QuizAnswers} />
        <Route path="/answerSheet/:date" component={QuizAnswer} />
        <Route path="/quizresult/:date" component={QuizResult} />
        <Route path="/yourresponse/:id/:date" component={UserResponse} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
