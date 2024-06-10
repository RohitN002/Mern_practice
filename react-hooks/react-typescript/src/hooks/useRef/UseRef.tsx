import React, { useRef } from 'react'

const UseRef:React.FC = () => {
   const buttonClick= useRef<HTMLInputElement>(null)
   const handleFocusClick =()=>{
    if(buttonClick.current){
        buttonClick.current.focus()
    }
   }
  return (
    <div>
        <h3>UseRef</h3>
        <input type="text" 
       ref={buttonClick}
       placeholder='useRef'
        />
        <button onClick={handleFocusClick}>Focus the input</button>
    </div>
  )
}

export default UseRef