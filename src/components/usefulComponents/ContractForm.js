import React, {useEffect, useState} from 'react'
import {  Box, TextField, Typography, Card, Button} from "@mui/material"

const ContractForm = ({fundingDescription,previewcontract, returnFundsMin, claimFundsMin, fundingGoal,setFundingGoal,setPreviewContract,setFundingDescription, setReturnFundsPeriod, setClaimFundsPeriod}) => {

const [intErrorFundingGoal, setIntErrorFundingGoal] = useState(false);
const [intErrorReturnFunds, setIntErrorReturnFunds] = useState(false);
const [intErrorClaimFunds, setIntErrorClaimFunds] = useState(false);
const [valueSizeError, setValueSizeError] = useState(false);
const [valueSizeErrorReturnPeriod, setValueSizeErrorReturnPeriod] =useState(false);
const [previewbutton, setPreviewButton] = useState(false);


const handleFundingGoal =(e)=>{
setIntErrorFundingGoal(false);

const reg = new RegExp(/^[0-9]+([.][0-9]+)?$/);
const emptyString = new RegExp(/^$/);

if(reg.test(e) || emptyString.test(e)){
  setFundingGoal(e)
}
else{
  setFundingGoal("")
  setIntErrorFundingGoal(true);
}
}

const handleReturnFundsPeriod =(e)=>{
  setIntErrorReturnFunds(false);
  setValueSizeErrorReturnPeriod(false);

  const reg = new RegExp(/^\d+$/);
  const emptyString = new RegExp(/^$/);
  if(reg.test(e)|| emptyString.test(e)){

      setReturnFundsPeriod(e)
    }
  
  else{
    setReturnFundsPeriod("")
    setIntErrorReturnFunds(true);
  }
  }

  const handleClaimFundsPeriod =(e)=>{
    setIntErrorClaimFunds(false);
    setValueSizeError(false);

   
    const reg = new RegExp(/^\d+$/);
    const emptyString = new RegExp(/^$/);

    if(reg.test(e)|| emptyString.test(e)){
    
        setClaimFundsPeriod(e)
      }
      
    else{
      setClaimFundsPeriod("")
      setIntErrorClaimFunds(true);
    }
    }
  
  useEffect(()=>{
   setValueSizeError(false)
   setIntErrorClaimFunds(false)


   if(fundingDescription !== "" && fundingGoal !=="" && returnFundsMin !=="" && claimFundsMin !==""){
     if(parseFloat(returnFundsMin)>parseFloat(claimFundsMin)){
     
      setPreviewButton(false)
      setValueSizeError(true)
     }
     else{
      if(returnFundsMin == claimFundsMin){
        setValueSizeError(true)
      }
      else{
        setPreviewButton(true)
      }
  
     }
    
   }
   else{
    setPreviewButton(false)
   }
  },[fundingDescription,fundingGoal,returnFundsMin, claimFundsMin])

  
  useEffect(()=>{
    setFundingGoal("")
    setReturnFundsPeriod("")
    setClaimFundsPeriod("")
    setFundingDescription("")

  },[])





  const handleClick =(event) =>{
    setPreviewContract(true)
  }

  return (
    
    <Box>
    <Card variant="outlined" sx={{ display: 'inline-block', backgroundColor: "white" }}>
    <Typography color="primary" component="h1" sx={{ fontSize: 20, fontWeight: 600, padding: 2}}>Create PiggiFund Contract:</Typography>

  
    <Box >
    <TextField helperText={intErrorFundingGoal ?'Only Numbers and Decimals':''} error={intErrorFundingGoal} required autoComplete="off" sx={{marginBottom:1}} label="Funding Goal (ETH)" fullWidth id="setFundingGoal" variant="outlined" onChange={(e)=> handleFundingGoal(e.target.value)} ></TextField>
    </Box>
   
    <Box >
    <TextField required multiline rows={4} autoComplete="off" sx={{marginBottom:1}} label="Fund Description" fullWidth id="setFundingDescription" variant="outlined" onChange={(e)=> setFundingDescription(e.target.value)} ></TextField>
    </Box>
   
    <Box >
    <TextField helperText={intErrorReturnFunds ?'Only Whole Numbers':valueSizeErrorReturnPeriod ?'return funds value must be < claim funds value' :''} error={intErrorReturnFunds || valueSizeErrorReturnPeriod} required autoComplete="off" sx={{marginBottom:1}} label="Donator Return Begin In (min)" fullWidth id="setReturnFundsPeriod" variant="outlined" onChange={(e)=> handleReturnFundsPeriod(e.target.value)} ></TextField>
    </Box>
    
    <Box >
    <TextField helperText={intErrorClaimFunds? 'Only Whole Numbers': valueSizeError ? 'claim funds value must be > return funds value' : ''} error={intErrorClaimFunds || valueSizeError} required autoComplete="off"  label="Owner Claim Funds Begin In (min)" fullWidth id="setClaimFundsPeriod" variant="outlined" onChange={(e)=> handleClaimFundsPeriod(e.target.value)} ></TextField>
    </Box>
     
 
    </Card>
    {
      previewbutton ? 
        <Box p={2}><Button  color="error" variant="contained" onClick={handleClick}>Preview Contract</Button></Box> : null
    }
    </Box>
 
   
  
  )
}

export default ContractForm