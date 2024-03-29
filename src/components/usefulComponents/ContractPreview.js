import React,{useState} from 'react'
import { ethers,utils,BigNumber } from 'ethers'
import {  Box, Typography, Card,List, ListItem, ListItemText,Button, CircularProgress } from "@mui/material"




const ContractPreview = ({
    mostrecentcontract,
    setMostRecentContract, 
    defaultAccount, 
    setWalletBalance, 
    contract,provider, 
    setPreviewContract, 
    fundingGoal, 
    fundingDescription,
    returnFundsMin,
    claimFundsMin}) => {

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
    console.log("ALERT, problem getting contracts made. Attempting again.")
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
            console.log("working with this contract: "+ contract)
            mostRecentContractAddress= await contract.getAddressFromIndex(lastContract)
        }
        catch{
            console.log("error retreiving most recent contract address. Attempting again....")
        }
        finally{
            console.log("finally....")
            let lastContract = stringContractsMadeNum - 1
            try{
            console.log("checking contract at this index: "+ lastContract)
            mostRecentContractAddress= await contract.getAddressFromIndex(lastContract)
            }
            catch{
                console.log("Most likely VM execution error...")  
            }
            finally{
                try{
                    console.log("And another one...")
                    console.log("getting contract at this index: "+ lastContract)
                    mostRecentContractAddress= await contract.getAddressFromIndex(lastContract)

                }
                catch{
                    alert("So sorry. Theres an error retreiving the new contract address to the UI. Click the Contracts tab and you'll most likely see the contract you made there.")
                }
             
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
          <ListItemText>Funding Goal Is {fundingGoal} ETH: If goal met, no more contributions can be made and owner can claim funds.</ListItemText>
      </ListItem>
      <ListItem>
          <ListItemText>Funding Description: {fundingDescription}</ListItemText>
      </ListItem>
      <ListItem>
          <ListItemText>Recover Period Begins: As long as funding goal not reached, doner option for refund in {returnFundsMin} min</ListItemText>
      </ListItem>
      <ListItem>
          <ListItemText>Claim Period Begins: Donors can no longer get a refund. Contract owner can claim funds in {claimFundsMin} min</ListItemText>
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
          
            {mostrecentcontract ==null ?
            <Box>
              <Box p={1}>
              <Button sx={{p:1,marginRight:0.5}} color="error" variant="contained" onClick={handleCancel}>Cancel Contract</Button>
              <Button sx={{p:1, marginLeft:0.5}} color="success" variant="contained" onClick={handleCreateContract} >Create Contract</Button>
              </Box>
            </Box>:null 
             }
            </>
          ): 
          (
            <Box>
             <CircularProgress sx={{marginTop:2}} size={26} color="primary" />   
            </Box>
        
          )  

  )
}

export default ContractPreview