import React from 'react'

const Button = (props) => {
  return (
    <div>
        <button className={props.btnDesign} type={props.btnType} > {props.btnText} </button>
    </div>
  )
}

export default Button