import React,{useEffect,useState} from 'react'
import {ethers} from 'ethers'
import { List, ListItem, ListItemText, Button, CircularProgress, Box, TextField, Snackbar, Alert, Link, Typography, Card, CardContent, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from "@mui/material"

const Contracts = ({piggiFundAddress,abi}) => {

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(piggiFundAddress,abi,provider); 

    const [data,setData] = useState(null)


    function LogData(){
        let filterABI = ["event ContractCreated(address _contractOwner, address _contractAddress, string _summary, uint _fundingGoal)"]
        let iface = new ethers.utils.Interface(filterABI)

        let filter = {
            address: piggiFundAddress,
            fromBlock:0,     
        }

        let logPromise = provider.getLogs(filter)
        logPromise.then(function(logs){
            let events = logs.map((log)=>{
                return iface.parseLog(log).args
            })
            setData(events)
            
        }).catch(function(err){
            console.log(err);
        });
    }

    const RenderedData =()=>{    
  
        return(
            <TableContainer>
                <Table sx={{ minWidth: 650,marginTop:2}} aria-label="simple table">
                    <TableHead sx={{backgroundColor:"lightyellow"}}>
                    <TableRow>
                        <TableCell align="center">Contract Owner</TableCell>
                        <TableCell align="center">Contract Address</TableCell>
                        <TableCell align="center">Summary</TableCell>
                        <TableCell align="center">FundingGoal</TableCell>
                    </TableRow>
                    </TableHead>
            {
                    data?(
            data.slice(0).reverse().map((item)=>{
                let fundingETH = ethers.utils.formatEther(item._fundingGoal)
                        return(
                        <TableRow>
                            <TableCell>{item._contractOwner}</TableCell> 
                            <TableCell>{item._contractAddress}</TableCell> 
                            <TableCell align="center">{item._summary}</TableCell>
                            <TableCell align="center">{fundingETH}</TableCell>
                        </TableRow> )
            })

            )
            :null
            }
                </Table>

            </TableContainer>


          
        )
      
    }

    useEffect(()=>{
        contract.on("ContractCreated",(owner,contractaddress,summary,fundinggoal,event)=>{
            const fundingGoalETH = ethers.utils.formatEther(fundinggoal)
            console.log(typeof(fundingGoalETH))
            console.log({
                owner: owner,
                contractaddress: contractaddress,
                summary: summary,
                fundinggoal: fundingGoalETH,
                event: JSON.stringify(event)
            });
            LogData()
            contract.removeListener("ContractCreated",(owner,contractaddress,summary,fundinggoal,event))
        })

        LogData()
    },[])
    
    
  return (
    <div><RenderedData/></div>
  )
}

export default Contracts