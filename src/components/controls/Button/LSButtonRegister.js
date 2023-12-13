import React from 'react';

const LSButtonRegister = ({ onClick, caption, className, disabled=false }) => {
    return (
      <button type="submit" className={className} disabled={disabled}  onClick={onClick}>
        {caption}
      </button>
    );
  };

  export default LSButtonRegister;