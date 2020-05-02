import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
  navlinks: {
    top: 18,
    position: "relative",
    height: 0
  },
  navheader: {
    position: "relative",
    padding: 30,
    color: "#f5f5f5",
    "&:hover": {
      color: "#b0bec5"
    }
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#ac7818"
  },
  header: {
    position: "fixed",
    width: "100%",
    zIndex: 1,
    left: 2
  },
  upperheader: {
    padding: theme.spacing(2),
    textAlign: "center",
    background: "#234f64",
    color: "#fafafa"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

const Header = () => {
  const classes = useStyles();
  const activeStyle = { color: "#4fc3f7" };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start"
        onClick={handleClick} className={classes.menuButton} color="inherit" aria-label="menu" >
        {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button> */}
        <<MenuIcon
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Home</MenuItem>
        <MenuItem onClick={handleClose}>Old Quiz & Result</MenuItem>
        <MenuItem onClick={handleClose}>Answer Sheets</MenuItem>
      </Menu>
          {/* <MenuIcon /> */}
   </IconButton>
        <Typography variant="h6" className={classes.title}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  </div>



    // <div className={classes.header}>
    //   <nav className={classes.navlinks}>
    //     <NavLink
    //       to="/"
    //       activeStyle={activeStyle}
    //       exact
    //       className={classes.navheader}
    //     >
    //       Home
    //     </NavLink>
    //     {" | "}
    //     <NavLink
    //       to="/oldquizresults"
    //       activeStyle={activeStyle}
    //       className={classes.navheader}
    //     >
    //       Old Quiz & Result
    //     </NavLink>
    //     {" | "}
    //     <NavLink
    //       to="/answerSheets"
    //       activeStyle={activeStyle}
    //       className={classes.navheader}
    //     >
    //       Answer Sheets
    //     </NavLink>
    //   </nav>
    //   <div className={classes.root}>
    //     <Grid container spacing={3}>
    //       <Grid item xs={12}>
    //         <Paper className={classes.upperheader}>
    //           <Typography variant="h4" gutterBottom>
    //             UJJAIN JAIN QUIZ PORTAL
    //           </Typography>
    //         </Paper>
    //         <Paper className={classes.paper}>
    //           प्रच्छना स्वाध्याय" NEW QUIZ WILL BE UPLOADED DAILY BY 10:00 AM
    //         </Paper>
    //       </Grid>
    //     </Grid>
    //   </div>
    // </div>
  );
};

export default Header;
