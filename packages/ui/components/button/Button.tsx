import React from "react";

const Button: React.FC<React.ComponentProps<"button">> = (props) => {
  return <button {...props} />;
};

export default Button;
