import React, { useLayoutEffect, useRef, useState } from 'react'

const UseLayoutEffect:React.FC = () => {
    const divHeight = useRef<HTMLDivElement>(null)
    const [height,setHeight]=useState<number>(0)
    useLayoutEffect(()=>{
        if(divHeight.current){
            setHeight(divHeight.current.offsetHeight)
        }
    },[])
    
  return (
    <div>
        <div ref={divHeight}><h3>useLayoutEffect </h3></div>
        <p > the Div's Height:{height}</p>
    </div>
  )
}

export default UseLayoutEffect