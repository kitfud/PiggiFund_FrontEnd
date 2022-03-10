import React,{useEffect, useState} from 'react'
import { ethers } from 'ethers'
import {Button,Box,Card,List,ListItem, ListItemText,ListItemIcon,FolderIcon} from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AvTimerIcon from '@mui/icons-material/AvTimer';



const FormatContractDetails = ({startTime, claimTime, recoverTime, setInfoAvailable,contractAddress,contractBalance,withdrawMethods,contractOwner,contractTimes,fundingTarget,fundingDescription,goldenDoner,targetReached}) => {

    const [starttime,setStart]= useState(null)
    const [recovertime,setRecover]= useState(null)
    const [claimtime,setClaim] = useState(null)

  

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

 
    useEffect(()=>{
        processTimes(startTime,claimTime,recoverTime)
    },[])


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
      </>
  

  )
}

export default FormatContractDetails