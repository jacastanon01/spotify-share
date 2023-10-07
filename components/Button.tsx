import React from "react";

const Button = ({ ...props }) => {
  const { className, handleClick } = props;
  return (
    <button className={`btn bg-primary ${className}`} onClick={handleClick}>
      Button
    </button>
  );
};

export default Button;
