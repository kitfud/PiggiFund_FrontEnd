import React, {useEffect,useRef} from 'react'

const VisualizeDeposit = ({startTime, claimTime, recoverTime,currentTime}) => {

  const canvasRef = useRef(null)
  const barLength = 300
  let barCovered 

  const processDepositRepresentation = () =>{

    let proportionSpanCovered = ((currentTime-startTime)*barLength)/(claimTime-startTime)
  
    if (proportionSpanCovered>=barLength){
      barCovered = barLength
    }
    else{
      barCovered = proportionSpanCovered
    }
  }




  const draw = ctx => {
      ctx.fillStyle = "black"
      ctx.font = "20px Arial";
      ctx.fillText("Deposit",35,20)

      ctx.fillStyle = "yellow"
      ctx.beginPath()
      ctx.fillRect(30,30,100,barLength)
 
      ctx.fillStyle = "teal"
      ctx.beginPath()
      ctx.fillRect(30,30,100,barCovered)
     
    }

  useEffect(() => {
      processDepositRepresentation()
      if(canvasRef.current !== null){
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      canvas.width = 110
      canvas.height = 310
   
      //draw
     draw(context)
      }
    }, [currentTime])

return (


  <canvas ref={canvasRef} />
 
  
)
}

export default VisualizeDeposit