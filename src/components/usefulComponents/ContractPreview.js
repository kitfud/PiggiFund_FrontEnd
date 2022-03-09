import React from 'react'
import {  Box, Typography, Card,List, ListItem, ListItemText,Button } from "@mui/material"

const ContractPreview = ({setPreviewContract, fundingGoal, fundingDescription,returnFundsMin,claimFundsMin}) => {

const handleCancel =(event)=>{
    setPreviewContract(false);
}
  return (
      <>
      <Box>
   <Card variant="outlined" sx={{ display: 'inline-block', backgroundColor: "lightgoldenrodyellow" }}>
   <Typography sx={{ fontSize: 20, fontWeight: 600 }} variant="h1">Contract Summary:</Typography>
    <List>
    <ListItem>
        <ListItemText>Funding Goal: {fundingGoal} ETH</ListItemText>
    </ListItem>
    <ListItem>
        <ListItemText>Funding Description: {fundingDescription}</ListItemText>
    </ListItem>
    <ListItem>
        <ListItemText>Return funds option available in {returnFundsMin} min</ListItemText>
    </ListItem>
    <ListItem>
        <ListItemText>Claim funds option available in {claimFundsMin} min</ListItemText>
    </ListItem>
    </List>    
    </Card>

    <Box>
    <Button color="error" variant="contained" onClick={handleCancel}>Cancel Contract</Button>
    </Box>
  
                                
      </Box>
      </>
    
  )
}

export default ContractPreview