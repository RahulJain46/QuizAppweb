import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { v5 as uuidv5 } from "uuid";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";

import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import { links } from "../Config";

const error = red[700];
const success = green[700];

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    top: 176,
    position: "absolute",
    maxWidth: "45%",
    marginBottom: 75,
    left: "30%",
    width: "100%",
  },
  questionfields: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    margin: 11,
    display: "block",
  },
  input: {
    boxShadow: "3px 5px #eeeeee",
    display: "block",
    width: "100%",
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    opacity: 1,
    border: "1px solid #bdbdbd",
    padding: "10px 15px",
    margin: 10,
    fontSize: 14,
    fontWeight: "500",
  },
  label: {
    lineHeight: 2,
    textAlign: "left",
    display: "block",
    marginBottom: 13,
    marginTop: 20,
    fontSize: 19,
    color: "black",
    fontWeight: 500,
    marginLeft: 14,
    fontFamily: "sans-serif",
  },
  questionContent: {
    lineHeight: 2,
    textAlign: "left",
    display: "block",
    marginBottom: 13,
    marginTop: 20,
    fontSize: 19,
    color: "black",
    fontWeight: 500,
    marginLeft: 14,
    fontFamily: "sans-serif",
  },
  lastButton: {
    backgroundColor: "#1976d2",
    color: "#fff",
    marginLeft: 15,
    width: 140,
    marginTop: 13,
    height: 44,
    "&:hover": {
      backgroundColor: "#303f9f",
    },
  },
  kbdButton: {
    backgroundColor: "#077214",
    color: "#fff",
    marginLeft: 15,
    width: 140,
    marginTop: 13,
    height: 44,
    "&:hover": {
      backgroundColor: "#303f9f",
    },
  },
  kbdTop: {
    backgroundColor: "#077214",
    color: "#fff",
    marginLeft: 15,
    width: 140,
    marginTop: 13,
    height: 44,
    "&:hover": {
      backgroundColor: "#303f9f",
    },
  },
  paper: {
    textAlign: "center",
    padding: 12,
  },
  kbcpaper: {
    textAlign: "center",
    padding: 12,
  },
  correct: {
    marginLeft: 24,
    color: success,
  },
  incorrect: {
    marginLeft: 24,
    color: error,
  },
  scoreCard: {
    color: "#902024",
    fontWeight: 600,
    fontSize: 34,
  },
  timeCard: {
    fontSize: 24,
  },
  [theme.breakpoints.down("361")]: {
    scoreCard: {
      color: "#902024",
      fontWeight: 600,
      fontSize: 30,
    },
    buttons: {
      paddingLeft: 9,
      paddingRight: 10,
    },
    timeCard: {
      fontSize: 24,
    },
    container: {
      maxWidth: "100%",
      top: 176,
      marginBottom: "22%",
      left: "0%",
    },
    label: {
      marginBottom: 2,
      marginTop: 4,
      fontSize: 19,
      marginLeft: 8,
    },
    input: {
      width: "100%",
      margin: 0,
      fontSize: 17,
      padding: "8px 8px",
      boxShadow: "3px 3px #eeeeee",
      fontWeight: "500",
      opacity: 1,
    },
    correct: {
      color: success,
      fontSize: 17,
      margin: 8,
    },
    incorrect: {
      color: error,
      fontSize: 17,
      margin: 8,
    },
    questionContent: {
      marginBottom: 5,
      fontSize: 19,
      marginLeft: 8,
      fontWeight: "initial",
    },
    lastButton: {
      width: "105%",
      marginTop: 0,
      marginLeft: 0,
      height: 45,
      fontSize: 14,
      padding: 1,
      lineHeight: 1,
    },
    kbdButton: {
      width: "105%",
      marginTop: 0,
      marginLeft: 0,
      height: 45,
      fontSize: 14,
      padding: 1,
      lineHeight: 1,
    },
    kbdTop: {
      width: "105%",
      marginTop: 0,
      marginLeft: 0,
      height: 45,
      fontSize: 21,
      padding: 1,
      lineHeight: 1,
    },
    kbdButtonTop: {
      paddingLeft: "16%",
    },
    kbdContainerButton: {
      maxWidth: "1000%",
      flexBasis: "82%",
    },
    paper: {
      padding: 1,
      marginBottom: 8,
    },
    kbcpaper: {
      padding: 1,
      marginBottom: 8,
      marginTop: 16,
    },
  },
  [theme.breakpoints.between("361", "xs")]: {
    scoreCard: {
      color: "#902024",
      fontWeight: 600,
      fontSize: 30,
    },
    buttons: {
      paddingLeft: 9,
      paddingRight: 10,
    },
    kbdButtonTop: {
      paddingLeft: "16%",
    },
    kbdContainerButton: {
      maxWidth: "1000%",
      flexBasis: "80%",
    },
    timeCard: {
      fontSize: 24,
    },
    container: {
      maxWidth: "100%",
      top: 176,
      marginBottom: "22%",
      left: "0%",
    },
    label: {
      marginBottom: 2,
      marginTop: 4,
      fontSize: 22,
      marginLeft: 8,
    },
    input: {
      width: "100%",
      margin: 0,
      fontSize: 21,
      padding: "8px 8px",
      boxShadow: "3px 3px #eeeeee",
      fontWeight: "500",
      opacity: 1,
    },
    correct: {
      color: success,
      fontSize: 19,
      margin: 8,
    },
    incorrect: {
      color: error,
      fontSize: 19,
      margin: 8,
    },
    questionContent: {
      marginBottom: 5,
      fontSize: 22,
      marginLeft: 8,
      fontWeight: "initial",
    },
    lastButton: {
      width: "105%",
      marginTop: 0,
      marginLeft: 0,
      height: 55,
      fontSize: 13,
      padding: 5,
      lineHeight: 1,
    },
    kbdButton: {
      width: "105%",
      marginTop: 0,
      marginLeft: 0,
      height: 55,
      fontSize: 13,
      padding: 5,
      lineHeight: 1,
      backgroundColor: "#077214",
    },
    kbdTop: {
      width: "105%",
      marginTop: 0,
      marginLeft: 0,
      height: 55,
      fontSize: 23,
      padding: 5,
      lineHeight: 1,
      backgroundColor: "#077214",
    },
    paper: {
      padding: 1,
      marginBottom: 8,
    },
  },
}));

