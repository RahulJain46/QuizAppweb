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
    bottom: "9%"
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
    minWidth: 27,
    backgroundColor: "#e9ecef"
  },
  tableQuestion: {
    minWidth: 200,
    backgroundColor: "#e9ecef"
  },
  tableAnswer: {
    minWidth: 60,
    backgroundColor: "#e9ecef"
  },
  tableRemarks: {
    minWidth: 170,
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
      minWidth: 30
    },
    tableQuestion: {
      fontSize: 15,
      borderRight: "1px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      minWidth: 300,
      paddingLeft: 9
    },
    tableAnswer: {
      fontSize: 15,
      minWidth: 53,
      borderRight: "1px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      paddingLeft: 4
    },
    tableRemarks: {
      fontSize: 15,
      minWidth: 300,
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

export default function QuizAnswerSanganer(props) {
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
    const date = "26-05-2020";
    fetch(links.backendURL + "examquestions?date=" + `${date}`)
      .then(answerJson => {
        return answerJson.json();
      })
      .then(answers => {
        answers.map(answer => {
          questionsArray.push(answer.questions);
        });
        setAnswers(questionsArray);
        setLoading(false);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.tableheading}>
      <Typography
        variant="h6"
        gutterBottom
        className={classes.headerBackButton}
      >
        <Link to={`/`}>
          <Button
            variant="contained"
            color="primary"
            className={classes.backButton}
          >
            <ArrowBackIosIcon className={classes.backArrow} />
            Go back to Homes
          </Button>
        </Link>
      </Typography>

      <Typography variant="h6" gutterBottom className={classes.headerDate}>
        Date: {date}
      </Typography>
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
                  No.
                </TableCell>
                <TableCell key="name" className={classes.tableQuestion}>
                  QUESTIONS
                </TableCell>
                <TableCell key="code" className={classes.tableAnswer}>
                  ANSWER
                </TableCell>
                <TableCell key="population" className={classes.tableRemarks}>
                  REMARKS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {answers.map(answer => {
                return answer.map((row, index) => (
                  <TableRow>
                    <TableCell className={classes.tableNumberCell}>
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableQuestionCell}
                    >
                      {row.question}
                    </TableCell>
                    <TableCell className={classes.tableAnswerCell}>
                      {row[row.answer]}
                    </TableCell>
                    <TableCell className={classes.tableRemarkCell}>
                      {row.remarks}
                    </TableCell>
                  </TableRow>
                ));
              })}
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
