import React,{useState,useEffect} from 'react'
import { ethers } from 'ethers'

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

const Withdraw = ({
  fundsWithdrawn,
  fundingTargetReached,
  contractOwner,
  inClaimTime,
  inRecoveryTime,
  provider,
  setWalletBalance,
  piggiContractIndex,
  setPiggiContractBalance,
  walletBalance,
  contract, 
  contractBalance, 
  account, 
  contractIndex
}) => {

const [userdonation, setUserDonation] = useState(0.0)
const [processing, setProcessing] = useState(false)
const [txhash, setTxHash] = useState(null)
const [transactionPosted, setTransactionPosted] = useState(false)
const [withdrawn, setWithdrawn] = useState(false)

const updateWallet = async() =>{
  let balance
  try{
  balance = await provider.getBalance(account);
  console.log("current balance after transaction is: " + balance)
  let formattedBalance = ethers.utils.formatEther(balance)
  setWalletBalance(formattedBalance)
  }
  catch{
    console.log("ERROR GETTING USER WALLET BALANCE")

  }
  
}

const updateBalance =async()=>{
  let currentBalance
  try{
    currentBalance = await contract.callGetBalance(piggiContractIndex)
    const balanceETH = ethers.utils.formatEther(currentBalance)
    console.log("contract balance is: "+ balanceETH)
    setPiggiContractBalance(balanceETH)
    updateWallet()
  }
  catch{
    console.log("ERROR GETTING BALANCE ON CONTRACT.")
  }
  finally{
    console.log("attempting one more time....")
    currentBalance = await contract.callGetBalance(piggiContractIndex)
    const balanceETH = ethers.utils.formatEther(currentBalance)
    console.log("contract balance is: "+ balanceETH)
    setPiggiContractBalance(balanceETH)
    updateWallet()
  }
  
  

}

const checkAmountDonated = async () =>{
let donationWei;
try{
  donationWei = await contract.amountDonatedInContract(account,contractIndex)
}
catch{
  console.log("Okay. Issue getting your donation. Hold up")
}
finally{
  console.log("Trying again....")
  donationWei = await contract.amountDonatedInContract(account,contractIndex)
}

const donationETH = parseFloat(ethers.utils.formatEther(donationWei))
setUserDonation(donationETH)
}

const withdrawFunds = async()=>{
  setProcessing(true)
  console.log("going to withdraw funds for this address: " + account)
  
  await contract.callGetBackFunds(account, contractIndex).then((res)=>{
    console.log('txhash', res.hash)
    let hash = res.hash
    setTxHash(hash.toString())
    isTransactionMined(hash.toString())
    

  }).catch(error => {
    console.log("error with processing", error)
    setProcessing(false)})

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
    
          transactionBlockFound = true
      }
  }
}

const handleWithdraw = (event) =>{
setProcessing(true)
event.preventDefault()
console.log("Withdraw initiated.")
withdrawFunds()

}
const handleCloseSnack =()=>{
  setTransactionPosted(false)
}

useEffect(()=>{
if(txhash !== null)
setTransactionPosted(true)
},[txhash])

useEffect(()=>{
setWithdrawn(fundsWithdrawn)
},[fundsWithdrawn])


useEffect(()=>{
console.log("checking how much you've invested in this contract...")
checkAmountDonated()
},[contractBalance,account,walletBalance])


const handleAdminClaimFunds = async ()=>{
  setProcessing(true)

  await contract.callWithdrawAll(account, contractIndex).then((res)=>{
    console.log('txhash', res.hash)
    let hash = res.hash
    setTxHash(hash.toString())
    isTransactionMined(hash.toString())
  }).catch(error => {
    console.log("error with processing", error)
    setProcessing(false)})
}

const handleAdminRecieveFunds = async (event)=>{
  setWithdrawn(true)
  setProcessing(true)

  await contract.callDisburseFunds(account, contractIndex).then((res)=>{
    console.log('txhash', res.hash)
    let hash = res.hash
    setTxHash(hash.toString())
    isTransactionMined(hash.toString())
  }).catch(error => {
    console.log("error with processing", error)
    setProcessing(false)})
}

  return (
<Card sx={{marginBottom:5}}>

{fundsWithdrawn?
null:(
  !processing?
  <>
{ !fundingTargetReached?
<Typography variant="h2" sx={{ fontSize: 15, fontWeight: 600, marginBottom:2 }} >Funded: <Typography color="red"> {userdonation} ETH</Typography></Typography>:null
}

{
  inRecoveryTime && userdonation>0 && !fundingTargetReached?
  <Button color="error" variant="contained" onClick={handleWithdraw}> Withdraw</Button> :null
}


{
   fundingTargetReached && account.toUpperCase() === contractOwner.toUpperCase() && !withdrawn? 
   <Button variant="contained" color="success" onClick={handleAdminRecieveFunds} >FUNDING TARGET MET. GET FUNDS.</Button> :
   null
}

{
  inClaimTime && account.toUpperCase() === contractOwner.toUpperCase() && !fundingTargetReached? 
  (<Button variant="contained" color="success" onClick={handleAdminClaimFunds}>ADMIN CLAIM FUNDING</Button>):
   null
}

</>
  :<CircularProgress/>
)}

{/* {
  !processing?
  <>
{ !fundingTargetReached?
<Typography variant="h2" sx={{ fontSize: 15, fontWeight: 600, marginBottom:2 }} >Funded: <Typography color="red"> {userdonation} ETH</Typography></Typography>:null
}

{
  inRecoveryTime && userdonation>0 && !fundingTargetReached?
  <Button color="error" variant="contained" onClick={handleWithdraw}> Withdraw</Button> :null
}


{
   fundingTargetReached && account.toUpperCase() === contractOwner.toUpperCase()? 
   <Button variant="contained" color="success" onClick={handleAdminRecieveFunds} >FUNDING TARGET MET. GET FUNDS.</Button> :
   null
}

{
  inClaimTime && account.toUpperCase() === contractOwner.toUpperCase() && !fundingTargetReached? 
  (<Button variant="contained" color="success" onClick={handleAdminClaimFunds}>ADMIN CLAIM FUNDING</Button>):
   null
}

</>
  :<CircularProgress/>
} */}



</Card>
  
  )
}

export default Withdraw