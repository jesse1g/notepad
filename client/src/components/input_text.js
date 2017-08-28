import React from 'react';


const InputText = (props) => {
  return (
    <div className='form-group'>
      <label className="control-label">{props.label}</label>
      <input type="text" maxLength='50' className="form-control" {...props.input} />
    </div>
  );
};

export default InputText;