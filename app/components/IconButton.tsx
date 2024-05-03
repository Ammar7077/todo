'use client'
import React from "react";

type IconButtonProps = {
  icon: any;
  onTap: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onTap }) => {
  const handleClick = () => {
    onTap();
  };
  return (
    <button onClick={handleClick}>
      {icon}
    </button>
  );
};

export default IconButton;