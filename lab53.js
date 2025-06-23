const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const restaurants = {
  'Pizza Place': { Margherita: 250, Pepperoni: 300 },
  'Burger Joint': { Veg: 120, Chicken: 180 },
  'Sushi Spot': { Salmon: 400, Tuna: 450 }
};

app.get('/', (req, res) => {
  res.send(`
    <h1>Food Delivery</h1>
    <ul>${
      Object.keys(restaurants).map(r =>
        `<li><a href="/order?r=${r}">${r}</a></li>`
      ).join('')
    }</ul>
  `);
});

app.get('/order', (req, res) => {
  const r = req.query.r;
  const menu = restaurants[r];
  if (!menu) return res.redirect('/');

  res.send(`
    <h2>Order from ${r}</h2>
    <form method="POST" action="/confirm">
      <input type="hidden" name="r" value="${r}">
      <select name="item">${
        Object.entries(menu).map(([item, price]) =>
          `<option value="${item}">${item} - ₹${price}</option>`
        ).join('')
      }</select><br>
      <input name="name" placeholder="Your name" required><br>
      <button>Order</button>
    </form>
  `);
});

app.post('/confirm', (req, res) => {
  const { r, item, name } = req.body;
  const price = restaurants[r]?.[item] || 0;

  res.send(`
    <h2>Order Confirmed!</h2>
    <p>${name}, your ${item} (₹${price}) from ${r} is on the way.</p>
    <a href="/">Home</a>
  `);
});

app.listen(3002, () => console.log('Server running on http://localhost:3002'));

