import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  tableheading: {
    // width: "%",
    position: "fixed",
    top: 151,
    left: "19%",
    bottom: "9%"
  },
  container: {
    maxHeight: "100%",
    // position: "fixed",
    left: "19%"
  },
  tablecolumns: {
    background: "blue"
  }
});

export default function QuizAnswer1(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const questionsArray = [];
    const date = props.match.params.date;
    fetch(`https://samplecovide19s.herokuapp.com/data?date=${date}`)
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
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={classes.tablecolumns}>
            <TableRow>
              <TableCell
                key="name"
                style={{ minWidth: 60, backgroundColor: "#e9ecef" }}
              >
                NUMBER
              </TableCell>
              <TableCell
                key="name"
                style={{ minWidth: 200, backgroundColor: "#e9ecef" }}
              >
                QUESTIONS
              </TableCell>
              <TableCell
                key="code"
                style={{ minWidth: 60, backgroundColor: "#e9ecef" }}
              >
                ANSWER
              </TableCell>
              <TableCell
                key="population"
                style={{ minWidth: 170, backgroundColor: "#e9ecef" }}
              >
                REMARKS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map(answer => {
              return answer.map((row, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.question}
                  </TableCell>
                  <TableCell>{row.answer}</TableCell>
                  <TableCell>{row.remark}</TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
