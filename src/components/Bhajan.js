import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import { useForm } from "react-hook-form";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { links } from "../Config";

const useStyles = makeStyles(theme => ({
  tableheading: {
    // width: "%",
    position: "fixed",
    top: 151,
    left: "4%",
    bottom: "9%",
    minHeight: 400
  },
  form: {
    display: "none"
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
  backButton: {
    backgroundColor: "#1976d2"
  },
  headerDate: {
    fontWeight: 600,
    textAlign: "center",
    fontSize: 23
  },
  headerBackButton: {
    textAlign: "left",
    fontWeight: 600,
    textAlign: "center",
    fontSize: 23
  },
  container: {
    maxHeight: "82%",
    // position: "fixed",
    left: "19%"
  },
  tablecolumns: {
    background: "blue"
  },
  tableNumber: {
    minWidth: 200,
    backgroundColor: "#e9ecef"
  },
  tableQuestion: {
    minWidth: 80,
    backgroundColor: "#e9ecef"
  },
  tableAnswer: {
    minWidth: 80,
    backgroundColor: "#e9ecef"
  },
  tableRemarks: {
    minWidth: 100,
    backgroundColor: "#e9ecef"
  },
  [theme.breakpoints.down("1124")]: {
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
    },
    tableheading: {
      top: 6,
      left: 0,
      right: 0,
      paddingRight: 0,
      position: "relative"
    },
    container: {
      left: 0,
      maxHeight: "70%",
      minHeight: 400
    },
    tableNumber: {
      fontSize: 15,
      borderRight: "1px solid",
      borderLeft: "1px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      paddingLeft: 5,
      minWidth: 100
    },
    tableQuestion: {
      fontSize: 15,
      borderRight: "1px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      minWidth: 200,
      paddingLeft: 9
    },
    tableAnswer: {
      fontSize: 15,
      minWidth: 80,
      borderRight: "1px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      paddingLeft: 4
    },
    tableRemarks: {
      fontSize: 15,
      minWidth: 80,
      borderRight: "4px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      paddingLeft: 4
    },
    tableQuestionCell: {
      fontSize: 15,
      borderRight: "1px solid",
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      lineHeight: "21px"
    },
    tableAnswerCell: {
      fontSize: 15,
      borderRight: "1px solid",
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      lineHeight: "21px",
      textAlign: "-webkit-center"
    },
    tableRemarkCell: {
      fontSize: 15,
      borderRight: "1px solid",
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      lineHeight: "21px",
      borderRight: "4px solid"
    },
    tableNumberCell: {
      fontSize: 15,
      borderRight: "1px solid",
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      lineHeight: "27px",
      borderLeft: "1px solid"
    },
    tableHeader: {
      marginLeft: 3
    },
    backButton: {
      backgroundColor: "#1976d2",
      padding: "3px 10px",
      fontSize: 11
    },
    backArrow: {
      fontSize: 15
    }
  },
  [theme.breakpoints.down("361")]: {
    container: {
      maxHeight: "70%"
    },
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

export default function QuizAnswer1(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [toggleButton, setToggleButton] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const date = props.match.params.date;
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, watch, errors } = useForm();
  const [answers, setAnswers] = useState([]);

  const onSubmit = data => {
    let userOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
    fetch(links.backendURL + "bhajanreactions", userOptions).then(response => {
      setToggleButton(true);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const questionsArray = [];
    fetch(links.backendURL + "bhajan")
      .then(answerJson => {
        return answerJson.json();
      })
      .then(answers => {
        answers.map(answer => {
          questionsArray.push(answer);
        });
        setAnswers(questionsArray);
        setLoading(false);
      });
  }, []);

  return (
    <React.Fragment>
      <Paper className={classes.tableheading}>
        {answers.length != 0 && !loading ? (
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              aria-label="sticky table"
              className={classes.tableHeader}
            >
              <TableHead className={classes.tablecolumns}>
                <TableRow>
                  <TableCell key="name" className={classes.tableNumber}>
                    Link
                  </TableCell>
                  <TableCell key="name" className={classes.tableQuestion}>
                    भजन नाम
                  </TableCell>
                  <TableCell key="code" className={classes.tableAnswer}>
                    गायक
                  </TableCell>
                  <TableCell key="population" className={classes.tableRemarks}>
                    गीतकार
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {answers.map(answer => (
                  <TableRow>
                    <TableCell className={classes.tableNumberCell}>
                      <Link
                        href={answer.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <label className={classes.helpLabel}>
                          Click here to listen
                        </label>
                      </Link>
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableQuestionCell}
                    >
                      {answer.bhajanName}
                    </TableCell>
                    <TableCell className={classes.tableAnswerCell}>
                      {answer.singer}
                    </TableCell>
                    <TableCell className={classes.tableRemarkCell}>
                      {answer.writer}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className={classes.loading}>
            <Fade
              in={loading}
              style={{
                transitionDelay: loading ? "800ms" : "0ms"
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          </div>
        )}
      </Paper>
      <Card className={classes.formContainer}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            {toggleButton === false ? (
              <React.Fragment>
                <label className={classes.message}>आपको यह भजन कैसे लगे</label>{" "}
                <label className={classes.comment}>Comment</label>
                <input
                  name="comment"
                  ref={register({
                    required: true
                  })}
                  className={classes.feedbackInput}
                />
                {errors.comment && (
                  <p className={classes.error}>Please enter your comment</p>
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
            ) : (
              <label className={classes.responseMessage}>
                Thanks for your comment.
              </label>
            )}
          </form>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
