import React, { useEffect, Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
//import HomePage from "./components/Home/Home";
const HomePage = lazy(() => import("./components/Home/Home"));
const OldQuiz = lazy(() => import("./components/OldQuiz"));
const ChildrenQuiz = lazy(() => import("./components/ChildrenQuiz"));
const childrenUserResponse = lazy(() =>
  import("./components/childrenUserResponse")
);
const QuizFormchildren = lazy(() => import("./components/QuizFormchildren"));
const QuizResultchildren = lazy(() =>
  import("./components/QuizResultchildren")
);

const QuizForm = lazy(() => import("./components/QuizForm"));
const QuizFormSanganer = lazy(() => import("./components/QuizFormSanganer"));
const QuizAnswers = lazy(() => import("./components/QuizAnswers"));
const ResponseDates = lazy(() => import("./components/ResponseDates"));
const Login = lazy(() => import("./components/Login"));
const KbcContainer = lazy(() => import("./components/KbcContainer"));

const KbcInstruction = lazy(() => import("./components/KbcInstruction"));
const KbcLoginPage = lazy(() => import("./components/KbcLoginPage"));
const KbcAllResult = lazy(() => import("./components/KbcAllResult"));
const Comments = lazy(() => import("./components/Comments"));
const QuizTopic = lazy(() => import("./components/QuizTopic"));
const Exams = lazy(() => import("./components/Exams"));

const ExamScore = lazy(() => import("./components/ExamScore"));
const ExamLogin = lazy(() => import("./components/ExamLogin"));
const ExamUserResponse = lazy(() => import("./components/ExamUserResponse"));
const QuizResultAdmin = lazy(() => import("./components/QuizResultAdmin"));
const QuizResultSanganer = lazy(() =>
  import("./components/QuizResultSanganer")
);
const UserResponse = lazy(() => import("./components/UserResponse"));

const FileUpload = lazy(() => import("./components/FileUpload2"));
const QuizAnswer = lazy(() => import("./components/QuizAnswer"));
const QuizAnswerSanganer = lazy(() =>
  import("./components/QuizAnswerSanganer")
);
const AppBar = lazy(() => import("./components/common/AppBar"));
const Books = lazy(() => import("./components/Books"));
const Footer = lazy(() => import("./components/common/Footer"));

const PageNotFound = lazy(() => import("./components/PageNotFound"));
const ExamInstruction = lazy(() => import("./components/ExamInstruction"));
const Search = lazy(() => import("./components/Search"));
const Bhajan = lazy(() => import("./components/Bhajan"));

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
  // useEffect(() => {
  //   ReactGA.initialize("UA-165998646-2");
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, []);
  return (
    <div className={classes.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <AppBar />
        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route path="/oldquizresults" component={OldQuiz} />
          <Route path="/childrenquiz" component={ChildrenQuiz} />
          <Route
            path="/datemonthchildquiz/:date"
            component={QuizFormchildren}
          />
          <Route
            path="/quizresultchildren/:date"
            component={QuizResultchildren}
          />
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
          <Route
            path="/childrenresponse/:id/:date"
            component={childrenUserResponse}
          />

          <Route path="/kbclogin" component={KbcLoginPage} />
          <Route path="/kbc" component={KbcContainer} />
          <Route path="/kbcallresult" component={KbcAllResult} />
          <Route path="/kbcinstruction" component={KbcInstruction} />
          <Route path="/fileupload" component={FileUpload} />
          <Route path="/books" component={Books} />
          <Route path="/search" component={Search} />
          <Route component={PageNotFound} />
        </Switch>

        <Footer />
        <ToastContainer autoClose={3000} hideProgressBar />
      </Suspense>
    </div>
  );
}

export default App;
