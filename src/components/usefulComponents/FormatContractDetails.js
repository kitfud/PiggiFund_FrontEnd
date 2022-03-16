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

import StarOutlineIcon from '@mui/icons-material/StarOutline';


const FormatContractDetails = ({
    walletBalance,
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

    const [fundsWithdrawn, setFundsWithdrawn] = useState(false)

    const [fundingTargetReached, setFundingTargetReached] = useState(false)
    const [goldenDonerElect, setGoldenDonerElect] = useState(null)



    const checkIfFundsWithdrawn = async ()=>{
    let areFundsWithdrawn;
      try{
        areFundsWithdrawn = await contract.getCheckFundsWithdrawn(piggiContractIndex)
        setFundsWithdrawn(areFundsWithdrawn)
      }
      catch{
        console.log("Error checking if funds have been withdrawn.")
      }
      
    }

    const checkGoldenDoner = async ()=>{
        let theGoldenOne; 
        try{
            let contractIndex = parseInt(piggiContractIndex)
            theGoldenOne = await contract.getGoldenDoner(contractIndex)
            if(theGoldenOne !== '0x0000000000000000000000000000000000000000'){
            setGoldenDonerElect(theGoldenOne)
            }
        }
        catch{
            console.log("Problem Getting the golden doner.")
        }
    }



    const checkIfFundingTargetReached = async ()=>{
        let targetReached;
      try{
        targetReached = await contract.getTargetReached(piggiContractIndex)
        setFundingTargetReached(targetReached)
        if (targetReached === true){
            checkGoldenDoner()
        }

      }
      catch{
        console.log("Error checking if funding target has been reached.")
      }
      
    }

  
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
let rt = parseInt(recoverTime)
let clt = parseInt(claimTime)

if (ct>clt){
    setInRecoveryTime(false)
    setInClaimTime(true)
   

}
else if(ct>rt){
    setInClaimTime(false)
    setInRecoveryTime(true)

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
            console.log("cancelling event listener on exit")
            provider.removeListener('block', LogData,true)
        }
    },[infoavailable])

useEffect(()=>{
// console.log("timeupdate")
visualizeWithdrawPeriods(currenttime,claimTime,recoverTime)
checkIfFundsWithdrawn()
checkIfFundingTargetReached()
},[currenttime,contractBalance,walletBalance])

useEffect(()=>{
checkGoldenDoner()
},[targetReached])

useEffect(()=>{
console.log("Contract entering recovery time.")
},[inRecoveryTime])

useEffect(()=>{
console.log("WALLET BALANCE CHANGE DETECTED IN FORMATCONTRACT DETAILS")
},[walletBalance])

