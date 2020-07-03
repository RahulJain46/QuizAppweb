import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";

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
  topInstruction: {
    color: "#ac0b0b",
    marginBottom: 10,
    fontSize: 20
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
      fontSize: 17
    }
  }
}));

function ExamInstruction() {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.instruction}>
      <Card className={classes.formContainer}>
        <CardContent className={classes.message}>
          <Typography className={classes.topInstruction}>
            कृपया परीक्षा से सम्बंधित निम्नलिखित निर्देशों को ध्यान पूर्वक पढ़े
            एवं इनका पालन करे।
          </Typography>
          <Typography className={classes.message}>
            1. कुल प्रश्न 50 होंगे सभी प्रश्न करना अनिवार्य है।
          </Typography>
          <Typography className={classes.message}>
            2. प्रत्येक प्रश्न 2 नंबर का होगा।
          </Typography>
          <Typography className={classes.message}>
            3. प्रतियोगिता मैं प्रथम द्वितीय तृतीय स्थान उन्हें प्राप्त होगा जो
            सबसे पहले अपने पेपर को जमा करेंगे एवं उनके नंबर सबसे ज्यादा होने
            चाहिए।
          </Typography>
          <Typography className={classes.message}>
            4. कोई भी व्यक्ति परीक्षा समय किसी से भी बात नहीं करेगा जिनवाणी
            खोलकर नहीं देखेगा किसी से भी पूछेगा नहीं।
          </Typography>
          <Typography className={classes.message}>
            5. समय 50 मिनट का होगा।
          </Typography>
           <Typography className={classes.message}>
            6. एक प्रतियोगी को एक बार ही प्रथम विजेता के रूप में नाम प्रकाशित किया जावेगा पुनरावृत्ति पर उसके बाद सेकंड प्रतियोगी का नाम प्रकाशित किया जावेगा
          </Typography>

          <Grid className={classes.quizitems}>
            <Link to="/sanganer/26-05-2020">
              <Paper className={classes.paper}>
                <Button variant="contained" className={classes.button}>
                  START QUIZ
                </Button>
              </Paper>
            </Link>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExamInstruction;
