import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--deliveroo-backend--v2szvx96sr9l.code.run/"
    );
    // console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="wrapper">
        <h2>{data.restaurant.name}</h2>
        <img className="imgRestaurant" src={data.restaurant.picture} />

        <p>{data.restaurant.description}</p>
        {data.categories
          // Filter only categories with meals
          .filter((category) => category.meals.length > 0)
          .map((category) => {
            return (
              <section>
                <h3>{category.name}</h3>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  {category.meals.map((meal) => {
                    return (
                      <div className="mealContainer">
                        <h4>{meal.title}</h4>
                        <p>{meal.description}</p>
                        <p>{`${meal.price} €`}</p>
                        {meal.picture && (
                          <img className="imgMeal" src={meal.picture} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
      </div>
    </>
  );
}

export default App;
