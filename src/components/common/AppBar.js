import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import DesktopHeader from "./DesktopHeader";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appbar: {
    flexGrow: 1,
  },
  barheader: {
    backgroundColor: "#234f64",
  },
  loginButton: {
    padding: "0px 0px",
    minWidth: 54,
    paddingBottom: 2,
    paddingTop: 2,
  },
  login: {
    position: "absolute",
    right: 15,
    padding: 0,
  },
  barheading: {
    position: "absolute",
    right: 0,
    left: 0,
    textAlign: "center",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#ac7818",
    color: "#e9ecef",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    zIndex: 1,
  },
  title: {
    flexGrow: 1,
  },
  [theme.breakpoints.between("345", "xs")]: {
    barheading: {
      fontSize: 15,
      left: -17,
    },
    loginButton: {
      padding: "0px 0px",
      minWidth: 54,
      paddingBottom: 2,
      paddingTop: 2,
      fontSize: 12,
    },
    login: {
      position: "absolute",
      right: 15,
      padding: 0,
    },
    appbar: {
      marginRight: -9,
    },
  },
  [theme.breakpoints.down("345")]: {
    barheading: {
      fontSize: 15,
      left: -17,
    },
    loginButton: {
      padding: "0px 0px",
      minWidth: 54,
      paddingBottom: 2,
      paddingTop: 2,
      fontSize: 12,
    },
    login: {
      position: "absolute",
      right: 15,
      padding: 0,
    },
    appbar: {
      marginRight: -14,
    },
  },
}));

export default function appBar() {
  const classes = useStyles();
  const history = useHistory();
  const [width, setWidth] = useState(window.innerWidth);

  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleNavClose(nav) {
    history.push(`${nav}`);
    setAnchorEl(null);
  }
  return (
    <div className={classes.appbar}>
      {width > "1120" ? (
        <DesktopHeader />
      ) : (
        <React.Fragment>
          <AppBar position="static" className={classes.barheader}>
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                open={Boolean(anchorEl)}
                onClick={handleClick}
                aria-haspopup="true"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleNavClose("/");
                  }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleNavClose("/oldquizresults");
                  }}
                >
                  Old Quiz & Result
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleNavClose("/answerSheets");
                  }}
                >
                  Answer Sheets
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleNavClose("/examinstruction");
                  }}
                >
                  Ishtopdesh Sanganer Exam
                </MenuItem>
              </Menu>
              <Typography
                variant="h4"
                className={classes.barheading}
                gutterBottom
              >
                JINDARSHAN
              </Typography>
              {/* <Link className={classes.login} to={`/login`}>
                <Paper>
                  <Button className={classes.loginButton}>Login</Button>
                </Paper>
              </Link> */}
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
            "प्रच्छना स्वाध्याय" NEW QUIZ WILL BE UPLOADED DAILY BY 12:01 AM
          </Paper>
        </React.Fragment>
      )}
    </div>
  );
}
