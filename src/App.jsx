import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logoDeliveroo from "./assets/images/logoDeliveroo.png"

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
      <nav>
        <div className="wrapper">
          <img className="imgLogo" src={logoDeliveroo} />
        </div>
      </nav>

      <header>
        <div className="wrapper">
          <div className="mainContent">
            <h1>{data.restaurant.name}</h1>
            <p className="restaurantDescription">{data.restaurant.description}</p>
          </div>
          <div className="rightContent">
              <img className="imgRestaurant" src={data.restaurant.picture} />
          </div>
        </div>
      </header>
      <main>
        <div className="wrapper">
          <div className="mainContent">
            {data.categories
              // Filter only categories with meals
              .filter((category) => category.meals.length > 0)
              .map((category) => {
                return (
                  <section>
                    <h2>{category.name}</h2>
                    <div
                      style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
                    >
                      {category.meals.map((meal) => {
                        return (
                          <div className="mealContainer">
                            <div>
                              <h3>{meal.title}</h3>
                              <p className="mealDescription">
                                {meal.description}
                              </p>
                              <p className="price">{`${meal.price} €`}</p>
                            </div>
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
           <div className="rightContent">
<h2>Panier</h2></div>
        </div>
      </main>
    </>
  );
}

export default App;
