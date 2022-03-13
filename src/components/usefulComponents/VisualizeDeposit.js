import React, {useEffect,useRef} from 'react'

const VisualizeDeposit = ({fundingTarget, contractBalance}) => {

  const canvasRef = useRef(null)
  const barLength = 300
  let barCovered 


  const processDepositRepresentation = () =>{

let intFundingTarget = parseFloat(fundingTarget)
let intContractBalance = parseFloat(contractBalance)
if(intContractBalance>=fundingTarget){
  intContractBalance=fundingTarget
}
barCovered = barLength-((intContractBalance*barLength)/intFundingTarget)
  }



  const draw = ctx => {
      ctx.fillStyle = "black"
      ctx.font = "20px Arial";
      ctx.fillText("Deposit",35,20)

      ctx.fillStyle = "teal"
      ctx.beginPath()
      ctx.fillRect(30,30,100,barLength)
 
      ctx.fillStyle = "yellow"
      ctx.beginPath()
      ctx.fillRect(30,30,100,barCovered)
     
    }

  useEffect(() => {
      processDepositRepresentation()
      // if(canvasRef.current !== null){
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      canvas.width = 110
      canvas.height = 310
   
      //draw
     draw(context)
      // }
    }, [contractBalance])

return (


  <canvas ref={canvasRef} />
 
  
)
}

export default VisualizeDeposit