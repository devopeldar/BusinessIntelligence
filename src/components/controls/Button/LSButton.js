import React from 'react';

const LSButton = ({ onClick, caption, type, className }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {caption}
    </button>
  );
};


export default LSButton;