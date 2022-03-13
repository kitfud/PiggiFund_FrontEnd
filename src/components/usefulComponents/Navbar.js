import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(5),
      display: "flex",
    },
    logo: {
      flexGrow: "1",
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: theme.spacing(20),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
    },
  }));

const Navbar =() => {

    const classes = useStyles();

  return (
      <>
         <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo} color="white">
          PiggiFund 
        </Typography>
      
          <div className={classes.navlinks} >
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/maker" className={classes.link}>
              Maker
            </Link>
            <Link to="/ui" className={classes.link} >
              UI
            </Link>      
          </div>      
      </Toolbar>
    </AppBar>
      
      </>
 
  );
}
export default Navbar;