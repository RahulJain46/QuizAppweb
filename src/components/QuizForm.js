import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { v5 as uuidv5 } from "uuid";
import { links } from "../Config";

import { useForm } from "react-hook-form/dist/react-hook-form.ie11";
import { useHistory } from "react-router-dom";
import WbIncandescentSharpIcon from "@material-ui/icons/WbIncandescentSharp";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import red from "@material-ui/core/colors/red";
const error = red[700];

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
  headerDate: {
    fontWeight: 600,
    textAlign: "center",
    fontSize: 23
  },
  loading: {
    position: "relative",
    top: 227,
    left: "47%"
  },
  helpLink: {
    marginLeft: "2%",
    fontSize: 17,
    textAlign: "right",
    paddingBottom: 24
  },
  helpLabel: {
    fontSize: 17
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
  },
  error: {
    color: "#bf1650",
    "&::before": {
      content: "'⚠ '"
    }
  },
  asteriskField: {
    marginLeft: 24,
    color: error
  },
  radioButton: {
    height: 12,
    marginRight: 13
  },
  optionLabel: {
    width: "100%"
  },
  [theme.breakpoints.down("361")]: {
    container: {
      maxWidth: "100%",
      top: 176,
      marginBottom: "22%",
      left: "0%"
    },
    input: {
      width: "100%",
      margin: 0,
      fontSize: 17,
      padding: "8px 8px",
      boxShadow: "3px 3px #eeeeee"
    },
    label: {
      marginBottom: 2,
      marginTop: 4,
      fontSize: 19,
      marginLeft: 8
    },
    asteriskField: {
      fontSize: 19,
      marginLeft: "4%"
    },
    questionfields: {
      boxShadow: "3px 3px #eeeeee",
      margin: 6
    },
    questionContent: {
      marginLeft: "0%",
      maxWidth: "100%"
    },
    questionOption: {
      marginLeft: "3%",
      fontSize: 18
    },
    radioButton: {
      height: 16
    },
    questionLabel: {
      fontSize: 19
    },

    button: {
      width: 102,
      marginTop: 8,
      marginLeft: 7,
      height: 44,
      fontSize: 19
    },
    error: {
      fontSize: 9
    },
    optionLabel: {
      paddingLeft: 8
    },
    helpLabel: {
      fontSize: 19
    },
    helpLink: {
      marginLeft: "6%",
      fontSize: 19,
      paddingBottom: 24
    }
  },

  [theme.breakpoints.between("361", "xs")]: {
    container: {
      maxWidth: "100%",
      top: 176,
      marginBottom: "22%",
      left: "0%"
    },
    helpLink: {
      marginLeft: "6%",
      fontSize: 19,
      paddingBottom: 24
    },
    input: {
      width: "100%",
      margin: 0,
      fontSize: 21,
      padding: "5px 8px",
      boxShadow: "4px 4px #eeeeee"
    },
    label: {
      marginBottom: 3,
      marginTop: 3,
      fontSize: 22,
      marginLeft: 8
    },
    asteriskField: {
      fontSize: 21,
      marginLeft: "4%"
    },
    questionfields: {
      boxShadow: "4px 3px #eeeeee",
      margin: 7
    },
    questionContent: {
      marginLeft: "0%",
      maxWidth: "100%"
    },
    questionOption: {
      marginLeft: "3%",
      fontSize: 21
    },
    radioButton: {
      height: 18
    },
    questionLabel: {
      fontSize: 22
    },
    button: {
      width: 107,
      marginTop: 7,
      marginLeft: 8,
      height: 46,
      fontSize: 21
    },
    error: {
      fontSize: 20
    },
    optionLabel: {
      paddingLeft: 8
    },
    helpLabel: {
      fontSize: 19
    }
  }
}));

