import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import { v5 as uuidv5 } from "uuid";
import { links } from "../Config";
import moment from "moment";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  error: {
    color: "#bf1650",
    "&::before": {
      content: "'⚠ '"
    }
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  form: {
    display: "inline-block"
  },
  feedbackButton: {
    backgroundColor: "#1976d2",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  mobileInput: {
    display: "block",
    left: 0,
    right: 0,
    margin: "0 auto",
    marginBottom: 10,
    boxShadow: "4px 4px #eeeeee"
  },
  feedbackInput: {
    left: 0,
    right: 0,
    margin: "0 auto",
    marginBottom: 17,
    paddingBottom: 0,
    marginBottom: 17,
    boxShadow: "4px 4px #eeeeee"
  },
  formContainer: {
    textAlign: "center",
    marginTop: 18
  },
  message: {
    marginBottom: 14,
    fontSize: 16,
    fontWeight: 500
  },
  responseMessage: {
    color: "#d34242"
  },
  comment: {
    display: "block",
    textAlign: "center"
  },
  submitButton: {
    textAlign: "center"
  },
  mobilenumber: {
    textAlign: "center",
    display: "block"
  },
  home: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%"
  },
  quizResultButton: {
    backgroundColor: "#aa1050e3",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#610c2b"
    }
  },
  [theme.breakpoints.down("1123")]: {
    home: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%"
    },
    quizbutton: {
      display: "inline-block"
    },
    quizitems: {
      maxWidth: "100%",
      padding: "0px ! important",
      paddingTop: "10px ! important"
    },
    feedbackButton: {
      padding: "4px 6px",
      width: 111
    },
    button: {
      padding: "4px 6px",
      width: 185
    },
    form: {
      display: "inline-block"
    },
    mobileInput: {
      display: "block",
      left: 0,
      right: 0,
      margin: "0 auto",
      marginBottom: 10,
      boxShadow: "4px 4px #eeeeee"
    },
    feedbackInput: {
      left: 0,
      right: 0,
      margin: "0 auto",
      marginBottom: 17,
      paddingBottom: 0,
      marginBottom: 17,
      boxShadow: "4px 4px #eeeeee"
    },
    formContainer: {
      textAlign: "center",
      marginTop: 18
    },
    message: {
      marginBottom: 14,
      fontSize: 16,
      fontWeight: 500
    },
    responseMessage: {
      color: "#d34242"
    },
    comment: {
      display: "block",
      textAlign: "center"
    },
    submitButton: {
      textAlign: "center"
    },
    mobilenumber: {
      textAlign: "center",
      display: "block"
    }
  },
  [theme.breakpoints.down("361")]: {
    form: {
      display: "inline-block"
    },
    mobileInput: {
      display: "block",
      marginBottom: 10,
      boxShadow: "4px 4px #eeeeee"
    },
    feedbackInput: {
      paddingBottom: 0,
      marginBottom: 17,
      boxShadow: "4px 4px #eeeeee"
    },
    formContainer: {
      textAlign: "center",
      marginTop: 18
    },
    message: {
      marginBottom: 14,
      fontSize: 16,
      fontWeight: 500
    },
    comment: {
      display: "block",
      marginLeft: -33
    },
    submitButton: {
      textAlign: "center"
    }
  }
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [userResponse, setUserResponse] = useState(true);
  const [userName, setUserNsme] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = data => {
    let fullName = data.fullname;
    setUserNsme(fullName);
    let mobileNumber = data.mobilenumber;
    let userdetail = {
      fullName
    };
    const uuid = uuidv5(
      fullName.trim().toLowerCase() + mobileNumber.trim(),
      uuidv5.DNS
    );

    fetch(links.backendURL + "users?login=true&userId=" + uuid)
      .then(response => {
        return response.json();
      })
      .then(dates => {
        if (dates.loginResponse != undefined && dates.loginResponse == false) {
          setUserResponse(false);
        } else {
          history.push(`/responsedates/${uuid}`, dates);
        }
        setLoading(false);
        setToggleButton(true);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.home}>
      <Card className={classes.formContainer}>
        {toggleButton === false && userResponse != false ? (
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <label className={classes.message}>
                Login and see your response
              </label>
              <React.Fragment>
                {" "}
                <div>
                  <label className={classes.mobilenumber}>Mobile Number</label>
                  <input
                    name="mobilenumber"
                    ref={register({
                      required: true,
                      pattern: /^\d*$/,
                      minLength: 10,
                      maxLength: 10
                    })}
                    className={classes.mobileInput}
                  />
                  {errors.mobilenumber && (
                    <p className={classes.error}>
                      Please enter 10 digit number
                    </p>
                  )}
                </div>
                <label className={classes.comment}>Full Name</label>
                <input
                  name="fullname"
                  ref={register({
                    required: true
                  })}
                  className={classes.feedbackInput}
                />
                {errors.comment && (
                  <p className={classes.error}>Please enter your Name</p>
                )}
                <div className={classes.submitButton}>
                  <Button
                    variant="contained"
                    className={classes.feedbackButton}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </React.Fragment>
            </form>
          </CardContent>
        ) : (
          <Typography variant="h6" gutterBottom className={classes.headerDate}>
            We don't have your reponse {userName}, Please attend the Quiz .
          </Typography>
        )}
      </Card>
    </div>
  );
}

export default Login;
