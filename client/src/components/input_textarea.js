import React from 'react';


const InputTextarea = (props) => {
  return (
    <div className='form-group'>
      <label className="control-label">{props.label}</label>
      <textarea className="form-control" maxLength='10000' rows="10" {...props.input} />
    </div>
  );
};

export default InputTextarea;