function QuizForm(props) {
  const classes = new useStyles();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    setError
  } = useForm();
  const [questions, setQuestions] = useState([]);
  const [questionsId, setQuestionsId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleButton, setToggleButton] = useState(false);
  const [submitButton, setSubmitBUtton] = useState(false);
  let result = "";
  const date = props.match.params.date;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const questionsArray = [];
    const queastionsIdArray = [];
    const date = props.match.params.date;
    fetch(links.backendURL + "questions?date=" + `${date}`)
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

  const calcaulateScore = (rightAns, userAns, usersResponse) => {
    let score = 0;
    let usersArray = [];
    rightAns.map(answers => {
      answers.map(answer => {
        let usersJson = {};
        usersJson["question"] = answer.question;
        usersJson["answer"] = userAns.get(answer.question);
        usersJson["_id"] = uuidv5(answer.question, uuidv5.DNS);
        if (
          userAns.get(answer.question).toLowerCase() ===
          answer.answer.toLowerCase()
        ) {
          score++;
        }
        usersArray.push(usersJson);
      });
    });
    usersResponse["score"] = score * 2;
    usersResponse["answers"] = usersArray;
    return usersResponse;
  };
  const patchUserResponse = (
    userresponse,
    detailedUserResponse,
    uuid,
    date,
    score
  ) => {
    let userOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userresponse)
    };
    console.log(
      links.backendURL + "usersresponse?" + `date=${date}` + `&update=true`
    );
    fetch(
      links.backendURL + "usersresponse?" + `date=${date}` + `&update=true`,
      userOptions
    )
      .then(response => {
        console.log(response.status);
        alert("your score is : " + score);
        history.push(`/yourresponse/${uuid}/${date}`, detailedUserResponse);
      })
      .catch(error => console.log("error is", error));
  };

  const onSubmit = (data, ques, quesId) => {
    setToggleButton(true);
    var myMap = new Map();
    for (const key in data) {
      myMap.set(key, data[key]);
    }
    const time = moment().format("DD:MM:YYYY HH:mm:ss");
    const uuid = uuidv5(
      myMap
        .get("fullname")
        .trim()
        .toLowerCase() + myMap.get("mobile").trim(),
      uuidv5.DNS
    );
    let userResponseJson = {};
    userResponseJson["time"] = time;
    userResponseJson["comment"] = "";
    userResponseJson["userId"] = uuid;
    userResponseJson["feedback"] = myMap.get("feedback");
    userResponseJson["suggestion"] = myMap.get("suggestion").trim();
    userResponseJson = calcaulateScore(ques, myMap, userResponseJson);
    const date = props.match.params.date;
    let usersJson = {};
    usersJson["fullname"] = myMap.get("fullname").trim();
    usersJson["city"] = myMap.get("city").trim();
    usersJson["mobile"] = myMap.get("mobile").trim();
    usersJson["address"] = myMap.get("address").trim();
    usersJson["userId"] = uuid;
    const userData = Object.assign(data, {
      id: uuid,
      score: userResponseJson["score"],
      time
    });
    fetch(links.backendURL + "users?" + `&userId=${uuid}`)
      .then(response => {
        return response.json();
      })
      .then(count => {
        if (count > 0) {
          fetch(
            links.backendURL +
              "usersresponse?" +
              `date=${date}` +
              `&userId=${uuid}`
          )
            .then(response => {
              return response.json();
            })
            .then(userexists => {
              if (userexists) {
                alert(
                  "आपके द्वारा आज का QUIZ पूर्व में SUBMIT किया जा चुका है"
                );
                setSubmitBUtton(true);
                setToggleButton(false);
                return;
              } else {
                patchUserResponse(
                  userResponseJson,
                  userData,
                  uuid,
                  date,
                  userResponseJson["score"]
                );
              }
            });
        } else {
          let userOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usersJson)
          };
          fetch(links.backendURL + "users", userOptions).then(response => {
            patchUserResponse(
              userResponseJson,
              userData,
              uuid,
              date,
              userResponseJson["score"]
            );
          });
        }
      })
      .catch(error => console.log("error is", error));
  };
  const reactStringReplace = require("react-string-replace");

  return (
    <React.Fragment>
      {questions.length != 0 && !loading ? (
        <Card className={classes.container}>
          <CardContent>
            <form
              onSubmit={handleSubmit(data =>
                onSubmit(data, questions, questionsId)
              )}
            >
              <Typography
                variant="h6"
                gutterBottom
                className={classes.headerDate}
              >
                Date: {date}
              </Typography>
              <Typography
                variant="h9"
                component="h9"
                className={classes.asteriskField}
              >
                * Required field
              </Typography>

              <label className={classes.label}>
                {reactStringReplace(
                  "Mobile No. *",
                  new RegExp(/(\*)/g),
                  (match, i) => (
                    <span key={i} style={{ color: error }}>
                      {" "}
                      {match}{" "}
                    </span>
                  )
                )}
              </label>
              <input
                className={classes.input}
                placeholder="Mobile Number"
                name="mobile"
                ref={register({
                  required: true,
                  pattern: /^\d*$/
                })}
              />
              {errors.mobile && (
                <p className={classes.error}>Please enter 10 digit number</p>
              )}
              <label className={classes.label}>
                {reactStringReplace(
                  "Full Name *",
                  new RegExp(/(\*)/g),
                  (match, i) => (
                    <span key={i} style={{ color: error }}>
                      {" "}
                      {match}{" "}
                    </span>
                  )
                )}
              </label>
              <input
                className={classes.input}
                placeholder="Full Name"
                name="fullname"
                ref={register({ required: true, maxLength: 22 })}
              />
              {errors.fullname && (
                <p className={classes.error}> This field is required</p>
              )}
              <label className={classes.label}>
                {reactStringReplace(
                  "City/Town/Village *",
                  new RegExp(/(\*)/g),
                  (match, i) => (
                    <span key={i} style={{ color: error }}>
                      {" "}
                      {match}{" "}
                    </span>
                  )
                )}
              </label>
              <input
                className={classes.input}
                placeholder="City"
                name="city"
                ref={register({ required: true, maxLength: 22 })}
              />
              {errors.city && (
                <p className={classes.error}>This field is required</p>
              )}
              <label className={classes.label}>
                {reactStringReplace(
                  "Address In Short *",
                  new RegExp(/(\*)/g),
                  (match, i) => (
                    <span key={i} style={{ color: error }}>
                      {" "}
                      {match}{" "}
                    </span>
                  )
                )}
              </label>
              <input
                className={classes.input}
                placeholder="Address"
                name="address"
                ref={register({ required: true })}
              />
              {errors.address && (
                <p className={classes.error}>This field is required</p>
              )}

              {questions.map(question => {
                return question.map((row, index) => (
                  <Card className={classes.questionfields}>
                    <CardContent>
                      <fieldset>
                        <fieldset className={classes.questionContent}>
                          <label className={classes.questionLabel}>
                            {index + 1}. {row.question}
                            {reactStringReplace(
                              "*",
                              new RegExp(/(\*)/g),
                              (match, i) => (
                                <span key={i} style={{ color: error }}>
                                  {" "}
                                  {match}{" "}
                                </span>
                              )
                            )}
                          </label>
                        </fieldset>
                        {row.hint != undefined &&
                        row.aws != undefined &&
                        row.hint.length > 0 ? (
                          <fieldset className={classes.helpLink}>
                            <Link
                              href={
                                `https://jindarshan.s3.amazonaws.com/` +
                                row.hint +
                                `.jpg`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <label className={classes.helpLabel}>
                                Click here for help <WbIncandescentSharpIcon />
                              </label>
                            </Link>
                          </fieldset>
                        ) : (
                          ""
                        )}
                        {row.hint != undefined &&
                        row.aws === undefined &&
                        row.hint.length > 0 ? (
                          <fieldset className={classes.helpLink}>
                            <Link
                              href={row.hint}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <label className={classes.helpLabel}>
                                Click here for help <WbIncandescentSharpIcon />
                              </label>
                            </Link>
                          </fieldset>
                        ) : (
                          ""
                        )}

                        <fieldset className={classes.questionOption}>
                          <label className={classes.optionLabel}>
                            <input
                              type="radio"
                              className={classes.radioButton}
                              value="YES"
                              name={row.question}
                              ref={register({ required: true })}
                              label="YES"
                            />
                            YES
                          </label>
                        </fieldset>
                        <fieldset className={classes.questionOption}>
                          <label className={classes.optionLabel}>
                            <input
                              type="radio"
                              className={classes.radioButton}
                              value="NO"
                              name={row.question}
                              ref={register({ required: true })}
                            />
                            NO
                          </label>
                        </fieldset>
                        {errors[row.question] && (
                          <p className={classes.error}>
                            This field is required
                          </p>
                        )}
                      </fieldset>
                    </CardContent>
                  </Card>
                ));
              })}

              <Card className={classes.questionfields}>
                <CardContent>
                  <fieldset className={classes.questionContent}>
                    <label className={classes.label}>
                      {reactStringReplace(
                        "आपको यह क्विज एप्लिकेशन कैसी लगी।  *",
                        new RegExp(/(\*)/g),
                        (match, i) => (
                          <span key={i} style={{ color: error }}>
                            {" "}
                            {match}{" "}
                          </span>
                        )
                      )}
                    </label>
                  </fieldset>

                  <fieldset className={classes.questionOption}>
                    <label className={classes.optionLabel}>
                      <input
                        type="radio"
                        className={classes.radioButton}
                        value="उत्कृष्ट"
                        name="feedback"
                        ref={register({ required: true })}
                      />
                      उत्कृष्ट
                    </label>
                  </fieldset>

                  <fieldset className={classes.questionOption}>
                    <label className={classes.optionLabel}>
                      <input
                        type="radio"
                        className={classes.radioButton}
                        value="बहुत अच्छी"
                        name="feedback"
                        ref={register({ required: true })}
                      />
                      बहुत अच्छी
                    </label>
                  </fieldset>

                  <fieldset className={classes.questionOption}>
                    <label className={classes.optionLabel}>
                      <input
                        type="radio"
                        className={classes.radioButton}
                        value="अच्छी"
                        name="feedback"
                        ref={register({ required: true })}
                      />
                      अच्छी
                    </label>
                  </fieldset>

                  <fieldset className={classes.questionOption}>
                    <label className={classes.optionLabel}>
                      <input
                        type="radio"
                        className={classes.radioButton}
                        value="औसत"
                        name="feedback"
                        ref={register({ required: true })}
                      />
                      औसत
                    </label>
                  </fieldset>
                  {errors["feedback"] && (
                    <p className={classes.error}>This field is required</p>
                  )}
                </CardContent>
              </Card>
              <label className={classes.label}>टिप / सुझाव</label>
              <input
                className={classes.input}
                placeholder="Your answer"
                name="suggestion"
                ref={register({ required: false })}
              />
              <Button
                variant="contained"
                className={classes.button}
                type="submit"
                disabled={toggleButton}
              >
                Submit
              </Button>
              {submitButton == true ? (
                <Typography
                  variant="h9"
                  component="h9"
                  className={classes.asteriskField}
                >
                  आपके द्वारा आज का QUIZ पूर्व में SUBMIT किया जा चुका है
                </Typography>
              ) : (
                ""
              )}
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className={classes.loading}>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? "0ms" : "0ms"
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </div>
      )}
    </React.Fragment>
  );
}

export default QuizForm;
