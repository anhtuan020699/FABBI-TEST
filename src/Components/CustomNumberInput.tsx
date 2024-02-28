import React from "react";
import TextField from "@mui/material/TextField";

interface CustomNumberInputProps {
  value: number;
  handleChange: any;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  value,
  handleChange,
}) => {
  return (
    <TextField
      label=""
      variant="outlined"
      type="number"
      value={value}
      onChange={handleChange}
      InputProps={{
        inputProps: {
          min: 0,
          step: 1,
          max: 10,
        },
        style: { width: "100px", height: "40px" },
      }}
    />
  );
};

export default CustomNumberInput;
