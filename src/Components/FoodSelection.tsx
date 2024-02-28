import React from "react";
import { useHomeContext } from "../Pages/HomeContext";
import CustomNumberInput from "./CustomNumberInput";

const FoodSelection = () => {
  const { dataStep3, setDataStep3 } = useHomeContext();

  // Hàm để xử lý sự kiện thay đổi giá trị total
  const handleChangeTotal = (event: any, id: number) => {
    const input = event.target.value;
    const newTotal = parseFloat(input);

    // Kiểm tra xem newTotal có hợp lệ không
    if (!isNaN(newTotal) && isFinite(newTotal)) {
      const updatedData = dataStep3.map((item: any) => {
        if (item.id === id) {
          // Nếu id trùng khớp, cập nhật giá trị total
          return {
            ...item,
            total: newTotal,
          };
        }
        return item; // Trả về item không thay đổi nếu không phải id cần cập nhật
      });

      // Tính tổng total của tất cả các phần tử
      const currentTotal = updatedData.reduce((acc: number, item: any) => {
        return acc + item.total;
      }, 0);

      // Kiểm tra xem tổng có vượt quá 10 không
      if (currentTotal <= 10) {
        setDataStep3(updatedData); // Cập nhật lại dataStep3 trong context
      }
    }
  };

  return (
    <div>
      {dataStep3.map((elm: any) => {
        return (
          <div key={elm.id}>
            <span>{elm?.name}</span>
            <CustomNumberInput
              value={elm.total}
              handleChange={(event: any) => handleChangeTotal(event, elm.id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FoodSelection;
