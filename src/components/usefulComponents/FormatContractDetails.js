import React,{useEffect, useState} from 'react'
import { ethers } from 'ethers'

import {Button,Box,Card,List,ListItem, ListItemText,ListItemIcon,FolderIcon,CircularProgress} from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CanvasTimer from './CanvasTimer';
import Deposit from './Deposit';
import VisualizeDeposit from './VisualizeDeposit';
import Withdraw from './Withdraw';




const FormatContractDetails = ({
    setWalletBalance,
    defaultAccount,
    piggiContractIndex,
    contract,
    setPiggiContractBalance,
    signer,
    infoavailable,
    provider,
    startTime, 
    claimTime, 
    recoverTime, 
    setInfoAvailable,
    contractAddress,
    contractBalance,
    withdrawMethods,
    contractOwner,
    contractTimes,
    fundingTarget,
    fundingDescription,
    goldenDoner,
    targetReached}) => {

    const [starttime,setStart]= useState(null)
    const [recovertime,setRecover]= useState(null)
    const [claimtime,setClaim] = useState(null)
    const [currenttime, setCurrentTime] = useState(null)
    const [formattedcurrent, setFormattedCurrent] = useState(null)

    const [inRecoveryTime,setInRecoveryTime]=useState(false)
    const [inClaimTime, setInClaimTime]=useState(false)
   

  
    const processTimes = (startTime,claimTime,recoverTime)=>{
    let ds = new Date(0)
    ds.setUTCSeconds(startTime)
    console.log(ds)
    setStart(String(ds))

    let dc= new Date(0)
    dc.setUTCSeconds(claimTime)
    console.log(dc)
    setClaim(String(dc)) 

    let dr= new Date(0)
    dr.setUTCSeconds(recoverTime)
    console.log(dr)
   setRecover(String(dr)) 

    }

const visualizeWithdrawPeriods = (currenttime,claimTime,recoverTime)=>{
let ct = parseInt(currenttime)
console.log("withdraw periods: "+ ct,claimTime,recoverTime)
let rt = parseInt(recoverTime)
let clt = parseInt(claimTime)

if (ct>clt){
    setInRecoveryTime(false)
    setInClaimTime(true)
    console.log("IN CLAIM TIME")

}
else if(ct>rt){
    setInClaimTime(false)
    setInRecoveryTime(true)
    console.log("IN RECOVER TIME")
}
else{
    setInRecoveryTime(false)
    setInClaimTime(false)
}
}

    const blockTimestamp = async(blockNum)=>{
        const blockdata = await provider.getBlock(parseInt(blockNum))
        return blockdata.timestamp

    }

    const formatCurrentTime = (blockTime) =>{
        let bTime = parseInt(blockTime)
        setCurrentTime(bTime)
        let bt = new Date(0)
        bt.setUTCSeconds(bTime)
        let stringBt = String(bt)
        setFormattedCurrent(stringBt)
    }

   async function LogData(event) {
       
        const time = await blockTimestamp(event)
        let nowTime = parseInt(time)
        // console.log("time is "+ nowTime)
        setCurrentTime(nowTime)
        formatCurrentTime(time)
     
    }
 
    useEffect(()=>{
        processTimes(startTime,claimTime,recoverTime)
    
        if(infoavailable===true){
            provider.on('block',LogData,true)
        }
        else{
            console.log("cancelling event listener")
            provider.removeListener('block', LogData,true)
        }
    
        return ()=>{
            console.log("cancelling event listener")
            provider.removeListener('block', LogData,true)
        }
    },[infoavailable])

useEffect(()=>{
// console.log("timeupdate")
visualizeWithdrawPeriods(currenttime,claimTime,recoverTime)
},[currenttime])


   const FormattedDetails = ()=> {
   
       return(
       <List>
           <ListItem>
           <ListItemIcon><AlternateEmailIcon/></ListItemIcon>         
         <ListItemText> {contractAddress} </ListItemText>
           </ListItem>
        
        <ListItem>
            <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>   
            <ListItemText> {contractBalance} ETH </ListItemText>
        </ListItem>

        <ListItem>
            <ListItemIcon><AccountBoxIcon/></ListItemIcon>   
            <ListItemText> Contract Owner: {contractOwner}</ListItemText>
        </ListItem>

        <ListItem>
            <ListItemIcon><SummarizeIcon/></ListItemIcon>   
            <ListItemText> {fundingDescription}</ListItemText>
        </ListItem>

        <ListItem>
            <ListItemIcon><SportsScoreIcon/></ListItemIcon>   
            <ListItemText sx={{color:'black'}}> Funding Goal: {fundingTarget} ETH</ListItemText>
        </ListItem>

        <ListItem>
            <ListItemIcon><AvTimerIcon/></ListItemIcon>   
            <ListItemText> CurrentTime: {formattedcurrent}</ListItemText>
        </ListItem>

        <ListItem>
            <ListItemIcon><AvTimerIcon/></ListItemIcon>   
            <ListItemText> StartTime: {starttime}</ListItemText>
        </ListItem>

        <ListItem>
            <ListItemIcon><AvTimerIcon/></ListItemIcon>  
          
            { 
            inRecoveryTime?
            <ListItemText sx={{color:'green'}}> RecoverTime: {recovertime}</ListItemText> :<ListItemText sx={{color:'red'}}> RecoverTime: {recovertime}</ListItemText>
            }
        </ListItem>

        <ListItem>
            <ListItemIcon><AvTimerIcon/></ListItemIcon>  
            {
            inClaimTime? 
            <ListItemText sx={{color:'green'}}> ClaimTime: {claimtime}</ListItemText>:  <ListItemText sx={{color:'red'}}> ClaimTime: {claimtime}</ListItemText>
            }    
        </ListItem>

       


       </List>
       )
   } 
  
  
  
    return (
      <>
    <Card variant="outlined" sx={{ backgroundColor: "beige"}}>
       <FormattedDetails/> 
    </Card>

    <Box>
    <Button color="error" variant='contained'onClick={(e)=>(setInfoAvailable(false))}>Search For Another Contract</Button>
    </Box>
    
  
   <Card>
    <Box sx={{display:'inline-block', width: 1/3}}>
        {
        currenttime ?
        <CanvasTimer 
        inClaimTime={inClaimTime}
        inRecoveryTime={inRecoveryTime}
        startTime={startTime}  
        claimTime={claimTime} 
        recoverTime={recoverTime} 
        currentTime={currenttime}/>: <CircularProgress/>
        }
    </Box>

    <Box sx={{display:'inline-block', width:1/3}}>
        <Deposit setWalletBalance={setWalletBalance} defaultAccount={defaultAccount} provider={provider} piggiContractIndex={piggiContractIndex} contract={contract} setPiggiContractBalance={setPiggiContractBalance} contractAddress={contractAddress} signer={signer}/>
        <Withdraw/>
    </Box>

    <Box sx={{display:'inline-block', width:1/3}}> 
        <VisualizeDeposit fundingTarget={fundingTarget} contractBalance={contractBalance} />
    </Box>
   </Card>
   
      </>
  

  )
}

export default FormatContractDetails