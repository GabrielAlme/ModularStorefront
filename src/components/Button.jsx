import React from 'react'

//Button component that you can pass an onCLick function to
function Button ({onClick, children}) {
  return (
    <button onClick={onClick}>
        {children}
    </button>
  );
}

export default Button
