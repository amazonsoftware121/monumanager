import React from 'react'
import {FaArrowLeft,FaArrowRight} from "react-icons/fa"

const StepperControl = (props) => {
  return (
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
{/* props.currentStep === props.steps.length -1 ? "Done" : " <FaArrowRight /> "*/ }
</button>
</div>
    </div>
  )
}

export default StepperControl