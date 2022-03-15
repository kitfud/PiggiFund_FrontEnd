import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, CircularProgress, Box, TextField, Snackbar, Alert, Link, Typography, Card, CardContent, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from "@mui/material"
import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom';

const WalletConnect = ({ 
    addresspassed,
    contract,
    mostrecentcontract,
    defaultAccount, 
    setDefaultAccount, 
    walletBalance, 
    setWalletBalance, 
    address,
    abi, 
    setProvider, 
    setSigner, 
    setContract, 
    provider}) => {

    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [accountchanging, setAccountChanging] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);
    const [yourMostRecentContract, setYourMostRecentContract] = useState(null);
    
    const navigate = useNavigate()

    const [processing, setProcessing] = useState(false)
    
    const connectWalletHandler = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log("CONNECTING TO WALLET")
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
    
                    accountChangedHandler(result[0]);
                    setConnButtonText('Wallet Connected');
    
    
    
                })
                .catch(error => {
                    setErrorMessage(error.message);
    
                });
    
        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    }
    
    const accountChangedHandler = (newAccount) => {
        if (!accountchanging) {
            setYourMostRecentContract(null)
            setAccountChanging(true)
            console.log("account change happened")
            setDefaultAccount(checkAccountType(newAccount));
            updateEthers();
        }
    
    }
    
    const checkAccountType = (newAccount) => {
        if (Array.isArray(newAccount)) {
            return newAccount[0].toString()
        }
        else {
    
            console.log(newAccount)
            return newAccount
        }
    }
    
    const updateEthers = async () => {
        let tempProvider = await new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);
    
        let tempSigner = await tempProvider.getSigner();
        setSigner(tempSigner);
    
        let tempContract = await new ethers.Contract(address, abi, tempSigner);
        setContract(tempContract);
    
    }

    const chainChangedHandler = () => {
        // reload the page to avoid any errors with chain change mid use of application
        window.location.reload();
    }

    const getWalletBalance = async (provider) => {
        // Look up the balance
        if (provider !== null && !processing && defaultAccount !== null) {
            let balance = await provider.getBalance(defaultAccount);
            setWalletBalance(ethers.utils.formatEther(balance))
        }

    }

    const checkContractOwnership = async()=>{
        
        let contractIndex 
        try{
           contractIndex = await contract.getIndexFromAddress(mostrecentcontract)
        }
        catch{
            console.log("error getting contract index: ")
        }
        finally{
            console.log("let's give it another go.....")
            contractIndex = await contract.getIndexFromAddress(mostrecentcontract)
        }
        
        console.log("new contract index is: "+ contractIndex)
        
        let contractOwner;
        try{
        contractOwner = await contract.getContractOwner(contractIndex)
        }
        catch{
            console.log("error getting contract owner: ")
        }
        finally{
            console.log("attempting one more time...")
            contractOwner = await contract.getContractOwner(contractIndex)
        }

        let defaultAccountUpper = String(defaultAccount).toUpperCase()
        let contractOwnerUpper = String(contractOwner).toUpperCase()

        console.log("contractOwner " + contractOwnerUpper)
        console.log("defaultAccount " + defaultAccountUpper)

    

        if(contractOwnerUpper === defaultAccountUpper){
            setYourMostRecentContract(mostrecentcontract)
        }


    }

    useEffect(()=>{
        console.log(addresspassed)

        if(addresspassed){
            setConnButtonText("Connect Wallet To View!")
        }
        else{
            setConnButtonText("Connect to Wallet")
        }
    },[addresspassed])


    useEffect(() => {

        getWalletBalance(provider)

    }, [provider,walletBalance])

    useEffect(() => {
        if (accountchanging === false) {
            // listen for account changes
            window.ethereum.on('accountsChanged', accountChangedHandler);
            window.ethereum.on('chainChanged', chainChangedHandler);
        }
        else {
            window.ethereum.removeListener('accountsChanged', accountChangedHandler);
            window.ethereum.removeListener('chainChanged', chainChangedHandler);
        }

    }, [accountchanging])

    useEffect(()=>{
     
        if(mostrecentcontract){
        checkContractOwnership()
        }
    },[mostrecentcontract])

  return (
      <>
    <Box>
    <Button onClick={connectWalletHandler} color="primary" variant="contained" sx={{ margin: 2 }}>{connButtonText}</Button>
    </Box>

    {
                defaultAccount ? (

                    <>
                        <Card variant="outlined" sx={{ display: 'inline-block', backgroundColor: "beige" }}>
                            <CardContent>
                                <Typography variant="h3" sx={{ fontSize: 15 }}>Address: {defaultAccount}</Typography>
                                <Typography variant="h3" sx={{ fontSize: 15 }}>Wallet Balance: {walletBalance}</Typography>
                              {
                                  yourMostRecentContract ? (
                                      <>
                                <Typography variant="h3" sx={{ fontSize: 15 }} color="red">Your PiggiFund Contract: {mostrecentcontract}</Typography>
                                  <Button 
                                  onClick={()=>navigate('/ui',{state:mostrecentcontract})}
                                  sx={{marginTop:2}} 
                                  color="primary" 
                                  variant="contained">Visit With PiggiFund UI</Button>
                                      </>
                                
                                  
                                  
                                  ) : (null)
                              }
                            </CardContent>
                        </Card>

                    </>

                ) :
                    (
                        <Typography>
                            {errorMessage}
                        </Typography>
                    )
            }

      </>
   
    
  )
}

export default WalletConnect