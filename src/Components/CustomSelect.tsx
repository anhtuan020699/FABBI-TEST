import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material"; // Import các component từ thư viện MUI

interface CustomMultiSelectProps {
  value: string[];
  options: string[];
  handleChange: any;
  multiple?: boolean;
}

const CustomSelect: React.FC<CustomMultiSelectProps> = ({
  value,
  options,
  handleChange,
  multiple = false,
}) => {
  return (
    <Box>
      <FormControl fullWidth>
        <Select
          labelId="multi-select-label"
          id="multi-select"
          multiple={multiple}
          value={value}
          onChange={handleChange}
          renderValue={(selected: unknown) => (
            <div>
              {multiple ? (
                (selected as string[]).map((value, i) => (
                  <React.Fragment key={value}>
                    {i !== 0 && <span>, </span>}
                    <span>{value}</span>
                  </React.Fragment>
                ))
              ) : (
                <span>{value}</span>
              )}
            </div>
          )}
        >
          {options.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
