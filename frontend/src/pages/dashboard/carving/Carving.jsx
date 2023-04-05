import "./carving.scss"
import { useState } from "react";


const Carving = () => {
  const [step, setStep] = useState(1);
  
  const displayStep = (step) => {
    
    switch (step) {
      case 1:
        return <Abc />
      case 2:
        return <Cde />
        case 3:
        return <Xyz />
      default:
        
    }
  }

  const handleClick = (step) =>{
    setStep(step);
  }


const Abc = () =>{
    return (
      <>
      <span>abc</span>
      <input type="text" placeholder="abc" />
      <button onClick={handleClick(2)}>Click Me</button>

      </>
    )
  };

  const Cde = () =>{
    return (
      <>
      <span>cde</span>
      <input type="text" placeholder="abc" />
      <button onClick={handleClick(1)}>Click Me</button>
      </>
    )
  };


  const Xyz = () =>{
    return (
      <>
      <span>Xyz</span>
      <input type="text" placeholder="Xyz" />
      <button onClick={handleClick(2)}>Click Me</button>
      </>
    )
  };


  return (
    <>
    <div>Carving</div>
    {displayStep}
    </>
  )
}

export default Carving