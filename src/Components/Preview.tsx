import React from "react";
import { useHomeContext } from "../Pages/HomeContext";

const Preview = () => {
  const { dataStep3, setDataStep3, meal, numberPeople, restaurants } =
    useHomeContext();
  const data = dataStep3.filter((elm: any) => elm?.total);

  return (
    <div>
      <div>
        <span>Meal:</span>
        {meal}
      </div>
      <div>No. of.People : {numberPeople}</div>
      <div>restaurant :{restaurants}</div>
      {data.map((elm: any) => {
        return (
          <div>
            {elm.name}-{elm.total}
          </div>
        );
      })}
    </div>
  );
};

export default Preview;
