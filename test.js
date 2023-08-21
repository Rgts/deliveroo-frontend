import data from "./src/assets/data/data.json" assert { type: "json" };
const ages = [[], [33, 16], [3, 6]];

console.log(ages.filter((age) => age.length > 0));

console.log(data.categories[0].meals);
