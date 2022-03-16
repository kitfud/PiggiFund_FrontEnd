import React,{useRef,useEffect,useState} from 'react'
import {CircularProgress} from '@mui/material'

const CanvasTimer = ({inClaimTime,inRecoveryTime, startTime, claimTime, recoverTime, currentTime}) => {

    const canvasRef = useRef(null)
    const barLength = 300
    let barCovered 
    let recoveryTime
    let recoveryCircleColor="red"

    const [ct,setInClaimTime]= useState(false)
    const [rt, setInRecoveryTime] = useState(false)

    const processTimeRepresentation = () =>{
  
      let proportionSpanCovered = ((currentTime-startTime)*barLength)/(claimTime-startTime)
    
      if (proportionSpanCovered>=barLength){
        barCovered = barLength
      }
      else{
        barCovered = proportionSpanCovered
      }

      recoveryTime =((recoverTime-startTime)*barLength)/(claimTime-startTime)
      // console.log(recoveryTime)

     
      if(ct===true){
        recoveryCircleColor="red"
      }
      else if(rt===true){
        recoveryCircleColor="green"
      }
      else{
        recoveryCircleColor="red"
      }
      

    }

    useEffect(()=>{
      console.log("RECOVERY TIME Bool Change DETECTED FROM CANVAS TIMER")
      if(inRecoveryTime===true){
        setInRecoveryTime(true)
        processTimeRepresentation()
      }
      else{
        setInRecoveryTime(false)
      }

    },[inRecoveryTime])

    useEffect(()=>{
      if(inClaimTime===true){
        setInClaimTime(true)
        setInRecoveryTime(false)
      }
      else{
        setInClaimTime(false)
      }

    },[inClaimTime])





    const draw = ctx => {
        ctx.fillStyle = "black"
        ctx.font = "20px Arial";
        ctx.fillText("Timer",45,20)

        ctx.beginPath();
        ctx.arc(10, recoveryTime+35, 5, 0, 2 * Math.PI);
        ctx.fillStyle = recoveryCircleColor;
        ctx.fill()
        ctx.stroke();

        ctx.fillStyle = "green"
        ctx.beginPath()
        ctx.fillRect(30,30,100,barLength)
   
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.fillRect(30,30,100,barCovered)
       
      }

    useEffect(() => {
        setInClaimTime(inClaimTime)
        setInRecoveryTime(inRecoveryTime)

        processTimeRepresentation()
        // if(canvasRef.current !== null){
        let canvas = canvasRef.current
        let context = canvas.getContext('2d')
        canvas.width = 110
        canvas.height = 310
     
        //draw
       draw(context)
        // }
      }, [currentTime,inRecoveryTime,inClaimTime,rt])

  return (
      
      currentTime !== null? 
        <canvas ref={canvasRef} />: <CircularProgress/>
    
  )
}

export default CanvasTimer