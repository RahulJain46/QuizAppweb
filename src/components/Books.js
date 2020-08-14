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
                  Book Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.tableNumberCell}>
                  <Link
                    href="https://www.scribd.com/embeds/213822054/content?start_page=1&amp;view_mode=scroll&amp;access_key=key-dx2vbaciur0r0djsb9y"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <label className={classes.helpLabel}>
                      Click here to Read
                    </label>
                  </Link>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableQuestionCell}
                >
                  संक्षिप्त जैन आदिनाथ पुराण Download करने हेतु यहां क्लिक करें।
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableNumberCell}>
                  <Link
                    href="https://jindarshan1.s3.ap-south-1.amazonaws.com/2015.538826.Shri-Mahaveer+(1)-rotated.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <label className={classes.helpLabel}>
                      Click here to Read
                    </label>
                  </Link>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableQuestionCell}
                >
                  संक्षिप्त जैन महावीर पुराण Download करने हेतु यहां क्लिक करें।
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableNumberCell}>
                  <Link
                    href="https://jindarshan.s3.amazonaws.com/Dhanyakumar_Charitra.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <label className={classes.helpLabel}>
                      Click here to Read
                    </label>
                  </Link>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.tableQuestionCell}
                >
                  संक्षिप्त जैन Dhanyakumar Charitra(धन्यकुमार चरित्र ) Download
                  करने हेतु यहां क्लिक करें।
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
}
