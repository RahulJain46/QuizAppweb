import React, { Suspense, lazy } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import AppBar from "./components/common/AppBar";
import { LanguageProvider } from "./contexts/LanguageContext";
import DemoSwitcher from "./components/Home/DemoSwitcher";
import Design1 from "./components/Home/Design1";
import Design2 from "./components/Home/Design2";
import Design3 from "./components/Home/Design3";
import Design4 from "./components/Home/Design4";
import Design5 from "./components/Home/Design5";
import Design6 from "./components/Home/Design6";

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

const Books = lazy(() => import("./components/Books"));
const Footer = lazy(() => import("./components/common/Footer"));

const PageNotFound = lazy(() => import("./components/PageNotFound"));
const ExamInstruction = lazy(() => import("./components/ExamInstruction"));
const Search = lazy(() => import("./components/Search"));
const PracticeLibrary = lazy(() => import("./components/Library/PracticeLibrary"));
const ArchiveChat = lazy(() => import("./components/Chat/ArchiveChat"));
const Bhajan = lazy(() => import("./components/Bhajan"));
const QuizLogin = lazy(() => import("./components/QuizLogin"));

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down("1124")]: {
    container: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%",
    },
  },
}));

const SplashScreen = () => {
  return (
    <div>
      <img src="/splash.png" alt="Loading..." />
    </div>
  );
};

function App() {
  const classes = useStyles();
  const location = useLocation();
  const isPreview =
    location.pathname.startsWith("/v2") ||
    location.pathname.startsWith("/design");
  return (
    <LanguageProvider>
      <div
        className={classes.container}
        style={isPreview ? { maxWidth: "100%", margin: 0, padding: 0 } : {}}
      >
        <Suspense fallback={<SplashScreen />}>
          {!isPreview && <AppBar />}
          <DemoSwitcher />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/v2/library" component={PracticeLibrary} />
            <Route path="/v2/chat" component={ArchiveChat} />
            <Route path="/v2" component={Design1} />
            <Route path="/design1" component={Design1} />
            <Route path="/design2" component={Design2} />
            <Route path="/design3" component={Design3} />
            <Route path="/design4" component={Design4} />
            <Route path="/design5" component={Design5} />
            <Route path="/design6" component={Design6} />

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

          <Route path="/kbclogin/:child?" component={KbcLoginPage} />
          <Route path="/kbc" component={KbcContainer} />
          <Route path="/kbcallresult/:child?" component={KbcAllResult} />
          <Route path="/kbcinstruction" component={KbcInstruction} />
          <Route path="/fileupload" component={FileUpload} />
          <Route path="/books" component={Books} />
          <Route path="/search" component={Search} />
          <Route path="/quizlogin/:date?/:kbc?" component={QuizLogin} />
          <Route component={PageNotFound} />
            </Switch>

            {!isPreview && <Footer />}
            <ToastContainer autoClose={3000} hideProgressBar />
          </Suspense>
        </div>
      </LanguageProvider>
  );
}

export default App;
