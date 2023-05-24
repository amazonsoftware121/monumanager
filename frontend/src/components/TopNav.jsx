import React from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';

const TopNav = (props) => {
  const navigate = useNavigate();
  

  return (
    <>
      <div className='stepperControl container'>

        <div className='buttonWrapper d-flex justify-content-between'>
          <button
            onClick={() => navigate(props.prevStep)}
            className="" >
            <FaArrowLeft />

          </button>
          {/*<button
            onClick={() => navigate(props.nextStep)}
          >
            <FaArrowRight />
          </button>*/}
        </div>
      </div>

    </>
  )
}

export default TopNav





