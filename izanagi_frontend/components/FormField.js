import React from 'react'
import NewProposalStyles from "../styles/NewProposal.module.css";

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  return (
    <label className={NewProposalStyles.form_label}>
      {labelName && (
        <span className={NewProposalStyles.form_span}>{labelName}</span>
      )}
      {isTextArea ? (
        <textarea 
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className={NewProposalStyles.form__field}
        
        />
      ) : (
        <input 
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          min="0"
          placeholder={placeholder}
          className={NewProposalStyles.form__field}
          />
      )}
    </label>
  )
}

export default FormField