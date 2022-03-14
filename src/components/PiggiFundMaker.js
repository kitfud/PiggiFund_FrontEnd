import React, {useState} from 'react';
import FactoryABI from "../chain-info/abi.json"
import WalletConnect from './usefulComponents/WalletConnect';
import CreatePiggiFund from './CreatePiggiFund';
import {  Box, TextField, Typography, Card, Button} from "@mui/material"

const PiggiFundMaker = () => {

const piggiFundAddress = '0x58d0F097216CFFF6d8d2Ca3b899f94652bd69e5f'
const abi = FactoryABI

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