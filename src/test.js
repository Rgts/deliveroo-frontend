

const shoppingCart = [
  { meal: "meal1", quantity: 1 },
  { meal: "meal2", quantity: 2 },
  { meal: "meal3", quantity: 3 },
  { meal: "meal4", quantity: 4 },
];

const newMeal="menu10"
const foundIdx = shoppingCart.findIndex((article) => article.meal === "meal4");
console.log(foundIdx);
if (foundIdx !== -1) {
  shoppingCart[foundIdx].quantity ++;
} else {
  shoppingCart.push({meal:newMeal,quantity:1})
}

console.log(shoppingCart)
