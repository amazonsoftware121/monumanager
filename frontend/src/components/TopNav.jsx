import React from 'react'
import {FaArrowLeft,FaArrowRight} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const TopNav = (props) => {


  return (
    <>
    <div>TopNav</div>

    <div className='stepperControl container'>

<div className='buttonWrapper d-flex justify-content-between'>
{/* Back Button */}
<button 
onClick={()=>props.handleClick()}
className={`${
props.currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
}`} >
<FaArrowLeft />

</button>
{/* Next Button */}
<button 
onClick={()=>props.handleClick("next")} 
>
<FaArrowRight />
</button>
</div>
</div>

    </>
  )
}

export default TopNav