useEffect(()=>{
    console.log("WALLET BALANCE CHANGE DETECTED IN FORMATCONTRACT DETAILS")
},[contractBalance])


   const FormattedDetails = ()=> {
   
       return(
       <List>
           <ListItem>
           <ListItemIcon><AlternateEmailIcon/></ListItemIcon>         
         <ListItemText> Contract Address: {contractAddress} </ListItemText>
           </ListItem>
        
        <ListItem>
            <ListItemIcon><AccountBoxIcon/></ListItemIcon>   
            <ListItemText> Contract Owner: {contractOwner}</ListItemText>
        </ListItem>

        <ListItem>
            <ListItemIcon><SummarizeIcon/></ListItemIcon>   
            <ListItemText>Summary: {fundingDescription}</ListItemText>
        </ListItem>

        <ListItem>
            <ListItemIcon><AccountBalanceWalletIcon/></ListItemIcon>   
            <ListItemText> Current Contract Balance: {contractBalance} ETH </ListItemText>
        </ListItem>

        <ListItem>
            <ListItemIcon><SportsScoreIcon/></ListItemIcon>   
            <ListItemText sx={{color:'black'}}> Funding Goal: {fundingTarget} ETH</ListItemText>
        </ListItem>


        <ListItem>
            <ListItemIcon><AvTimerIcon/></ListItemIcon>   
            <ListItemText> StartTime: {starttime}</ListItemText>
        </ListItem>

        <ListItem>
            <ListItemIcon><AvTimerIcon/></ListItemIcon>   
            <ListItemText> CurrentTime: {formattedcurrent}</ListItemText>
        </ListItem>

      

        <ListItem>
            <ListItemIcon><AvTimerIcon/></ListItemIcon>  
          
            { 
            inRecoveryTime && !fundingTargetReached?
            <ListItemText sx={{color:'green'}}> RecoverTime: {recovertime}</ListItemText> :<ListItemText sx={{color:'red'}}> RecoverTime: {recovertime}</ListItemText>
            }
        </ListItem>

        <ListItem>
            <ListItemIcon><AvTimerIcon/></ListItemIcon>  
            {
            inClaimTime && !fundingTargetReached? 
            <ListItemText sx={{color:'green'}}> ClaimTime: {claimtime}</ListItemText>:  <ListItemText sx={{color:'red'}}> ClaimTime: {claimtime}</ListItemText>
            }    
        </ListItem>

       {fundsWithdrawn?
       ( <ListItem>
        <ListItemIcon><AvTimerIcon/></ListItemIcon>  
        <ListItemText sx={{color:'blue'}}>FUNDS WITHDRAWN. Fundraising campaign has ended.</ListItemText>   
        </ListItem>): null
    
        }

        {goldenDonerElect !== null ?
       ( <ListItem>
        <ListItemIcon><StarOutlineIcon/></ListItemIcon>  
        <ListItemText sx={{color:'brown'}}>GOLDEN DONER:{goldenDonerElect}</ListItemText>   
        </ListItem>): null
    
        }

    


       </List>
       )
   } 
  
  
  
    return (
      <>
    <Card variant="outlined" sx={{ backgroundColor: "beige"}}>
       <FormattedDetails/> 
    </Card>

    <Box sx={{marginBottom: 2,marginTop:1}}>
    <Button color="error" variant='contained'onClick={(e)=>(setInfoAvailable(false))}>Search For Another Contract</Button>
    </Box>
 
 {!fundsWithdrawn?
 (<Card sx={{marginBottom:1}}> 
    <Box sx={{display:'inline-block', width: 1/3}}>
        {
            !fundingTargetReached ? ( currenttime ?
                <CanvasTimer 
                inClaimTime={inClaimTime}
                inRecoveryTime={inRecoveryTime}
                startTime={startTime}  
                claimTime={claimTime} 
                recoverTime={recoverTime} 
                currentTime={currenttime}/>: <CircularProgress/>
                ): null
        }
   
    </Box>

    <Box sx={{display:'inline-block', width:1/3}}>
        <Deposit 
        fundingTargetReached={fundingTargetReached}
        inClaimTime={inClaimTime}
        setWalletBalance={setWalletBalance} 
        defaultAccount={defaultAccount} 
        provider={provider} 
        piggiContractIndex={piggiContractIndex} 
        contract={contract} 
        setPiggiContractBalance={setPiggiContractBalance} 
        contractAddress={contractAddress} 
        signer={signer}/>
        
        <Withdraw
        fundsWithdrawn = {fundsWithdrawn}
        fundingTargetReached={fundingTargetReached}
        contractOwner = {contractOwner}
        inClaimTime = {inClaimTime}
        inRecoveryTime={inRecoveryTime}
        provider={provider}
        setWalletBalance={setWalletBalance}
        piggiContractIndex={piggiContractIndex}
        setPiggiContractBalance={setPiggiContractBalance}
        walletBalance={walletBalance} 
        contract={contract} 
        contractBalance={contractBalance} 
        account={defaultAccount} 
        contractIndex={piggiContractIndex}/>
    </Box>

    <Box sx={{display:'inline-block', width:1/3}}> 
    {!fundingTargetReached ? 
        <VisualizeDeposit fundingTarget={fundingTarget} contractBalance={contractBalance} /> : null}
    </Box>
   </Card>):null}
   
   
      </>
  

  )
}

export default FormatContractDetails