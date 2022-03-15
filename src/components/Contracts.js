import React,{useEffect,useState,useRef} from 'react'
import {ethers} from 'ethers'
import { TablePagination,TableContainer, TableHead, Table, TableRow, TableCell, TableBody,Card } from "@mui/material"
import { InstallMobileOutlined } from '@mui/icons-material';

const Contracts = ({piggiFundAddress,abi}) => {

    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(piggiFundAddress,abi,provider); 

    const [data,setData] = useState(null)

    const [page,setPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(5)

    const mountedRef = useRef()


    const handleChangePage = (event,newPage)=>{
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event)=>{
        setRowsPerPage(parseInt(event.target.value,10))
        setPage(0)
    }

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

     // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const RenderedData =()=>{    
  
        return(
            <Card sx={{height:'45vw'}} variant="outlined">
                 
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
            
            <TableBody>
            {
                    data?(
            data.slice(0).reverse().slice(page * rowsPerPage, page*rowsPerPage+rowsPerPage).map((item)=>{
                let fundingETH = ethers.utils.formatEther(item._fundingGoal)
             
                        return(
                        <TableRow key={item._contractAddress}>
                            <TableCell>{item._contractOwner}</TableCell> 
                            <TableCell>{item._contractAddress}</TableCell> 
                            <TableCell align="center">{item._summary}</TableCell>
                            <TableCell align="center">{fundingETH}</TableCell>
                        </TableRow> )
            })
            
            

            )
            :null
            }
             {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            
                </Table>
            </TableContainer> 
            {
                data ?
            <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />:null
            }
            
            </Card>
           
          
           
              
        )
      
    }

    useEffect(()=>{
     mountedRef.current = true

     if(mountedRef){
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

            return ()=>  contract.removeListener("ContractCreated",(owner,contractaddress,summary,fundinggoal,event))

        })

        LogData()
    }
    
    return () => {
        mountedRef.current = false 
    }
   
    },[])
    
    
  return (
    <div><RenderedData/></div>
  )
}

export default Contracts