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
    },
    headingName: {
      color: "black",
      alignItems: "center",
      textAlign: "center",
      fontSize: 36
    },
    topInstruction: {
      alignItems: "center",
      textAlign: "center"
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
          <Typography className={classes.headingName}>
            कौन बनेगा धर्मज्ञ
          </Typography>
          <Typography className={classes.topInstruction}>नियमावली</Typography>
          <Typography className={classes.message}>
            1. प्रत्येक प्रश्न 5000 अंक का होगा।
          </Typography>
          <Typography className={classes.message}>
            2. अधिकतम 20 प्रश्न होंगे व् अधिकतम एक लाख का स्कोर होगा।
          </Typography>
          <Typography className={classes.message}>
            3. समय की कोई सीमा नहीं है।
          </Typography>
          <Typography className={classes.message}>
            4. सहायता के लिए आप हेल्प लाइन "FLIP THE QUESTION" का एक बार प्रयोग
            कर आप प्राप्त प्रश्न को बदल सकते है।
          </Typography>
          <Typography className={classes.message}>
            5. किसी भी प्रश्न का गलत उत्तर देने पर प्रतियोगिता समाप्त हो जावेगी
            व् आपका अंतिम स्कोर प्रदर्शित हो जावेगा। आप अन्य प्रतियोगियों की
            तुलना में अपना वरीयता क्रम देख सकेंगे।
          </Typography>
          <Typography className={classes.message}>
            6. एक ही प्रतियोगी चाहे जितनी बार यह गेम खेल सकता है, हर बार नए
            प्रश्न प्राप्त होंगे।
          </Typography>
          <Typography className={classes.message}>
            7. एक प्रतियोगी का एक बार ही प्रथम विजेता के रूप में नाम प्रकाशित किया जावेगा, पुनरावृत्ति पर उसके बाद सेकंड प्रतियोगी का नाम प्रकाशित किया जावेगा।
          </Typography>


          <Grid className={classes.quizitems}>
            <Link to="/kbclogin">
              <Paper className={classes.paper}>
                <Button variant="contained" className={classes.button}>
                  START
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
