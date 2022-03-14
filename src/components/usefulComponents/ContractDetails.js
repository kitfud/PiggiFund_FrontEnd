import React, {useEffect, useState} from 'react'
import { List, ListItem, ListItemText, Button, CircularProgress, Box, TextField, Snackbar, Alert, Link, Typography, Card, CardContent, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from "@mui/material"
import { ethers } from 'ethers'
import FormatContractDetails from './FormatContractDetails'

const ContractDetails = ({walletBalance, setWalletBalance, defaultAccount, signer,contract,provider}) => {

const [piggiContractBalance, setPiggiContractBalance] = useState(null)
const [piggiContractAddress,setPiggiContractAddress] = useState(null)
const [piggiContractIndex, setPiggiContractIndex] = useState(null)

const [withdrawMethods, setWithdrawMethods] = useState(null)
const [contractOwner, setContractOwner] = useState(null)

const [contractTimes,setContractTimes] = useState(null)
const [startTime, setStartTime] = useState(null)
const [recoverTime, setRecoverTime] = useState(null)
const [claimTime, setClaimTime] = useState(null)


const [fundingTarget, setFundingTarget] = useState(null)
const [fundingDescription, setFundingDescription] = useState(null)
const [goldendoner, setGoldenDoner] = useState(null)
const [targetreached, setTargetReached] = useState(null)

const [infoavailable, setInfoAvailable] = useState(false)
const [processing, setProcessing] = useState(false)


const handleAddressChange = (event)=>{
console.log(event.target.value)
setPiggiContractAddress(event.target.value)
}


const getContractInfo = async ()=>{
    setProcessing(true)
try{
let trimAddress = piggiContractAddress.trim()
const contractIndex = await contract.getIndexFromAddress(trimAddress)
console.log("contract index " + contractIndex)
setPiggiContractIndex(contractIndex)

const contractBalance = await contract.callGetBalance(contractIndex)
const balanceETH = ethers.utils.formatEther(contractBalance)
console.log("contract balance " + balanceETH)
setPiggiContractBalance(balanceETH)

const availableWithdrawMethods = await contract.getAvailableWithdrawMethods(contractIndex)
console.log("withdraw methods "+ availableWithdrawMethods)
setWithdrawMethods(availableWithdrawMethods)

const contractOwnerAddress = await contract.getContractOwner(contractIndex)
console.log("contract owner address "+ contractOwnerAddress)
setContractOwner(contractOwnerAddress)

const contractTimeFrames = await contract.getContractTimeFrames(contractIndex)

let start = contractTimeFrames[0].toNumber()
let recover = contractTimeFrames[1].toNumber()
let claim = contractTimeFrames[2].toNumber()

setStartTime(start)
setClaimTime(claim)
setRecoverTime(recover)
console.log("contract time frames "+ contractTimeFrames)
setContractTimes(contractTimeFrames)

const fundingGoal = await contract.getFundingGoal(contractIndex)
const fundingGoalETH = ethers.utils.formatEther(fundingGoal)
console.log("funding goal "+ fundingGoalETH)
setFundingTarget(fundingGoalETH)

const fundingSummary = await contract.getFundingSummary(contractIndex)
console.log("funding summary "+ fundingSummary)
setFundingDescription(fundingSummary)

const goldenDoner = await contract.getGoldenDoner(contractIndex)
console.log("golden doner " + goldenDoner)
setGoldenDoner(goldenDoner)

const targetReached = await contract.getTargetReached(contractIndex)
console.log("target reached " + targetReached)

setTargetReached(targetReached)
setInfoAvailable(true)
}
catch{
    setProcessing(false)
    alert("invalid input. Enter a PiggiFund address")
}
setProcessing(false)
}

useEffect(()=>{
    if(infoavailable===false){
        setPiggiContractAddress(null)
        setPiggiContractBalance(null)
        setWithdrawMethods(null)
        setContractOwner(null)
        setContractTimes(null)
        setFundingTarget(null)
        setFundingDescription(null)
        setGoldenDoner(null)
        setTargetReached(null)
    }

},[infoavailable])

useEffect(()=>{
console.log("Got the message in higher component, Contract Details, on balance change.")
},[piggiContractBalance])

  return (
      
      !processing ?
  !infoavailable ?
    <>
   <Card variant="outlined" sx={{ backgroundColor: "beige"}}>
   <CardContent sx={{padding:0,marginTop:2, marginLeft:0.5,marginRight:0.5}}>
   <Box>
        <TextField label="Enter PiggiFund Contract Address" autoComplete="off" fullWidth id="setAddress" variant="outlined" onChange={handleAddressChange}/>
   </Box>

    <Box p={1}>
        <Button variant="contained" color="success" onClick={getContractInfo}>Get Contract Info</Button>
    </Box>
    </CardContent>
    </Card>
    </>:
    <FormatContractDetails
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
        defaultAccount = {defaultAccount}
        contract = {contract}
        piggiContractIndex = {piggiContractIndex}
        setPiggiContractBalance={setPiggiContractBalance}
        signer={signer}
        infoavailable={infoavailable} 
        provider = {provider}
        contractAddress={piggiContractAddress} 
        contractBalance={piggiContractBalance}
        withdrawMethods = {withdrawMethods}
        contractOwner = {contractOwner}
        contractTimes = {contractTimes}
        fundingTarget = {fundingTarget}
        fundingDescription = {fundingDescription}
        goldenDoner = {goldendoner}
        targetReached = {targetreached}
        setInfoAvailable = {setInfoAvailable}
        startTime = {startTime}
        recoverTime = {recoverTime}
        claimTime = {claimTime}
        />: <Box><CircularProgress/></Box>

  )
}

export default ContractDetails