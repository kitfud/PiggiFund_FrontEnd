import React, {useState} from 'react'
import { List, ListItem, ListItemText, Button, CircularProgress, Box, TextField, Snackbar, Alert, Link, Typography, Card, CardContent, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from "@mui/material"
import ContractForm from './usefulComponents/ContractForm';
import ContractPreview from './usefulComponents/ContractPreview';

const CreatePiggiFund = () => {

  const [fundingGoal,setFundingGoal] = useState("");
  const [fundingDescription,setFundingDescription] = useState("");
  const [returnFundsMin,setReturnFundsPeriod] = useState("");
  const [claimFundsMin, setClaimFundsPeriod] = useState("");
  const [previewcontract, setPreviewContract] = useState(false);
  

return (
    <>
  {
    
    !previewcontract?
    <>
    <ContractForm 
    fundingDescription = {fundingDescription}
    previewcontract = {previewcontract} 
    returnFundsMin= {returnFundsMin} 
    claimFundsMin={claimFundsMin} 
    fundingGoal={fundingGoal} 
    setFundingGoal = {setFundingGoal} 
    setPreviewContract ={setPreviewContract}
    setFundingDescription={setFundingDescription} 
    setReturnFundsPeriod={setReturnFundsPeriod} 
    setClaimFundsPeriod={setClaimFundsPeriod}/>
    </>:
    <ContractPreview setPreviewContract={setPreviewContract} fundingGoal ={fundingGoal} fundingDescription={fundingDescription} returnFundsMin={returnFundsMin} claimFundsMin={claimFundsMin}/>
  }
    </>
  )
}

export default CreatePiggiFund