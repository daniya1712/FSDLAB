const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let students = [];
let id = 1;

// Add a new student
app.post('/students', (req, res) => {
  const student = { id: id++, name: req.body.name, age: req.body.age };
  students.push(student);
  res.status(201).json(student);
});

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
