import React, { createContext, useContext, useEffect, useState } from "react";
import data from "./dishes.json";
interface HomeContextType {
  numberPeople: number;
  setNumberPeople: (number: number) => void;
  meal: any;
  setMeal: any;
  dishes: any;
  dishesFilter: any;
  restaurants: any;
  setRestaurants: any;
  dataStep3: any;
  setDataStep3: any;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeContextProvider");
  }
  return context;
};

export const HomeContextProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [numberPeople, setNumberPeople] = useState<number>(0);
  const [meal, setMeal] = useState<any>();
  const [dishes, setDishes] = useState<any>();
  const [dishesFilter, setDishesFilter] = useState();
  const [restaurants, setRestaurants] = useState();
  const [dataStep3, setDataStep3] = useState([]);
  const filterDishesByMeals = (dishes: any, meals: any) => {
    return dishes?.filter((dish: any) =>
      dish.availableMeals?.some((meal: any) => meals.includes(meal))
    );
  };
  useEffect(() => {
    setDishesFilter(filterDishesByMeals(dishes, meal));
  }, [meal]);
  useEffect(() => {
    setDishes(
      data?.dishes.map((dish) => ({
        ...dish,
        total: 0,
      }))
    );
  }, []);
  useEffect(() => {
    setDataStep3(dishes?.filter((elm: any) => elm?.restaurant == restaurants));
  }, [restaurants]);

  const value = {
    numberPeople,
    setNumberPeople,
    meal,
    setMeal,
    dishes,
    dishesFilter,
    restaurants,
    setRestaurants,
    dataStep3,
    setDataStep3,
  };
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
