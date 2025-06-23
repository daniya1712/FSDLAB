const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
const restaurants = {
  'Pizza Palace': ['Margherita', 'Pepperoni', 'Cheese Burst'],
  'Burger Bistro': ['Veg Burger', 'Chicken Burger', 'Cheese Burger'],
  'Sushi World': ['Salmon Roll', 'Tuna Nigiri', 'Veg Maki']
};
app.get('/', (req, res) => {
  const links = Object.keys(restaurants)
    .map(r => `<li><a href="/order?res=${r}">${r}</a></li>`)
    .join('');
  res.send(`<h1>Restaurants</h1><ul>${links}</ul>`);
});  
app.get('/order', (req, res) => {
  const r = req.query.res;
  if (!restaurants[r]) return res.send('Restaurant not found');
  const options = restaurants[r].map(i => `<option>${i}</option>`).join('');
  res.send(`
    <h2>Order from ${r}</h2>
    <form method="POST">
      <input name="res" type="hidden" value="${r}">
      <select name="item">${options}</select><br>
      <input name="name" placeholder="Your Name" required><br>
      <button>Order</button>
    </form>
  `);
});
app.post('/order', (req, res) => {
  const { res: r, item, name } = req.body;
  if (!restaurants[r] || !restaurants[r].includes(item)) {
    return res.send('Invalid order');
  }
  res.send(`<h2>Thanks ${name}!</h2><p>Your ${item} from ${r} is confirmed.</p>`);
});
app.listen(3000, () => console.log('http://localhost:3000'));
 