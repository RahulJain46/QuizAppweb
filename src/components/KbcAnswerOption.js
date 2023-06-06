import React from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  buttonAnswer: {
    borderColor: "azure",
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
  radioCustomButton:{
    width: "40%"
  }
}));

function KbcAnswerOption(props) {
  const classes = new useStyles();
  return (
    <button className={classes.buttonAnswer} disabled={props.answer} onChange={props.onAnswerSelected}>
    <li className={classes.answerOption}>
      <input
        type="radio"
        className={classes.radioCustomButton}
        name="radioGroup"
        checked={props.answerContent === props.answer}
        id={props.answerContent}
        value={props.answerContent}
      />
      <label className={classes.radioCustomLabel} htmlFor={props.answerContent}>
        {props.answerContent}
      </label>
    </li>
    </button>
  );
}

export default KbcAnswerOption;
