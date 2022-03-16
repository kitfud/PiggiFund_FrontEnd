import React, {useState,useEffect} from 'react'
import WalletConnect from './usefulComponents/WalletConnect';
import {  Box, TextField, Typography, Card, Button, Grid} from "@mui/material"
import InteractPiggiFund from './InteractPiggiFund';
import { useLocation,useNavigate } from "react-router-dom";

const PiggyFundUI = ({piggiFundAddress,abi}) => {

const navigate = useNavigate()

const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState(null);
const [contract, setContract] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [walletBalance, setWalletBalance] = useState(null);
const [mostrecentcontract, setMostRecentContract] = useState(null)
const [addresspassed, setAddressPassed] = useState(null)

const {state} = useLocation();

useEffect(()=>{
if (state){
  setAddressPassed(state)
}

},[state])

useEffect(()=>{
  window.history.replaceState({}, document.title)
return()=>{
  setAddressPassed(null)
}
},[])

useEffect(()=>{
console.log("Parent Component-PiggiFundUI-detecting wallet balance state change from child component.")
},[walletBalance])

const ViewContractAddress = ()=>{
  return(<>
    <Typography sx={{ fontSize: 20, fontWeight: 600}} component="h2">You Selected Contract:</Typography>
    <Typography>{addresspassed}</Typography>
  </> 
  )
}

  return (
    <>
   
    <Card variant="outlined">
    <Grid container direction="column" alignItems="center" justify="center">
    <Box sx={{display:'block', width:'auto'}}>
    <Typography color="primary" component="h1" sx={{ fontSize: 20, fontWeight: 600, padding: 2}}>PiggiFund UI:</Typography>

    {
      addresspassed && !defaultAccount ? <ViewContractAddress/>: null
    }



    <WalletConnect
   addresspassed = {addresspassed} 
   mostrecentcontract={mostrecentcontract} 
   defaultAccount={defaultAccount} 
   setDefaultAccount={setDefaultAccount} 
   walletBalance = {walletBalance} 
   setWalletBalance={setWalletBalance} 
   address={piggiFundAddress} 
   abi={abi} 
   setProvider = {setProvider} 
   setSigner = {setSigner} 
   setContract = {setContract} 
   provider = {provider}
   contract={contract}/>

   {addresspassed && !defaultAccount?  
    <Button
    onClick={()=>navigate('/contracts')}
    sx={{marginBottom:2}} 
    variant="contained" 
    color="error">Back to Contracts</Button>: null}

   {signer ? <InteractPiggiFund
   addresspassed ={addresspassed} 
   walletBalance = {walletBalance}
   setWalletBalance={setWalletBalance} 
   defaultAccount={defaultAccount} 
   provider={provider} 
   contract={contract} 
   signer={signer} />:null}
   </Box>
    </Grid>
    </Card>
   
  
    </>
  )
}

export default PiggyFundUI