import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    IconButton
  } from '@mui/material'
  import SavingsIcon from '@mui/icons-material/Savings';

const Footer = () => {
  return (
    <AppBar position="static" color="primary">
    <Container maxWidth="md">
      <Toolbar>
      <IconButton href="/">
       <SavingsIcon/>
        </IconButton>
        <Typography variant="body1" color="inherit">
          &copy; 2022 Kit Fuderich
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
  )
}

export default Footer