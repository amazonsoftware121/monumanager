import React, {useEffect,useState,useRef} from 'react'




const Stepper = ({steps,currentStep}) => {
const [newStep, setNewStep] = useState([]);
const stepRef = useRef();

const updateStep = (stepNumber, steps) =>{
const newSteps = [...steps]
let count = 0;
while(count<newSteps.length)  {
    // current steps
if(count == stepNumber){
    newSteps[count] = {
        ...newSteps[count],
        highlighted: true,
        selected: true,
        completed: true,
    };
    count++;
}
    // step completed

    else if(count < stepNumber) {
        newSteps[count] = {
            ...newSteps[count],
            highlighted: false,
            selected: true,
            completed: true,
        };
        count++;
    }

    // step pending

    else {
        newSteps[count] = {
            ...newSteps[count],
            highlighted: false,
            selected: false,
            completed: false,
        };
        count++;
    }
}
return newSteps;
}

    useEffect(()=>{

        //create object
        const stepsState = steps.map((step,index)=>
        Object.assign({},{
            description: step,
            completed: false,
            highlighted: index === 0 ? true : false,
            selected: index === 0 ? true : false,
            
        })
        );
stepRef.current = stepsState;
const current = updateStep(currentStep-1, stepRef.current);
setNewStep(current);
    },[steps,currentStep]);

    const displaySteps = newStep.map((step,index) => {
return (

    <div key={index} className={index !== newStep.length -1 ? "w-full d-flex items-center" : "d-flex items-center" }>
         <div className={`${step.selected ? "bg-success" : ""}`}> {step.completed ? (
            <span className='text-white font-bold text-xl'> &#10003; </span>
         ) :(index+1 ) } <div>
         <div className={`${step.highlighted ? "" : "" }`}>
            {step.description}
         </div>
         </div>

<div className={`${step.completed ? "border-green" : "border-gray" }`}>

</div>

         </div>

 
 

<div >Display Line</div>
    </div>
);
    });

  return (
    <div className='steper d-flex justify-content-between '>
    
    
   {displaySteps}
    </div>
  )
}

export default Stepper