import React,{useState,useEffect} from 'react'
import { ethers } from 'ethers'
import {  Box, TextField, Typography, Card, Button,CircularProgress} from "@mui/material"

const Deposit = ({
    setWalletBalance,
    defaultAccount,
    piggiContractIndex, 
    contract, 
    setPiggiContractBalance, 
    contractAddress,
    signer,
    provider}) => {

const [deposit,setDeposit] = useState(null)
const [interror, setIntError] = useState(false)
const [processing, setProcessing] = useState(false)
const [txhash, setTxHash] = useState(false)

const handleDepositValidation =(e)=>{
    setIntError(false);

    const reg = new RegExp(/^[0-9]+([.][0-9]+)?$/);
    const emptyString = new RegExp(/^$/);
    
    if(reg.test(e) || emptyString.test(e)){
      setDeposit(e)
    }
    else{
      setDeposit(null)
      setIntError(true);
    }
}

const updateWallet = async() =>{
    let balance = await provider.getBalance(defaultAccount);
    setWalletBalance(ethers.utils.formatEther(balance))
}

const updateBalance =async()=>{
    const currentBalance = await contract.callGetBalance(piggiContractIndex)
    const balanceETH = ethers.utils.formatEther(currentBalance)
    console.log("balance is: "+ balanceETH)
    setPiggiContractBalance(balanceETH)
    updateWallet()
}

const isTransactionMined = async (transactionHash) => {
    let transactionBlockFound = false

    while (transactionBlockFound === false) {
        let tx = await provider.getTransactionReceipt(transactionHash)
        console.log("transaction status check....")
        try {
            await tx.blockNumber
        }
        catch (error) {
            try {
                tx = await provider.getTransactionReceipt(transactionHash)
            }
            catch {
                console.log("no tx available")
            }

        }
        finally {
            console.log("proceeding")
        }


        if (tx && tx.blockNumber) {
            setProcessing(false)
            console.log("block number assigned.")
            console.log("COMPLETE BLOCK: " + tx.blockNumber.toString())
            updateBalance()
            // getWalletBalance(provider)
            // setTransactionPosted(true)
            transactionBlockFound = true
        }
    }
}


const handleDeposit = async ()=>{
    setProcessing(true)

    console.log(contractAddress)

    if (deposit=== null){
        alert('Deposit not possible with incomplete whole number or decimal.')
    }
    else{
        const amountAsWei = ethers.utils.parseEther(deposit)
        // console.log(String(amountAsWei))
        const tx = await signer.sendTransaction({to:contractAddress,value:amountAsWei}).then((res)=>{
            console.log('txhash', res.hash)
            let hash = res.hash
            setTxHash(hash.toString())
            isTransactionMined(hash.toString())

        }).catch(error => {
            console.log("error with processing", error)
            setProcessing(false)})

        }

        if (document.getElementById("setDepositVal") !== null) {
            document.getElementById("setDepositVal").value = "";
        }
}

  return (
      <>
    <Card sx={{marginBottom:20}}>
    <Typography variant="h2" sx={{ fontSize: 15, fontWeight: 600, marginBottom:2 }} >Deposit To Contract:</Typography>
    <TextField id="setDepositVal" helperText={interror ?'Only Numbers and Decimals':''} error={interror} autoComplete="off" fullWidth id="setDeposit" variant="outlined" label="ETH" onChange={(e)=>(handleDepositValidation(e.target.value))} ></TextField> 
    <Button color="success" variant="contained" onClick={handleDeposit}> DEPOSIT </Button>
    </Card>
  
      </>
   
  )
}

export default Deposit