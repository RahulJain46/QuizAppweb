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
  headerMessage: {
    fontWeight: 400,
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

function KbcLoginPage(props) {
  const classes = new useStyles();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [questions, setQuestions] = useState([]);
  const [questionsId, setQuestionsId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleButton, setToggleButton] = useState(false);
  const [submitButton, setSubmitBUtton] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = data => {
    setToggleButton(true);
    var myMap = new Map();
    for (const key in data) {
      myMap.set(key, data[key]);
    }
    const time = moment()
      .utc()
      .valueOf();
    const uuid = uuidv5(
      myMap
        .get("fullname")
        .trim()
        .toLowerCase() + myMap.get("mobile").trim(),
      uuidv5.DNS
    );
    let userResponseJson = {};
    userResponseJson["time"] = time;
    userResponseJson["userId"] = uuid;
    let usersJson = {};
    usersJson["fullname"] = myMap.get("fullname").trim();
    usersJson["city"] = myMap.get("city").trim();
    usersJson["mobile"] = myMap.get("mobile").trim();
    usersJson["address"] = myMap.get("address").trim();
    usersJson["userId"] = uuid;
    const userdetail = {
      fullname: usersJson["fullname"],
      city: usersJson["city"],
      mobile: usersJson["mobile"],
      startTime: time,
      userId: uuid
    };
    fetch(links.backendURL + "kbcusers?" + `&userId=${uuid}`)
      .then(response => {
        return response.json();
      })
      .then(count => {
        if (count > 0) {
          if (props.match.params.child) {
            const userdetailWithChild = Object.assign(userdetail, {
              child: true
            });
            history.push(`/kbc`, userdetailWithChild);
          } else {
            history.push(`/kbc`, userdetail);
          }
        } else {
          let userOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usersJson)
          };
          fetch(links.backendURL + "kbcusers", userOptions).then(response => {
            if (props.match.params.child) {
              const userdetailWithChild = Object.assign(userdetail, {
                child: true
              });
              history.push(`/kbc`, userdetailWithChild);
            } else {
              history.push(`/kbc`, userdetail);
            }
          });
        }
      })
      .catch(error => console.log("error is", error));
  };
  const reactStringReplace = require("react-string-replace");

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.headerDate}>
        कौन बनेगा धर्मज्ञ
      </Typography>
      <Card className={classes.container}>
        <CardContent>
          <form onSubmit={handleSubmit(data => onSubmit(data))}>
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
              defaultValue={
                props.location.state != undefined ? props.location.state : ""
              }
              placeholder="Mobile Number"
              name="mobile"
              type="tel"
              ref={register({
                required: true,
                pattern: "^-?[0-9]d*.?d*$"
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
            <label className={classes.label}>Address In Short</label>
            <input
              className={classes.input}
              placeholder="Address"
              name="address"
              ref={register({ required: true })}
            />
            <Button
              variant="contained"
              className={classes.button}
              type="submit"
              disabled={toggleButton}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default KbcLoginPage;
