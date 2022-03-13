import React,{useState,useEffect} from 'react'
import {  Box, 
    TextField, 
    Typography, 
    Card, 
    CardHeader,
    Button, 
    CircularProgress, 
    Snackbar,
    Alert,
    Link
} from "@mui/material"

const Withdraw = () => {
  return (
<Card sx={{marginBottom:5}}>
<Typography variant="h2" sx={{ fontSize: 15, fontWeight: 600, marginBottom:2 }} >Funded:</Typography>
<Button color="error" variant="contained"> Withdraw</Button>
</Card>
  
  )
}

export default Withdraw