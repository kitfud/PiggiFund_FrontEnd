import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, CircularProgress, Box, TextField, Snackbar, Alert, Link, Typography, Card, CardContent, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from "@mui/material"
import { ethers } from 'ethers'
import FactoryABI from "../chain-info/abi.json"
import WalletConnect from './usefulComponents/WalletConnect';
import CreatePiggiFund from './CreatePiggiFund';


const PiggiFundMaker = () => {

const piggiFundAddress = '0x3A2a45AE4aa8064B2Db37Fc36Fb63F45aEa43333'
const abi = FactoryABI

const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState(null);
const [contract, setContract] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [walletBalance, setWalletBalance] = useState(null);

return (
    <>
   
   <WalletConnect 
   defaultAccount={defaultAccount} 
   setDefaultAccount={setDefaultAccount} 
   walletBalance = {walletBalance} 
   setWalletBalance={setWalletBalance} 
   address={piggiFundAddress} 
   abi={abi} 
   setProvider = {setProvider} 
   setSigner = {setSigner} 
   setContract = {setContract} 
   provider = {provider}/>

   {signer ? 
   <CreatePiggiFund 
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