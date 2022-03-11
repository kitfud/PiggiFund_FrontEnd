import React,{useEffect, useState} from 'react'
import { ethers } from 'ethers'

import {Button,Box,Card,List,ListItem, ListItemText,ListItemIcon,FolderIcon} from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import CanvasTimer from './CanvasTimer';
import Deposit from './Deposit';
import VisualizeDeposit from './VisualizeDeposit';




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

    const blockTimestamp = async(blockNum)=>{
        const blockdata = await provider.getBlock(parseInt(blockNum))
        return blockdata.timestamp

    }

    const formatCurrentTime = (blockTime) =>{
        let bt = new Date(0)
        bt.setUTCSeconds(parseInt(blockTime))
        setFormattedCurrent(String(bt))
    }

   async function LogData(event) {
        const time = await blockTimestamp(event)
        setCurrentTime(time)
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
            <ListItemText> Funding Goal: {fundingTarget} ETH</ListItemText>
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
            <ListItemText> RecoverTime: {recovertime}</ListItemText> 
        </ListItem>

        <ListItem>
            <ListItemIcon><AvTimerIcon/></ListItemIcon>   
            <ListItemText> ClaimTime: {claimtime}</ListItemText>
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
        <CanvasTimer startTime={startTime} recoverTime={recoverTime} claimTime={claimTime} currentTime={currenttime}/>
    </Box>

    <Box sx={{display:'inline-block', width:1/3}}>
        <Deposit setWalletBalance={setWalletBalance} defaultAccount={defaultAccount} provider={provider} piggiContractIndex={piggiContractIndex} contract={contract} setPiggiContractBalance={setPiggiContractBalance} contractAddress={contractAddress} signer={signer}/>
    </Box>

    <Box sx={{display:'inline-block', width:1/3}}> 
        <VisualizeDeposit/>
    </Box>
   </Card>
   
      </>
  

  )
}

export default FormatContractDetails