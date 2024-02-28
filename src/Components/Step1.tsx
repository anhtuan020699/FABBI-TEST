import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import Input from "@mui/material/Input";
import { mealList } from "../Pages/help";
import { useHomeContext } from "../Pages/HomeContext";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import CustomNumberInput from "./CustomNumberInput";
import CustomSelect from "./CustomSelect";

const Step1 = () => {
  const { meal, setMeal, numberPeople, setNumberPeople } = useHomeContext();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    setMeal(selectedValues);
  };
  const handleChangePeople = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const parsedInput = parseFloat(input);

    if (!isNaN(parsedInput) && isFinite(parsedInput)) {
      setNumberPeople(parsedInput);
    }
  };

  return (
    <div>
      <div>
        <div>Please select a meal</div>
        <CustomSelect
          value={meal}
          options={mealList}
          handleChange={handleChange}
          // multiple
        />
      </div>

      <div>
        <div>Please enter number of people</div>
        <CustomNumberInput
          value={numberPeople}
          handleChange={handleChangePeople}
        />
      </div>
    </div>
  );
};

export default Step1;
