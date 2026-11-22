import React from 'react'

//Button component that you can pass an onCLick function to or other custimizations to be more reusable
function Button({ children, type = 'button', className = '', ...props }) {
  return (
    <button type={type} className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
