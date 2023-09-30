import React from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  buttonAnswer: {
    borderColor: "azure",
    backgroundColor: "#89eddf59",
    width: "20%"
  },
  yesButton: {
   
    backgroundColor: "#78aadf",
    width: "20%"
  },
  noButton: {
   
    backgroundColor: "#89eddf59",
    width: "20%"
  },
  answerOption:{
    display: "flex",
    justifyContent: "space-around"
  },
  radioCustomLabel:{
    paddingTop:"7px"
  },
  // radioCustomButton:{
  //   width: "40%"
  // }
}));

function KbcAnswerOption(props) {
  const classes = new useStyles();
  const option = props.answerContent === "YES"  ?  classes.yesButton : classes.noButton
  return (
    <button className={option}>
    <li className={classes.answerOption}>
      <input
        type="radio"
        className={classes.radioCustomButton}
        name="radioGroup"
        checked={props.answerContent === props.answer}
        id={props.answerContent}
        value={props.answerContent}
        onChange={props.onAnswerSelected}
        disabled={props.answer}
      />
      <label className={classes.radioCustomLabel} htmlFor={props.answerContent}>
        {props.answerContent}
      </label>
    </li>
    </button>
  );
}

export default KbcAnswerOption;
