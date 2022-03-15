import React from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton
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
        <IconButton href="/">
        <Typography variant="h4" className={classes.logo} color="white">
          PiggiFund 
        </Typography>
        </IconButton>
      
      
          <div className={classes.navlinks} >
            <Link to="/" className={classes.link}>
              About
            </Link>
            <Link to="/maker" className={classes.link}>
              Maker
            </Link>
            <Link to="/ui" className={classes.link} >
              UI
            </Link> 
            <Link to="/contracts" className={classes.link} >
              Contracts
            </Link>       
          </div>      
      </Toolbar>
    </AppBar>
      
      </>
 
  );
}
export default Navbar;