import React, { useState } from "react";

interface TextFieldProps {
  defaultValue: string;
  isDesc?: boolean;
  // onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({
  defaultValue,
  isDesc,
  // onChange
}) => {
  const [value, setValue] = useState(defaultValue);

  function handleChange(event: any) {
    const newValue = event.target.value;
    setValue(newValue);
    // if (onChange) {
    //   onChange(newValue);
    // }
  }

  return (
    <textarea
      value={value}
      onChange={handleChange}
      className={`textarea border border-gray-300 py-2 px-4 rounded w-full ${isDesc ? 'h-48' : 'h-9'}`}
    />
  );
};

export default TextField;
