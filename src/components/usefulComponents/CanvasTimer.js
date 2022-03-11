import React,{useRef,useEffect} from 'react'

const CanvasTimer = ({startTime, claimTime, recoverTime,currentTime}) => {

    const canvasRef = useRef(null)
    const barLength = 300
    let barCovered 

    const processTimeRepresentation = () =>{
  
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
        ctx.fillText("Timer",45,20)

        ctx.fillStyle = "green"
        ctx.beginPath()
        ctx.fillRect(30,30,100,barLength)
   
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.fillRect(30,30,100,barCovered)
       
      }

    useEffect(() => {
        processTimeRepresentation()
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

export default CanvasTimer