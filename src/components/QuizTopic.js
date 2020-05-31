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

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  headerBackButton: {
    textAlign: "left",
    fontWeight: 600,
    textAlign: "center",
    fontSize: 23
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
    fontSize: 25
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
  }
}));

function QuizTopic() {
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
      <Card className={classes.formContainer}>
        <CardContent className={classes.message}>

          <Typography className={classes.topInstruction}>
          दिनांक वॉर QUIZ  के विषय 
          </Typography>
          <Typography className={classes.message}>  दिनांक 13.5.20 को लेश्या;				  </Typography>
            <Typography className={classes.message}>  दिनांक 14.5.20 को "छह ढाला" की दूसरी ढाल;             </Typography>               
            <Typography className={classes.message}>  दिनांक 15.5.20 को तीसरी ढाल ;	          </Typography>
            <Typography className={classes.message}>  दिनांक 16.5.20को चौथी ढाल;                    </Typography>
            <Typography className={classes.message}>  दिनांक 17.5.20 को चौथी व पाँचवी ढाल ;	      </Typography>
            <Typography className={classes.message}>  दिनांक 18.5.20 को छठवी ढाल;            </Typography>
            <Typography className={classes.message}>  दिनांक 23.5.20 को "इष्टोपदेश" ;	          </Typography>
            <Typography className={classes.message}>  दिनांक 24.5.20 को "रत्नकरंड श्रावकाचार" ;       </Typography>
            <Typography className={classes.message}>  दिनांक 25.5.20 को तत्वार्थ सूत्र जी का पहला अध्याय;  </Typography>
            <Typography className={classes.message}>  दिनांक 26.5.20 को दूसरा अध्याय ;           </Typography>
            <Typography className={classes.message}>  दिनांक 27.5.20 को तीसरा अध्याय ;	          </Typography>
            <Typography className={classes.message}>  दिनांक 28.5.20 को चौथा अध्याय;            </Typography>
            <Typography className={classes.message}>  दिनांक 29.5.20 को पांचवा अध्याय ;          </Typography>
            <Typography className={classes.message}>  दिनांक 30.5.20 को छठवा अध्याय ;          </Typography>
            <Typography className={classes.message}>  दिनांक 31.5.20 को भी  छठवा अध्याय ;        </Typography>
            <Typography className={classes.message}>  दिनांक 1.6.20 को  सातवाँ अध्याय ;           </Typography>
            <Typography className={classes.message}>  दिनांक 2.6.20 को  सातवाँ व् आठवां अध्याय ;      </Typography>
            <Typography className={classes.message}>  दिनांक 3.6.20 को  नवमा अध्याय ;           </Typography>
            <Typography className={classes.message}>  दिनांक 4.6.20 को  नवमा व् दशमा अध्याय ;      </Typography>
            <Typography className={classes.message}>  दिनांक 5.6.20 को  गुणस्थान अध्याय ;         </Typography>
            <Typography className={classes.message}>  दिनांक 6.6.20 को  मार्गणा अध्याय ;          </Typography>
            <Typography className={classes.message}>  दिनांक 7.6.20 को  समुदघात अध्याय ;         </Typography>
            <Typography className={classes.message}>  दिनांक 8.6.20 को  ध्यान अध्याय ;           </Typography>


        </CardContent>
      </Card>
    </div>
  );
}

export default QuizTopic;