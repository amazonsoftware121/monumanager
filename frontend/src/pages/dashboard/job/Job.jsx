import "./job.scss";
import Customer from "../customer/Customer"
import Order from "../order/Order";
import Product from "../product/Product";
import Carving from "../carving/Carving";
import Status from "../status/Status";
import Stepper from "../../../components/Stepper"
import CarvingType from "../carvingtype/CarvingType";
import OrderServices from "../orderservices/OrderServices";
import Task from "../task/Task";
import StepperControl from "../../../components/StepperControl"
import { useState } from "react";
import { StepperContext } from "../../../context/StepperContext";


const Job = () => {

  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState('');
  const [finalData, setFinalData] = useState([]);

  const steps = [
    "Customer",
    "Order",
    "Status",
    "Order Services",
    "Carving",
    "Carving Type",
    "Task",
    "Product"

  ];

const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Customer />
      case 2:
        return <Order />
      case 3:
        return <Status />
      case 4:
        return <OrderServices />
      case 5:
        return <Carving />
      case 6:
        return <CarvingType />
      case 7:
        return <Task />
      case 8:
        return <Product />
      default:
    }
  }

  const handleClick = (direction)=>{
let newStep = currentStep;
direction == "next" ? newStep++ : newStep--;
// check if steps are within bounds
newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  }

  return (
    <>
      <div className="jobFormWrapper">
        {/* Stepper */}

        <div className="container horizontal mt-5 mt-4 shadow-lg py-3">
          { /* Navigation Controls */}

          <StepperControl 
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
      

          />
          <Stepper 
          steps={steps}
          currentStep={currentStep}
           />

{/* Display Components */}
<div>
<StepperContext.Provider value={{
  userData,
  setUserData,
  finalData,
  setFinalData,
  displayStep
}}>
  {displayStep(currentStep)}
</StepperContext.Provider>
</div>
          

        </div>

      </div>
    </>
  )
}

export default Job