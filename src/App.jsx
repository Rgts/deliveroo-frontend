import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import logoDeliveroo from "./assets/images/logoDeliveroo.png"

const computeSubPrice = (articles)=>{
  let sum=0
  for (const article of articles) {
    sum+=article.quantity*article.meal.price
  }
  return sum
}

const deliveryPrice=2.5

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [articles,setArticles]=useState([])

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
            <p className="restaurantDescription">
              {data.restaurant.description}
            </p>
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
                  <section key={category.name}>
                    <h2>{category.name}</h2>
                    <div
                      style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
                    >
                      {category.meals.map((meal) => {
                        return (
                          <div
                            key={meal.id}
                            className="mealContainer"
                            onClick={() => {
                              const newArticles = [...articles];

                              const foundIdx = newArticles.findIndex(
                                (article) => article.meal === meal
                              );

                              if (foundIdx !== -1) {
                                newArticles[foundIdx].quantity++;
                              } else {
                                newArticles.push({
                                  meal: meal,
                                  quantity: 1,
                                });
                              }
                              setArticles(newArticles);
                            }}
                          >
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
            <button style={{width:"100%", color:"white",background:'#00CCBC', height:"50px", borderRadius:'5px', border:"none", margin:"5px 10px", fontSize:"20px"}}>Valider mon Panier</button>
            {articles.map((article, idx) => {
              return (
                <div
                  key={idx}
                  style={{ display: "flex", justifyContent: "flex-end",alignItems:"center", overflow:"scroll hidden",gap:"10px 30px" }}
                >
                  <button
                    onClick={() => {
                      const newArticles = [...articles];
                      newArticles[idx].quantity--;
                      // We delete the article if quantity is zero
                      if (newArticles[idx].quantity === 0) {
                        newArticles.splice(idx, 1);
                      }
                      // Update articles
                      setArticles(newArticles);
                    }}
                  >
                    -
                  </button>
                  <p>{article.quantity}</p>
                  <button
                    onClick={() => {
                      const newArticles = [...articles];
                      newArticles[idx].quantity++;
                      setArticles(newArticles);
                    }}
                  >
                    +
                  </button>
                    <p>{article.meal.title}</p>
                    <p>{article.meal.price} €</p>
                </div>
              );
            })}
            <div>Sous-total : {computeSubPrice(articles)} €</div>
            <div>
              Frais de livraison : {deliveryPrice} €
            </div>
            <div>
              Total : {computeSubPrice(articles)===0? 0 : computeSubPrice(articles) + deliveryPrice} €
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
