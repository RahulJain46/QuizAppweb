import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  ishtopdeshButton: {
    backgroundColor: "#1c008dbf",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#323dc1"
    }
  },
  headerBackButton: {
    textAlign: "left",
    fontWeight: 600,
    textAlign: "center",
    fontSize: 23,
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#303f9f",
    },
  },
  topInstruction: {
    color: "#ac0b0b",
    marginBottom: 10,
    fontSize: 25,
  },
  formContainer: {
    textAlign: "center",
    marginTop: 18,
  },
  message: {
    marginBottom: 10,
    fontSize: 19,
    fontWeight: 500,
    textAlign: "left",
  },
  instruction: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%",
  },
  quizbutton: {
    display: "inline-block"
  },
  [theme.breakpoints.down("1123")]: {
    instruction: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%",
    },
    quizitems: {
      maxWidth: "100%",
      padding: "0px ! important",
      paddingTop: "10px ! important",
    },
    button: {
      padding: "11px 6px",
      width: 185,
    },
    form: {
      display: "inline-block",
    },
    formContainer: {
      textAlign: "center",
      marginTop: 18,
    },
    message: {
      marginBottom: 14,
      fontSize: 18,
      fontWeight: 500,
    },
  },
  [theme.breakpoints.down("361")]: {
    formContainer: {
      textAlign: "center",
      marginTop: 18,
    },
    message: {
      marginBottom: 14,
      fontSize: 16,
      fontWeight: 500,
    },
    topInstruction: {
      fontSize: 20,
    },
  },
}));

function Exams() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.instruction}>
 
      
        
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
            Go to Home
          </Button>
        </Link>
      </Typography>
      <Grid container spacing={3} className={classes.quizbutton}>
      <Grid item xs={12} className={classes.quizitems}>
          <Link to="/sanganer/09-06-2020">
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.ishtopdeshButton}>
                रत्न करंड श्रावकाचार Exam
              </Button>
            </Paper>
          </Link>
        </Grid>

        <Grid item xs={12} className={classes.quizitems}>
          <Link to="/examinstruction">
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.ishtopdeshButton}>
                Ishtopdesh Sanganer Exam
              </Button>
            </Paper>
          </Link>
        </Grid>
        <Grid item xs={12} className={classes.quizitems}>
          <Link to="/examlogin">
            <Paper className={classes.paper}>
              <Button variant="contained" className={classes.ishtopdeshButton}>
                Ishtopdesh Sanganer Answer & Result
              </Button>
            </Paper>
          </Link>
        </Grid>
        </Grid>
    </div>
  );
}

export default Exams;
