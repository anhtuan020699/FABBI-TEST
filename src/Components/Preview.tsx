import { useHomeContext } from "../Pages/HomeContext";
import "./style.scss";
const Preview = () => {
  const { dataStep3, setDataStep3, meal, numberPeople, restaurants } =
    useHomeContext();
  const data = dataStep3.filter((elm: any) => elm?.total);

  return (
    <div className="card">
      <div className="center">
        <div>
          <div>
            <span className="lable">Meal: </span>
            {meal}
          </div>
          <div className="margin-top-10">
            <span className="lable">No. of.People :</span> {numberPeople}
          </div>
          <div className="margin-top-10">
            <span className="lable">restaurant :</span> {restaurants}
          </div>
          <div className="lable margin-top-10">Dish:</div>
          {data.map((elm: any) => {
            return (
              <div>
                {elm.name}:{elm.total} set
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Preview;
