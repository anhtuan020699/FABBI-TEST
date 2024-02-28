import { SelectChangeEvent } from "@mui/material";
import { useHomeContext } from "../Pages/HomeContext";
import CustomSelect from "./CustomSelect";

const Step2 = () => {
  const { dishesFilter, restaurants, setRestaurants } = useHomeContext();
  const options = dishesFilter
    ?.map((elm: any) => elm?.restaurant)
    .filter((elm: any, i: number, arr: any[]) => {
      return elm !== arr[i + 1];
    });

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    setRestaurants(selectedValues);
  };

  return (
    <div>
      <div>Please select a restaurant</div>
      <CustomSelect
        value={restaurants}
        options={options}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Step2;
