// index.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.json());

// Enabling cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// API endpoints for users
const usersDataFile = './data/users.json';

app.get('/api/users', (req, res) => {
  const users = require(usersDataFile);
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;

  const users = require(usersDataFile);
  newUser.id = users.length + 1;

  users.push(newUser);

  fs.writeFile(usersDataFile, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error('Error writing users data file:', err);
      return res.status(500).send('Server error');
    }

    res.json(newUser);
  });
});

// JSON file to store programmers data data
const programmersDataFile = './data/programmers.json';

// API endpoints for programmers
app.get('/api/programmersresource', (req, res) => {
  const programmers = require(programmersDataFile);
  res.json(programmers);
});

app.post('/api/programmersresource', (req, res) => {
  const newAssignment = req.body;

  const programmers = require(programmersDataFile);
  newAssignment.id = programmers.programmers.length + 1;
  programmers.programmers.push(newAssignment);

  fs.writeFile(programmersDataFile, JSON.stringify(programmers, null, 2), (err) => {
    if (err) {
      console.error('Error writing data file:', err);
      return res.status(500).send('Server error');
    }

    res.json(newAssignment);
  });
});

// API endpoints for departments
const departmentsDataFile = './data/departments.json';

app.get('/api/departments', (req, res) => {
  const departments = require(departmentsDataFile);
  res.json(departments);
});

app.post('/api/departments', (req, res) => {
  const newDepartment = req.body;

  const departments = require(departmentsDataFile);
  newDepartment.id = departments.length + 1;
  departments.push(newDepartment);

  fs.writeFile(departmentsDataFile, JSON.stringify(departments, null, 2), (err) => {
    if (err) {
      console.error('Error writing departments data file:', err);
      return res.status(500).send('Server error');
    }

    res.json(newDepartment);
  });
});

// Serve the index.html page on the homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Starting the server
app.listen(process.env.PORT || 3000, () => {
  console.log('App listening on port 3000!');
});

// Check Node.js version
const requiredNodeVersion = '12.0.0';

if (parseFloat(process.version.slice(1)) < parseFloat(requiredNodeVersion)) {
  console.error(`Node.js version ${requiredNodeVersion} or higher is required.`);
  process.exit(1);
}
