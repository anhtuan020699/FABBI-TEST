import { Grid } from "@mui/material";
import { useHomeContext } from "../Pages/HomeContext";
import CustomNumberInput from "./CustomNumberInput";

const FoodSelection = () => {
  const { dataStep3, setDataStep3 } = useHomeContext();
  const handleChangeTotal = (event: any, id: number) => {
    const input = event.target.value;
    const newTotal = parseFloat(input);
    if (!isNaN(newTotal) && isFinite(newTotal)) {
      const updatedData = dataStep3.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            total: newTotal,
          };
        }
        return item;
      });
      const currentTotal = updatedData.reduce((acc: number, item: any) => {
        return acc + item.total;
      }, 0);

      if (currentTotal <= 10) {
        setDataStep3(updatedData);
      }
    }
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {dataStep3.map((elm: any) => {
        return (
          <Grid
            item
            xs={6}
            style={{
              borderRadius: "4px",
              boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span>{elm?.name}</span>
            <CustomNumberInput
              value={elm.total}
              handleChange={(event: any) => handleChangeTotal(event, elm.id)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FoodSelection;
