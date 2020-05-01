import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { v5 as uuidv5 } from "uuid";

import { useForm } from "react-hook-form/dist/react-hook-form.ie11";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles(theme => ({
  container: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    top: 176,
    position: "absolute",
    maxWidth: "45%",
    marginBottom: 75,
    left: "30%",
    width: "100%"
  },
  questionfields: {
    border: "1px solid #cfd8dc",
    boxShadow: "7px 5px #eeeeee",
    margin: 11,
    display: "block",
    "&:hover": {
      backgroundColor: "#fafafa"
    }
  },
  questionContent: {
    marginLeft: "-1%"
  },
  questionOption: {
    marginLeft: "3%"
  },
  input: {
    boxShadow: "7px 5px #eeeeee",
    display: "block",
    width: "97%",
    borderRadius: 4,
    border: "1px solid #bdbdbd",
    backgroundColor: "#e9ecef40",
    padding: "10px 15px",
    margin: 10,
    fontSize: 14
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
    fontFamily: "sans-serif"
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    marginLeft: 15,
    width: 123,
    marginTop: 13,
    height: 44,
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  }
}));

function QuizForm(props) {
  const classes = new useStyles();
  const history = useHistory();
  const { register, handleSubmit, watch, errors, control } = useForm();
  const [questions, setQuestions] = useState([]);
  const [questionsId, setQuestionsId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const questionsArray = [];
    const queastionsIdArray = [];
    const date = props.match.params.date;
    fetch(`https://samplecovide19s.herokuapp.com/data?date=${date}`)
      .then(questionsJosn => {
        return questionsJosn.json();
      })
      .then(questions => {
        questions.map(question => {
          queastionsIdArray.push(question.id);
          questionsArray.push(question.questions);
        });
        setQuestionsId(queastionsIdArray);
        setQuestions(questionsArray);
        setLoading(false);
      });
  }, []);

  const calcaulateScore = (rightAns, userAns) => {
    let score = 0;
    rightAns.map(answers => {
      answers.map(answer => {
        if (userAns.get(answer.question) === answer.answer) {
          score++;
        }
      });
    });
    return score;
  };

  const onSubmit = (data, ques, quesId) => {
    var myMap = new Map();
    for (const key in data) {
      myMap.set(key, data[key]);
    }
    const score = calcaulateScore(ques, myMap);
    const uuid = uuidv5(
      myMap.get("fullname") + myMap.get("mobile"),
      uuidv5.DNS
    );
    const date = props.match.params.date;
    const uuid1 = uuidv5(date, uuidv5.DNS);
    const time = new Date().toLocaleString();
    const userData = Object.assign(data, { id: uuid, score, time });
    let userResponseJson = {};
    let userAnswer = [];
    userAnswer.push(userData);
    userResponseJson.date = date;
    userResponseJson.userAnswer = userAnswer;
    userResponseJson.id = uuid1;
    let flag = false;
    let exists = false;
    fetch(`https://samplecovide19s.herokuapp.com/users/`)
      .then(response => {
        return response.json();
      })
      .then(usersJson => {
        if (usersJson.length != 0) {
          usersJson.map(userJson => {
            if (
              !(
                Object.keys(userJson).length === 0 &&
                userJson.constructor === Object
              )
            ) {
              if (userJson.date === date) {
                flag = true;
                userJson.userAnswer.map(user => {
                  if (user.id === uuid) {
                    exists = true;
                    return;
                  }
                });
              }
            }
          });
        }
        if (exists) {
          alert("user already exists");
          // break;
          return;
        } else {
          if (!flag) {
            let options = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userResponseJson)
            };
            fetch(`https://samplecovide19s.herokuapp.com/users/`, options).then(
              res => {
                alert("your score is : " + score);
                history.push(`/yourresponse/${uuid}/${date}`, userData);
              }
            );
            return;
          } else {
            fetch(`https://samplecovide19s.herokuapp.com/users/${uuid1}`)
              .then(userjson => {
                return userjson.json();
              })
              .then(user => {
                console.log(user);
                user.userAnswer.push(userData);
                return user;
              })
              .then(json => {
                console.log(json);
                let options = {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(json)
                };
                fetch(
                  `https://samplecovide19s.herokuapp.com/users/${uuid1}`,
                  options
                ).then(res => {
                  alert("your score is : " + score);
                  return history.push(
                    `/yourresponse/${uuid}/${date}`,
                    userData
                  );
                });
              });
          }
        }
      })
      .catch(error => console.log("error is", error));
  };

  return (
    <Card className={classes.container}>
      <CardContent>
        <form
          onSubmit={handleSubmit(data =>
            onSubmit(data, questions, questionsId)
          )}
        >
          <label className={classes.label}>Full Name</label>
          <input
            className={classes.input}
            placeholder="Full Name"
            name="fullname"
            ref={register({ required: true })}
          />
          <label className={classes.label}>CITY/TOWN/VILLAGE</label>
          <input
            className={classes.input}
            placeholder="City"
            name="city"
            ref={register({ required: true })}
          />
          <label className={classes.label}>Address In Short</label>
          <input
            className={classes.input}
            placeholder="Address"
            name="address"
            ref={register({ required: true })}
          />
          <label className={classes.label}>Mobile No.</label>
          <input
            className={classes.input}
            placeholder="Mobile Number"
            name="mobile"
            ref={register({ required: true })}
          />
          {questions.map(question => {
            return question.map((row, index) => (
              <Card className={classes.questionfields}>
                <CardContent>
                  <fieldset>
                    <fieldset className={classes.questionContent}>
                      <label className={classes.label}>
                        {index + 1}. {row.question}
                      </label>
                    </fieldset>
                    <fieldset className={classes.questionOption}>
                      <input
                        type="radio"
                        value="YES"
                        name={row.question}
                        ref={register({ required: true })}
                        label="YES"
                      />
                      <label>YES</label>
                    </fieldset>
                    <fieldset className={classes.questionOption}>
                      <input
                        type="radio"
                        value="NO"
                        name={row.question}
                        ref={register({ required: true })}
                      />
                      <label>NO</label>
                    </fieldset>
                  </fieldset>
                </CardContent>
              </Card>
            ));
          })}
          {errors.exampleRequired && <p>This field is required</p>}
          <Button variant="contained" className={classes.button} type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default QuizForm;
