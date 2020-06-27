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
    left: "17%",
    bottom: "6%",
    right: "17%"
  },
  backButton: {
    backgroundColor: "#1976d2"
  },
  totalCount: {
    position: "relative",
    top: 0,
    marginLeft: "0%",
    fontSize: 28,
    fontWeight: 600,
    color: "#902024"
  },
  showdate: {
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
    backgroundColor: "#c1d4d9"
  },
  tablePName: {
    minWidth: 200,
    backgroundColor: "#c1d4d9"
  },
  tableCity: {
    minWidth: 60,
    backgroundColor: "#c1d4d9"
  },
  tableScore: {
    minWidth: 101,
    backgroundColor: "#c1d4d9"
  },
  tableSuggestion: {
    minWidth: 170,
    backgroundColor: "#c1d4d9"
  },
  scoreHighlight: {
    backgroundColor: "#46d117"
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
    showdate: {
      top: 0,
      marginLeft: "1%",
      fontSize: 19,
      fontWeight: 600
    },
    totalCount: {
      top: 0,
      marginLeft: "1%",
      fontSize: 26,
      fontWeight: 600,
      color: "#902024"
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
      borderRight: "1px solid",
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
      borderRight: "1px solid"
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
    showdate: {
      top: 0,
      marginLeft: "1%",
      fontSize: 16,
      fontWeight: 600
    },
    totalCount: {
      top: 0,
      marginLeft: "1%",
      fontSize: 21,
      color: "#902024",
      fontWeight: 600
    }
  }
}));

export default function KbcAllResult(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(links.backendURL + `kbcusersresponse`)
      .then(response => {
        debugger;
        return response.json();
      })
      .then(usersResponse => {
        debugger;
        usersResponse.sort((a, b) => b.score - a.score);
        setUsers(usersResponse);

        // setLoading(false);
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
        <Link to={`/`}>
          <Button
            variant="contained"
            color="primary"
            className={classes.backButton}
          >
            <ArrowBackIosIcon className={classes.backArrow} />
            Go To Home
          </Button>
        </Link>
      </Typography>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          aria-label="sticky table"
          className={classes.tableHeader}
        >
          <TableHead className={classes.tablecolumns}>
            <TableRow>
              <TableCell key="name" className={classes.tableTime}>
                Name
              </TableCell>
              <TableCell key="name" className={classes.tablePName}>
                City
              </TableCell>
              <TableCell key="code" className={classes.tableCity}>
                Score
              </TableCell>
              <TableCell key="population" className={classes.tableScore}>
                Time duration
              </TableCell>
              <TableCell key="population" className={classes.tableSuggestion}>
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length != 0
              ? users.map(row => {
                  return (
                    <TableRow>
                      <TableCell className={classes.tableTimeCell}>
                        {row.name}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.tableNameCell}
                      >
                        {row.city}
                      </TableCell>
                      <TableCell className={classes.tableCityCell}>
                        {row.score}
                      </TableCell>
                      <TableCell className={classes.tableScoreCell}>
                        {row.duration}
                      </TableCell>
                      <TableCell className={classes.tableScoreCell}>
                        {row.startingTime}
                      </TableCell>
                    </TableRow>
                  );
                })
              : ""}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