function UserResponse(props) {
  const classes = new useStyles();
  const history = useHistory();
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [questions, setQuestions] = useState([]);
  const [questionsId, setQuestionsId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allquestions, setAllQuestions] = useState([]);
  const [allquestionsMap, setAllQuestionsMap] = useState(new Map());
  const date = props.match.params.date;
  const playKBD = () => {
    const uuid = uuidv5(
      props.location.state.fullname + props.location.state.mobile,
      uuidv5.DNS
    );
    const usersJson = {
      fullname: props.location.state.fullname,
      city: props.location.state.city,
      mobile: props.location.state.mobile,
      address: props.location.state.address,
      userId: uuid,
    };
    let userOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usersJson),
    };
    fetch(links.backendURL + "kbcusers", userOptions).then((response) => {
      history.push(`/kbc`, usersJson);
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const questionsArray = [];
    const queastionsIdArray = [];
    const date = props.match.params.date;
    fetch(links.backendURL + "questions?date=" + `${date}`)
      .then((questionsJosn) => {
        return questionsJosn.json();
      })
      .then((questions) => {
        // questions.map(question => {
        //   queastionsIdArray.push(question.id);
        //   questionsArray.push(question.questions);
        // });
        questionsArray.push(questions.questions);
        var myMap = new Map();
        questionsArray[0].map((el) => {
          myMap.set(el.question, { answer: el.answer, remarks: el.remarks });
        });
        setAllQuestionsMap(myMap);
        // setQuestionsId(queastionsIdArray);
        setAllQuestions(questionsArray);
        setLoading(false);
      });
  }, []);

  return (
    <Card className={classes.container}>
      <Grid container spacing={3} className={classes.kbdButtonTop}>
        <Grid item xs={4} className={classes.kbdContainerButton}>
          <Paper className={classes.paper}>
            <Button
              variant="contained"
              className={classes.kbdTop}
              onClick={() => playKBD()}
            >
              Play KBD
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <CardContent>
        <form>
          <div>
            <Typography
              variant="h4"
              component="h4"
              className={classes.scoreCard}
            >
              Your Score : {props.location.state["score"]}
            </Typography>
            <Typography
              variant="h4"
              component="h4"
              className={classes.timeCard}
            >
              Time : {props.location.state["time"]}
            </Typography>
          </div>
          {allquestions.length != 0 &&
            Object.keys(props.location.state).map((items, index) => (
              <div>
                {items === "fullname" ? (
                  <label className={classes.label}>Full Name</label>
                ) : items === "city" ? (
                  <label className={classes.label}>City</label>
                ) : items === "address" ? (
                  <label className={classes.label}>Address</label>
                ) : items === "mobile" ? (
                  <label className={classes.label}>Mobile</label>
                ) : items === "id" ||
                  items === "score" ||
                  items === "time" ||
                  items === "feedback" ||
                  items === "suggestion" ||
                  items === "classsuggestion" ||
                  items === "classcount" ||
                  items === "classattendance" ? (
                  ""
                ) : (
                  <label className={classes.questionContent}>
                    {index - 3}. {items}
                  </label>
                )}
                {items != "id" &&
                items != "score" &&
                items != "time" &&
                items != "feedback" &&
                items != "suggestion" &&
                items != "classsuggestion" &&
                items != "classcount" &&
                items != "classattendance" ? (
                  <input
                    className={classes.input}
                    placeholder={props.location.state[items]}
                    name="fullname"
                    ref={register}
                    disabled={true}
                  />
                ) : (
                  ""
                )}
                {items != "fullname" &&
                items != "city" &&
                items != "address" &&
                items != "mobile" &&
                items != "id" &&
                items != "score" &&
                items != "time" &&
                items != "feedback" &&
                items != "suggestion" &&
                items != "classsuggestion" &&
                items != "classcount" &&
                items != "classattendance" ? (
                  <React.Fragment>
                    <Typography
                      variant="h6"
                      component="h6"
                      className={
                        props.location.state[items].toLowerCase() ===
                        allquestionsMap.get(items).answer.toLowerCase()
                          ? classes.correct
                          : classes.incorrect
                      }
                    >
                      {props.location.state[items].toLowerCase() ===
                      allquestionsMap.get(items).answer.toLowerCase()
                        ? "आपका उत्तर सही है|"
                        : "आपका उत्तर गलत है|"}
                    </Typography>
                    {allquestionsMap.get(items).remarks != undefined &&
                    allquestionsMap.get(items).remarks.length != 0 ? (
                      <Typography
                        variant="h6"
                        component="h6"
                        className={
                          props.location.state[items].toLowerCase() ===
                          allquestionsMap.get(items).answer.toLowerCase()
                            ? classes.correct
                            : classes.incorrect
                        }
                      >
                        Remark: {allquestionsMap.get(items).remarks}
                      </Typography>
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
            ))}
        </form>
      </CardContent>
      <Grid container spacing={3} className={classes.buttons}>
        <Grid item xs={4}>
          <Link to={`/`}>
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.lastButton}>
                Home
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Link to={`/quizresult/${date}`}>
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.lastButton}>
                View Results
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Button
              variant="contained"
              className={classes.kbdButton}
              onClick={() => playKBD()}
            >
              Play KBD
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Card>
  );
}

export default UserResponse;
