import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
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
    minHeight: 1000
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
    tableheading: {
      top: 6,
      left: 0,
      right: 0,
      paddingRight: 0,
      position: "relative"
    },
    container: {
      left: 0,
      maxHeight: "70%"
    },
    tableNumber: {
      fontSize: 15,
      borderRight: "1px solid",
      borderLeft: "1px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      paddingLeft: 5,
      minWidth: 200
    },
    tableQuestion: {
      fontSize: 15,
      borderRight: "1px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      minWidth: 80,
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
      minWidth: 100,
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
    }
  }
}));

export default function QuizAnswer1(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const date = props.match.params.date;
  const [loading, setLoading] = useState(true);

  const [answers, setAnswers] = useState([]);

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
                  भजन नाम
                </TableCell>
                <TableCell key="name" className={classes.tableQuestion}>
                  गायक
                </TableCell>
                <TableCell key="code" className={classes.tableAnswer}>
                  गीतकार
                </TableCell>
                <TableCell key="population" className={classes.tableRemarks}>
                  Link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {answers.map(answer => (
                <TableRow>
                  <TableCell className={classes.tableNumberCell}>
                    {answer.bhajanName}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.tableQuestionCell}
                  >
                    {answer.singer}
                  </TableCell>
                  <TableCell className={classes.tableAnswerCell}>
                    {answer.writer}
                  </TableCell>
                  <TableCell className={classes.tableRemarkCell}>
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
  );
}
