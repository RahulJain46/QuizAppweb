import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Accordion } from "@material-ui/core";
import clsx from "clsx";
import Fade from "@material-ui/core/Fade";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { links } from "../Config";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  question: {
    paddingBottom: 17
  },
  option: {
    color: "currentcolor",
    backgroundColor: "antiquewhite"
  },
  optionAnswer: {
    color: "currentcolor",
    backgroundColor: "ivory"
  },
  loading: {
    position: "relative",
    top: 5,
    left: "47%"
  }
});

const Search = props => {
  const classes = new useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [limit, setLimit] = useState(1);
  const [skip, setSkip] = useState(2);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchUsers = (limit, skip) => {
    const questionsArray = [];
    // Make sure you send 'limit' and 'skip' as query parameters to your node.js server
    setLoading(true);
    fetch(links.backendURL + `questions?pageNo=${limit}&size=${skip}`)
      .then(questionsJosn => {
        return questionsJosn.json();
      })
      .then(questionsJson => {
        questionsJson.map(question => {
          questionsArray.push(question);
        });
        setQuestions(questionsArray);
        setLoading(false);
      });
  };

  useEffect(() => {
    // if (!isFetching) return;
    fetchUsers(limit, skip);
    window.scrollTo(0, 0);
  }, [limit, skip]);

  const nextPage = () => {
    setLimit(limit => limit + 1);
  };

  const previousPage = () => {
    setLimit(limit - 1);
  };

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      parseInt(document.documentElement.offsetHeight)
    )
      return;
    nextPage();
    // setIsFetching(true);
  }

  return (
    <div>
      <Card className={classes.root}>
        {questions.length != 0 && !loading ? (
          questions.map((datequestions, index) =>
            datequestions.questions.map((question, indexx) => (
              <React.Fragment>
                <CardContent>
                  <Typography className={classes.pos} color="textSecondary">
                    Question:
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {datequestions.date}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.question}
                  >
                    {question.question}
                  </Typography>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.option}
                    >
                      <Typography className={classes.heading}>
                        {'"Yes       Or        No"'}
                      </Typography>
                    </AccordionSummary>
                    <CardContent className={classes.optionAnswer}>
                      <Typography paragraph>
                        Answer : {question.answer}{" "}
                      </Typography>
                      {question.remarks != undefined &&
                      question.remarks.length > 0 ? (
                        <Typography paragraph>
                          Remark : {question.remarks}
                        </Typography>
                      ) : (
                        ""
                      )}
                      {question.hint != undefined &&
                      question.hint.length > 0 ? (
                        <Typography paragraph>
                          Link : {question.hint}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </CardContent>
                  </Accordion>
                </CardContent>
              </React.Fragment>
            ))
          )
        ) : (
          <div className={classes.loading}>
            <Fade
              in={loading}
              style={{
                transitionDelay: loading ? "0ms" : "0ms"
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Search;
