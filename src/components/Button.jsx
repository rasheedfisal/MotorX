import React from 'react';

import useAuth from '../hooks/useAuth';

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  handleClick
}) => {
  const { setIsClicked, initialState } = useAuth();

  return (
    <button
      type="button"
      onClick={() => {
        handleClick && handleClick();

        setIsClicked(initialState);
      }}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
