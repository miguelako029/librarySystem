import React from "react";

function CustomInput(props) {
  // You can destructure the props to access specific properties like placeholder, value, onChange, etc.
  const { placeholder, value, onChange } = props;

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default CustomInput;
