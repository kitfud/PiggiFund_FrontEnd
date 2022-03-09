import React, {useState} from 'react'
import FactoryABI from "../chain-info/abi.json"
import WalletConnect from './usefulComponents/WalletConnect';
import {  Box, TextField, Typography, Card, Button} from "@mui/material"
import InteractPiggiFund from './InteractPiggiFund';

const PiggyFundUI = () => {
  const piggiFundAddress = '0x3A2a45AE4aa8064B2Db37Fc36Fb63F45aEa43333'
  const abi = FactoryABI

const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState(null);
const [contract, setContract] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [walletBalance, setWalletBalance] = useState(null);
const [mostrecentcontract, setMostRecentContract] = useState(null)

  return (
    <>
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

   {signer ? <InteractPiggiFund/>:null}
    </>
  )
}

export default PiggyFundUI