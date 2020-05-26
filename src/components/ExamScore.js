import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    width: 188,
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  topInstruction:{
    color: "#ac0b0b",
    marginBottom: 10,
    fontSize: 25,
    textAlign: "center"
  },
  formContainer: {
    textAlign: "center",
    marginTop: 18
  },
  message: {
    marginBottom: 10,
    fontSize: 19,
    fontWeight: 500,
    textAlign: "left"
  },
  instruction: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%"
  },
  [theme.breakpoints.down("1123")]: {
    instruction: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%"
    },
    quizitems: {
      maxWidth: "100%",
      padding: "0px ! important",
      paddingTop: "10px ! important"
    },
    button: {
      padding: "11px 6px",
      width: 185
    },
    form: {
      display: "inline-block"
    },
    formContainer: {
      textAlign: "center",
      marginTop: 18
    },
    message: {
      marginBottom: 14,
      fontSize: 18,
      fontWeight: 500
    }
  },
  [theme.breakpoints.down("361")]: {
    formContainer: {
      textAlign: "center",
      marginTop: 18
    },
    message: {
      marginBottom: 14,
      fontSize: 16,
      fontWeight: 500
    },
    topInstruction: {
      fontSize: 20
    }
  },
  [theme.breakpoints.down("410")]:
  { 
    quizitems: {
        marginLeft: "21%"
      },

  }
}));

function ExamScore(props) {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (

    
    <div className={classes.instruction}>
        <Grid container spacing={3}>
        <Grid item xs={6}  className={classes.quizitems}>
            <Link to="/">
              <Paper className={classes.paper}>
                <Button variant="contained" className={classes.button}>
                <ArrowBackIosIcon className={classes.backArrow} />
                  Go To Home
                </Button>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={6}  className={classes.quizitems}>
            <Link to="/oldquizresults">
              <Paper className={classes.paper}>
                <Button variant="contained" className={classes.button}>
                <ArrowBackIosIcon className={classes.backArrow} />
                  Go to Old Quiz
                </Button>
              </Paper>
            </Link>
          </Grid>
          </Grid>
      <Card className={classes.formContainer}>
        <CardContent className={classes.message}>
          <Typography className={classes.topInstruction}>
            Thank you for your response.
        
          </Typography>
          <Typography className={classes.topInstruction}>
            Your score is: {props.location.state.score}
          </Typography>
          
        </CardContent>
      </Card>
    </div>
  );
}

export default ExamScore;
