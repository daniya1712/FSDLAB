const express = require('express');
const app = express();
const port = 3000;
const restaurants = {
  "Spicy Villa": [
    { item: "Pizza", price: 120 },
    { item: "Burger", price: 60 }
  ],
  "Tandoori Nights": [
    { item: "Biryani", price: 10 },
    { item: "Kebab", price: 9 }
  ]
};
app.get('/', (req, res) => {
  const restaurantList = Object.keys(restaurants)
    .map(r => `<li><a href="/menu?name=${encodeURIComponent(r)}">${r}</a></li>`)
    .join('');
  res.send(`<h2>Restaurants</h2><ul>${restaurantList}</ul>`);
});
app.get('/menu', (req, res) => {
  const name = req.query.name;
  const menu = restaurants[name];
  const menuItems = menu
    .map(m => `<li>${m.item} - ${m.price} Rs <a href="/order?res=${encodeURIComponent(name)}&item=${encodeURIComponent(m.item)}&price=${m.price}">Order</a></li>`)
    .join('');
  res.send(`<h3>${name} Menu</h3><ul>${menuItems}</ul>`);
});
app.get('/order', (req, res) => {
  const { res: restaurant, item, price } = req.query;
  res.send(`<h3>Ordered: ${item} from ${restaurant} - ${price}Rs</h3>`);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});