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
import TableRow from "@material-ui/core/TableRow";
import { links } from "../Config";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  tableheading: {
    // width: "%",
    position: "fixed",
    top: 148,
    left: "28%",
    bottom: "6%"
  },
  backButton: {
    backgroundColor: "#1976d2"
  },
  totalCount: {
    position: "relative",
    top: 0,
    marginLeft: "0%",
    fontSize: 24,
    fontWeight: 600
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
    maxHeight: "78%",
    // position: "fixed",
    left: "19%"
  },
  tablecolumns: {
    background: "blue"
  },
  tableTime: {
    minWidth: 27,
    backgroundColor: "#e9ecef"
  },
  tablePName: {
    minWidth: 200,
    backgroundColor: "#e9ecef"
  },
  tableCity: {
    minWidth: 60,
    backgroundColor: "#e9ecef"
  },
  tableScore: {
    minWidth: 170,
    backgroundColor: "#e9ecef"
  },
  [theme.breakpoints.down("1124")]: {
    tableheading: {
      top: 6,    
      left: 0,
      right: 0,
      paddingRight: 0,
      position: "relative",
      paddingBottom: "9%"
    },
    container: {
      left: 0,
      maxHeight: "70%"
    },
    totalCount: {
        top: 0,
        marginLeft: "1%",
        fontSize: 19,
        fontWeight: 600
      },
    tableTime: {
      fontSize: 15,
      borderRight: "1px solid",
      borderLeft: "1px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      paddingLeft: 5,
      minWidth: 30
    },
    tablePName: {
      fontSize: 15,
      borderRight: "1px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      minWidth: 180,
      paddingLeft: 9
    },
    tableCity: {
      fontSize: 15,
      minWidth: 100,
      borderRight: "1px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      paddingLeft: 4,
      textAlign: "center"
    },
    tableScore: {
      fontSize: 15,
      minWidth: 50,
      borderRight: "4px solid",
      borderTop: "1px solid",
      paddingRight: 0,
      paddingLeft: 4
    },
    tableNameCell: {
      fontSize: 15,
      borderRight: "1px solid",
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      lineHeight: "21px"
    },
    tableCityCell: {
      fontSize: 15,
      borderRight: "1px solid",
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      lineHeight: "21px",
      textAlign: "-webkit-center"
    },
    tableScoreCell: {
      fontSize: 15,
      borderRight: "1px solid",
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10,
      paddingBottom: 10,
      lineHeight: "21px",
      borderRight: "4px solid"
    },
    tableTimeCell: {
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
    totalCount: {
        top: 0,
        marginLeft: "1%",
        fontSize: 16,
        fontWeight: 600
      }
  }
}));

export default function QuizResult1(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const dates = new Date();
  const day =
    new Date().getDate() > 9
      ? new Date().getDate()
      : "0" + new Date().getDate();
  const year = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const month = dates
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const presentDate = `${day}-${currentMonth}-${year}`;

  const date = props.match.params.date;
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const questionsArray = [];

    const date = props.match.params.date;
    fetch(links.backendURL +"usersresponse?allresult=true&date=" + `${date}`)
      .then(response => {
        return response.json();
      })
      .then(usersResponse => {

        usersResponse.sort(
            (a, b) =>
              moment(a.time, "DD:MM:YYYY HH:mm:ss") -
              moment(b.time, "DD:MM:YYYY HH:mm:ss")
          );
          setUsers(usersResponse);
        
        setLoading(false);
      })
      .catch(error => console.log("error is", error));
  }, []);


  return (
    <Paper className={classes.tableheading}>
      <Typography
        variant="h6"
        gutterBottom
        className={classes.headerBackButton}
      >
        <Link to={`/oldquizresults`}>
          <Button
            variant="contained"
            color="primary"
            className={classes.backButton}
          >
            <ArrowBackIosIcon className={classes.backArrow} />
            Go back
          </Button>
        </Link>

        <Link to={`/`}>
          <Button
            variant="contained"
            color="primary"
            className={classes.backButton}
          >
            <ArrowBackIosIcon className={classes.backArrow} />
            Go Home
          </Button>
        </Link>
      </Typography>
      <Typography className={classes.totalCount} color="textSecondary">
        Date: {date}
      </Typography>
      <Typography className={classes.totalCount} color="textSecondary">
        Total Number of participants: {users.length}
      </Typography>

      { !loading ? (
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            aria-label="sticky table"
            className={classes.tableHeader}
          >
            <TableHead className={classes.tablecolumns}>
              <TableRow>
                <TableCell key="name" className={classes.tableTime}>
                  Time
                </TableCell>
                <TableCell key="name" className={classes.tablePName}>
                Name of participant
                </TableCell>
                <TableCell key="code" className={classes.tableCity}>
                City
                </TableCell>
                <TableCell key="population" className={classes.tableScore}>
                score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row,index) => (
                
                  <TableRow>
                    <TableCell className={classes.tableTimeCell}>
                    {row.time}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.tableNameCell}
                    >
                      {row.fullname}
                    </TableCell>
                    <TableCell className={classes.tableCityCell}>
                      {row.city}
                    </TableCell>
                    <TableCell className={classes.tableScoreCell}>
                      {row.score}
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