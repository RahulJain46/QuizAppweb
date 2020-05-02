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

const useStyles = makeStyles(theme => ({
  appbar: {
    flexGrow: 1
  },
  barheader: {
    backgroundColor: "#234f64"
  },
  barheading: {
    position: "absolute",
    right: 0,
    left: 0,
    textAlign: "center",
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#ac7818",
    color: "#e9ecef"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    zIndex: 1
  },
  title: {
    flexGrow: 1
  }
}));

export default function appBar() {
  const classes = useStyles();
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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleNavClose(nav) {
    window.location.href = nav;
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
              </Menu>
              <Typography
                variant="h4"
                className={classes.barheading}
                gutterBottom
              >
                UJJAIN JAIN QUIZ PORTAL
              </Typography>
            </Toolbar>
          </AppBar>
          <Paper className={classes.paper}>
            प्रच्छना स्वाध्याय" NEW QUIZ WILL BE UPLOADED DAILY BY 10:00 AM
          </Paper>
        </React.Fragment>
      )}
    </div>
  );
}
