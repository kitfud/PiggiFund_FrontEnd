import React, {useState} from 'react';
import WalletConnect from './usefulComponents/WalletConnect';
import CreatePiggiFund from './CreatePiggiFund';
import {  Box, TextField, Typography, Card, Button} from "@mui/material"

const PiggiFundMaker = ({piggiFundAddress,abi}) => {


const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState(null);
const [contract, setContract] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [walletBalance, setWalletBalance] = useState(null);
const [mostrecentcontract, setMostRecentContract] = useState(null)

return (
    <>
   <Typography color="primary" component="h1" sx={{ fontSize: 20, fontWeight: 600, padding: 2}}>PiggiFund Maker:</Typography>
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

   {signer ? 
   <CreatePiggiFund
   setMostRecentContract={setMostRecentContract}
   defaultAccount={defaultAccount} 
   walletBalance={walletBalance} 
   setWalletBalance={setWalletBalance}
   signer={signer} 
   contract={contract} 
   provider={provider}/> : null}
    </>
  )
}

export default PiggiFundMaker