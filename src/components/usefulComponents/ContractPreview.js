import React,{useState} from 'react'
import { ethers,utils,BigNumber } from 'ethers'
import {  Box, Typography, Card,List, ListItem, ListItemText,Button, CircularProgress } from "@mui/material"




const ContractPreview = ({setMostRecentContract, defaultAccount, setWalletBalance, contract,provider, setPreviewContract, fundingGoal, fundingDescription,returnFundsMin,claimFundsMin}) => {

const [processing, setProcessing] = useState(false)
const [txhash, setTxHash] = useState(null)
const [transactionPosted, setTransactionPosted] = useState(false)


const [contractsMade, setContractsMade] = useState(null);

let _weiFundingGoal = String(parseFloat(fundingGoal)*10e17)
let _numReturnFunds = parseInt(returnFundsMin)
let _numClaimFunds = parseInt(claimFundsMin)

const handleCancel =(event)=>{
    setPreviewContract(false);
}

const handleCreateContract= (event)=>{
event.preventDefault()
console.log("creating contract")
createPiggiFundContract()
}

const createPiggiFundContract= async ()=>{
    try{
    console.log(contract)
    setProcessing(true)

    
        console.log("deployment attempt")
        const tx = await contract.createPiggyBankFundraiseContract(_weiFundingGoal, fundingDescription,_numReturnFunds,_numClaimFunds)
        let hash = tx.hash
        setTxHash(hash.toString())
        isTransactionMined(hash.toString())
    }
    
    catch {
        console.log("catch initiated")
        setProcessing(false)
    }
    
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
            tx = await provider.getTransactionReceipt(transactionHash)
        }
        finally {
            console.log("proceeding")
        }


        if (tx && tx.blockNumber) {
           
            setProcessing(false)
            console.log("block number assigned.")
            transactionBlockFound = true
            let stringBlock = tx.blockNumber.toString()
            console.log("COMPLETED BLOCK: " + stringBlock)
            

            //check balance of user wallet
            getWalletBalance()
            getContractsMade()
            setTransactionPosted(true)
            

        }
    }


}

const getWalletBalance = async () => {
    // Look up the balance
    if (provider !== null && !processing && defaultAccount !== null) {
        console.log("checking wallet balance")
        try{
            let stringAccount =String(defaultAccount)
            console.log("radical.strung up! " + stringAccount)
            let balance;
            try{
                balance = await provider.getBalance(stringAccount);
            }
            catch{
                console.log("definete error with balance")
            }
           
            console.log("gonna see how much jangle you have there...")  
            setWalletBalance(ethers.utils.formatEther(balance))
            console.log("rich is inside my friend.")
        }
        catch{
            console.log("error getting balance.")
        }
        
        
    }

}

const getContractsMade = async () => {
    let contractsMade;
    try{
    contractsMade = await contract.contractsMade()
    }
    catch{
    console.log("problem getting contracts made. Attempting again.")
    }
    finally{
    contractsMade = await contract.contractsMade()
    }
        const stringContractsMade = contractsMade.toString()
        const stringContractsMadeNum = parseInt(contractsMade)
        setContractsMade(stringContractsMade)
        let mostRecentContractAddress;
        try{
            let lastContract = stringContractsMadeNum - 1
            mostRecentContractAddress= await contract.getAddressFromIndex(lastContract)
        }
        catch{
            console.log("error retreiving most recent contract address. Attempting again....")
        }
        finally{
            console.log("finally....")
            let lastContract = stringContractsMadeNum - 1
            try{
            console.log(console.log("checking contract at this index: "+ lastContract))
            mostRecentContractAddress= await contract.getAddressFromIndex(lastContract)
            }
            catch{
                console.log("Most likely VM execution error.")
            }
            
        }
       
        console.log("Most Recent PiggiFund Contract At:" + mostRecentContractAddress)
        setMostRecentContract(mostRecentContractAddress)
    
}

const ContractData = () =>{
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
      </Box>
        </> 
    )
}
  return (
      
          !processing? (
            <>
            <ContractData/>
            <Box>
              <Box p={1}>
              <Button sx={{p:1}} color="error" variant="contained" onClick={handleCancel}>Cancel Contract</Button>
              <Button sx={{p:1}} color="success" variant="contained" onClick={handleCreateContract} >Create Contract</Button>
              </Box>
            </Box>
            </>
          ): 
          (
            <Box>
             <CircularProgress size={26} color="primary" />   
            </Box>
        
          )  

  )
}

export default ContractPreview