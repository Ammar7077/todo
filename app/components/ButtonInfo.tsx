import React, { useState } from "react";

const ButtonInfo = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role="button"
      // tabIndex="-3"
    >
      {hover ? "SKILLS" : <p> sss</p>}
    </div>
  );
};

export default ButtonInfo;