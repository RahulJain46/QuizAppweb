import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import { links } from "../Config";
import moment from "moment";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  answers: {
    flexGrow: 1,
    marginTop: 150,
    position: "absolute",
    marginBottom: 73,
    left: "25%",
    right: "25%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  backButton: {
    backgroundColor: "#1976d2"
  },
  loading: {
    position: "absolute",
    left: "40%",
    top: "40%"
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#303f9f"
    }
  },
  [theme.breakpoints.down("1105")]: {
    answers: {
      width: "100%",
      left: "0%",
      right: "0%",
      top: "0%"
    },
    answerButton: {
      minWidth: "100%",
      maxWidth: "100%",
      padding: "1px ! important"
    },
    answerbuttons: {
      display: "inlineBlock"
    },
    answersHeading: {
      fontSize: 22
    },
    answerbuttonsItem: {
      padding: 1,
      padding: "1px ! important"
    },
    button: {
      padding: "4px 6px",
      width: 185
    },
    backButton: {
      backgroundColor: "#1976d2",
      padding: "3px 10px",
      fontSize: 11
    },
    backArrow: {
      fontSize: 15
    }
  }
}));

function QuizAnswers() {
  const classes = useStyles();
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [allDates, setAllDates] = useState([]);
  const date = new Date();
  const day =
    new Date().getDate() > 9
      ? new Date().getDate()
      : "0" + new Date().getDate();
  const month = date
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const presentDate = `${day}-${month}`;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to fetch all dates initially
  const fetchAllDates = async () => {
    try {
      let userOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };
      
      const response = await fetch(
        links.backendURL + "questions?" + "date=1&date=all&date=allDates",
        userOptions
      );
      const questions = await response.json();
      
      const dateArray = [];
      questions.forEach((question) => {
        let quesdate = question.date;
        const today = moment(presentDate, "DD-MM-YYYY");
        const someday = moment(quesdate, "DD-MM-YYYY");
        if (someday < today) {
          dateArray.push(quesdate);
        }
      });
      
      // Sort dates in descending order (newest first)
      dateArray.sort(
        (a, b) => moment(b, "DD-MM-YYYY") - moment(a, "DD-MM-YYYY")
      );
      
      setAllDates(dateArray);
      // Initially load first 20 dates
      const initialDates = dateArray.slice(0, 20);
      setDates(initialDates);
      setHasMore(dateArray.length > 20);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dates:", error);
      setLoading(false);
    }
  };

  // Function to load more dates
  const loadMoreDates = useCallback(() => {
    if (loadingMore || !hasMore) return;
    
    console.log("Loading more dates... Current page:", page, "Has more:", hasMore, "All dates length:", allDates.length);
    setLoadingMore(true);
    
    // Simulate loading delay (you can remove this if not needed)
    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = nextPage * 20;
      const endIndex = startIndex + 20;
      const moreDates = allDates.slice(startIndex, endIndex);
      
      console.log("Next page:", nextPage, "Start index:", startIndex, "End index:", endIndex, "More dates:", moreDates.length);
      
      if (moreDates.length > 0) {
        setDates(prevDates => [...prevDates, ...moreDates]);
        setPage(nextPage);
        setHasMore(endIndex < allDates.length);
      } else {
        setHasMore(false);
      }
      
      setLoadingMore(false);
    }, 500);
  }, [loadingMore, hasMore, page, allDates]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled near the bottom (within 100px)
      const threshold = 100;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      
      console.log("Scroll event:", {
        scrollTop,
        windowHeight,
        documentHeight,
        isNearBottom: scrollTop + windowHeight >= documentHeight - threshold,
        loadingMore,
        hasMore
      });
      
      if (scrollTop + windowHeight >= documentHeight - threshold) {
        if (!loadingMore && hasMore) {
          console.log("Triggering loadMoreDates");
          loadMoreDates();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreDates, loadingMore, hasMore]);

  useEffect(() => {
    fetchAllDates();
  }, []);

  return (
    <div className={classes.answers}>
      <Grid container spacing={3} className={classes.answerbuttons}>
        <Grid item xs={12} className={classes.answerbuttonsItem}>
          <Paper className={classes.paper}>
            <Typography
              variant="h4"
              gutterBottom
              className={classes.answersHeading}
            >
              ANSWER SHEETS
            </Typography>
            <Link to={`/`}>
              <Button
                variant="contained"
                color="primary"
                className={classes.backButton}
              >
                <ArrowBackIosIcon className={classes.backArrow} />
                Go to home
              </Button>
            </Link>
          </Paper>
        </Grid>
        {dates.length !== 0 && !loading ? (
          dates.map((date, index) => (
            <Grid item xs={6} className={classes.answerButton} key={`${date}-${index}`}>
              <Link to={`/answersheet` + `/${date}`}>
                <Paper className={classes.paper}>
                  <Button variant="contained" className={classes.button}>
                    {moment(date, "DD-MM-YYYY").format("DD-MMM-YYYY")}
                  </Button>
                </Paper>
              </Link>
            </Grid>
          ))
        ) : (
          <div className={classes.loading}>
            <Fade
              in={loading}
              style={{
                transitionDelay: loading ? "800ms" : "0ms"
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          </div>
        )}
        
        {/* Loading indicator for pagination */}
        {loadingMore && (
          <Grid item xs={12} style={{ textAlign: 'center', padding: '20px' }}>
            <CircularProgress size={30} />
            <Typography variant="body2" style={{ marginTop: '10px', color: '#666' }}>
              Loading more answer sheets...
            </Typography>
          </Grid>
        )}
        
        {/* End of data indicator */}
        {!hasMore && dates.length > 0 && !loading && (
          <Grid item xs={12} style={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="body2" style={{ color: '#666' }}>
              No more answer sheets to load
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default QuizAnswers;
