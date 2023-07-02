import React from 'react'
import NewProposalStyles from "../styles/NewProposal.module.css";

const CustomButton = ({ btnType, title, handleClick }) => {
  return (
    <button
      type={btnType}
      className={NewProposalStyles.form_custom_button}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton