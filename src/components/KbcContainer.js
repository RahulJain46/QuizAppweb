import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import KbcQuestion from "./KbcQuestion.js";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CSSTransitionGroup } from 'react-transition-group';
import { Link } from "react-router-dom";
import { links } from "../../Config";
import { useForm } from "react-hook-form";



function KbcContainer() {
  const classes = useStyles();
  const date = new Date();


  return (
     <div className={classes.kbcContainer}>
       <div className={classes.kbcheader}>
         <h2>Jain KBC</h2>      
        </div>
      <KbcQuestion />
     </div>
    
  );
}

export default KbcContainer;
