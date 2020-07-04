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
        <Link to={`/oldquizresults`}>
          <Button
            variant="contained"
            color="primary"
            className={classes.backButton}
          >
            <ArrowBackIosIcon className={classes.backArrow} />
            Go Back
          </Button>
        </Link>
      </Typography>
      <Card className={classes.formContainer}>
        <CardContent className={classes.message}>
          <Typography className={classes.topInstruction}>
            दिनांक वॉर QUIZ के विषय
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 13.5.20 को लेश्या;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 14.5.20 को "छह ढाला" की दूसरी ढाल;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 15.5.20 को तीसरी ढाल ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 16.5.20को चौथी ढाल;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 17.5.20 को चौथी व पाँचवी ढाल ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 18.5.20 को छठवी ढाल;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 23.5.20 को "इष्टोपदेश" ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 24.5.20 को "रत्नकरंड श्रावकाचार" ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 25.5.20 को तत्वार्थ सूत्र जी का पहला अध्याय;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 26.5.20 को दूसरा अध्याय ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 27.5.20 को तीसरा अध्याय ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 28.5.20 को चौथा अध्याय;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 29.5.20 को पांचवा अध्याय ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 30.5.20 को छठवा अध्याय ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 31.5.20 को भी छठवा अध्याय ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 1.6.20 को सातवाँ अध्याय ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 2.6.20 को सातवाँ व् आठवां अध्याय ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 3.6.20 को नवमा अध्याय ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 4.6.20 को नवमा व् दशमा अध्याय ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 5.6.20 को “गुणस्थान”;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 6.6.20 को “मार्गणा” ;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 7.6.20 को “समुदघात”;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 8.6.20 को “ध्यान”;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 9.6.20 को “बारह भावना”;{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            दिनांक 10.6.20 को “कर्म”;{" "}
          </Typography>

          {/* <Typography className={classes.message}>
            {" "}
            🚩☀️online महाशिविर☀️{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            ✏️दिनांक 28मई से 18 जून तक प्रिय शिविरार्थियों आपको जानकर हर्ष होगा
            हमारे youtube चैनल का शुभारंभ हो चुका है आगामी लाइव क्लास एवं
            कक्षाओं के वीडियो आपको youtube पर उपलब्ध होंगे । जल्दी से आप हमारी
            लिंक पर जाकर चैनल को सबस्क्राइब करे। 👇👇👇👇👇
          </Typography>
          <a href="https://www.youtube.com/channel/UCVTT8B_U1Z4QHFDWMMzS1uA">
            Click here for Youtube Link
          </a>

          <Typography className={classes.message}>
            2️⃣ दिनांक 5 जून के बाद सभी क्लास की लिंक टेलीग्राम ग्रुप पर भेजी
            जाएगी क्योंकि अधिक ग्रुप होने से मोबाइल हेंग होने लगा हैं । 5 जून के
            बाद कोई भी लिंक व्हाट्सएप पर नही भेजी जाएगी । कृपया सभी हमारे
            टेलीग्राम ग्रुप से जुड़े। 👇👇👇👇
          </Typography>

          <a href="https://t.me/joinchat/O8ecMho6ieBUYL_4UhnEnw">
            Join the WhatsApp group
          </a>

          <Typography className={classes.message}>
            🚩🌟 सम्पर्क करें🌟🚩 🎤 शिविर संयोजक🎤 राहुल जी शास्त्री "मड्देवरा"
            +918949112691
          </Typography>

          <Typography className={classes.topInstruction}>
            ☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️☀️{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            🚩☀️online महाशिविर ☀️🚩{" "}
          </Typography>
          <Typography className={classes.message}>
            {" "}
            ✋आशीर्वाद - सन्तशिरोमणि आचार्य श्री विद्यासागर जी महामुनिराज
            प्रेरणा- मुनिश्री सुधासागर जी महाराज 📲दिनांक 28मई से 18 जून तक
            *हमारे विद्वानों के द्वारा 21 दिवशीय तृतीय महाशिविर का आयोजन चल रहा
            है, 6000 से अधिक लोग प्रतिदिन हमारी ज्ञान गंगा में डुबकी लगा रहे है।
            💥 सभी क्लास zoom मीटिंग एप पर लाइव पढ़ाई जायेगी💥 🙏🏼आप ग्रुप में
            जुड़िये एवं अपने परिचितों को भी जोड़िए 🖋️🖊️📚📚📚📚📚🖊️🖋️
          </Typography>
          <Typography className={classes.message}>
            1️⃣ बालबोध भाग -1⏰(सुबह 8:30 से 9:15)
          </Typography>

          <a href="https://chat.whatsapp.com/GiNz3eTissQ4YQlREtqwL5">
            Join the WhatsApp group
          </a>

          <Typography className={classes.message}>
            2️⃣ बालबोध भाग-2 ⏰(शाम 6:30 से 7:15)
          </Typography>

          <a href="https://chat.whatsapp.com/Foak7aRTcafHJiYeQ4W6cZ">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            3️⃣श्री इष्टोपदेश जी ⏰(शाम 7:30 से 8:15)
          </Typography>

          <a href="https://chat.whatsapp.com/Fl3KxtqIvXG56XdsxSXnE0">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            4️⃣द्रव्यसंग्रह जी ⏰(रात्रि 9:00 से 9:45)
          </Typography>

          <a href="https://chat.whatsapp.com/KxjpFvHSTxPBzCmHC5aWzy">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            5️⃣रत्नकरंडक श्रावकाचार ⏰ (दोप. 3:00 से 3:45)
          </Typography>

          <a href="https://chat.whatsapp.com/DGE5hr5yrlp5S2fd8I3IZS">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            6️⃣ छहढाला ⏰(रात्रि 8:00 से 8:40)
          </Typography>

          <a href="https://chat.whatsapp.com/FG2rmXRpIxWHJWP08i6mEL">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            7️⃣सामयिक पाठ ⏰ (दोप. 3:45 से 4:30)
          </Typography>

          <a href="https://chat.whatsapp.com/GnYaBwtWwnsEJue8cEGAxU">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            8️⃣पद्मनन्दि पंचविंशतिका ⏰(रात्रि 8:15 से 9:00)
          </Typography>

          <a href="https://chat.whatsapp.com/LSC6u7Gb7wMK6c4BXXAX64">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            9️⃣करणानुयोग ⏰ (शाम 7:30 से 8:10)
          </Typography>

          <a href="https://chat.whatsapp.com/HUxxZbWEbWNCdePJo48CsN">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            1️⃣0️⃣पद्मपुराण जी (जैन रामायण)⏰(शाम 8:00 से 8:30)
          </Typography>

          <a href="https://chat.whatsapp.com/LGoGfo8tGrX2NeOdChl1Kl">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            1️⃣1️⃣भक्तामर जी ⏰(रात्रि 9:00 से 9:40)
          </Typography>

          <a href="https://chat.whatsapp.com/Kpdqahd9iREKg4jXB5t851">
            Join the WhatsApp group
          </a>

          <Typography className={classes.message}>
            1️⃣2️⃣कल्याण मंदिर स्तोत्र⏰(शाम 7:30 se 8:10)
          </Typography>

          <a href="https://chat.whatsapp.com/E8DSxxbce7jAUxRbJa05Sb">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            1️⃣3️⃣तत्वार्थ सूत्र जी⏰ (शाम 7:00 से 7:45)
          </Typography>

          <a href="https://chat.whatsapp.com/BtrMXjmgW1WLLBVOEM2EjR">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            1️⃣4️⃣मेडिटेशन,अर्हमयोग (3 तारीख के बाद)
          </Typography>

          <a href="https://chat.whatsapp.com/CjIXkR3DR2DGTlqOfhz79h">
            Join the WhatsApp group
          </a>
          <Typography className={classes.message}>
            🏡मुख्य संयोजक🏡 🈴 श्री राहुल जी शास्त्री "मढ़देवरा"(झाँसी)
            📞+918949112691 📞+918005845769 📞+91 97857 67518
          </Typography> */}
        </CardContent>
      </Card>
    </div>
  );
}

export default QuizTopic;
