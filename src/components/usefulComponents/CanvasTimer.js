import React,{useRef,useEffect} from 'react'

const CanvasTimer = ({starttime, claimtime, recovertime,currenttime}) => {
    const canvasRef = useRef(null)

    const draw = ctx => {
        ctx.fillStyle = "black"
        ctx.font = "20px Arial";
        ctx.fillText("Timer",45,20)

        ctx.fillStyle = "green"
        ctx.beginPath()
        ctx.fillRect(30,30,100,300)
   
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.fillRect(30,30,100,10)
       
      }

    useEffect(() => {
        if(canvasRef.current !== null){
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.width = 110
        canvas.height = 310
     
        //draw
       draw(context)
        }
      }, [draw])

  return (
    <canvas ref={canvasRef} />
  )
}

export default CanvasTimer