import React, {useState} from 'react'
import FactoryABI from "../chain-info/abi.json"
import WalletConnect from './usefulComponents/WalletConnect';
import {  Box, TextField, Typography, Card, Button, Grid} from "@mui/material"
import InteractPiggiFund from './InteractPiggiFund';

const PiggyFundUI = () => {
  const piggiFundAddress = '0x4D0Ef64d92e681840CCd929391D1B8CD3B175FA6'
  const abi = FactoryABI

const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState(null);
const [contract, setContract] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [walletBalance, setWalletBalance] = useState(null);
const [mostrecentcontract, setMostRecentContract] = useState(null)

  return (
    <>
    <Grid container direction="column" alignItems="center" justify="center">
    <Box sx={{display:'block', width:'auto'}}>
    <Typography color="primary" component="h1" sx={{ fontSize: 20, fontWeight: 600, padding: 2}}>PiggiFund UI:</Typography>
    <WalletConnect
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

   {signer ? <InteractPiggiFund 
   walletBalance = {walletBalance}
   setWalletBalance={setWalletBalance} 
   defaultAccount={defaultAccount} 
   provider={provider} 
   contract={contract} 
   signer={signer} />:null}
   </Box>
    </Grid>
  
    </>
  )
}

export default PiggyFundUI