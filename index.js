const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const path = require('path');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Enabling cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


// API endpoints for users
const usersDataFile = 'users.json';

app.get('/api/users', (req, res) => {
  fs.readFile(usersDataFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users data file:', err);
      return res.status(500).send('Server error');
    }

    const users = JSON.parse(data);
    res.json(users);
  });
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;

  fs.readFile(usersDataFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users data file:', err);
      return res.status(500).send('Server error');
    }

    let users = JSON.parse(data);
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
});

// JSON file to store programmers data data
const programmersdataFile = 'programmers.json'; 

// API endpoints for programmers
app.get('/api/programmersresource', (req, res) => {
  fs.readFile(programmersdataFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).send('Server error');
    }

    const programmers = JSON.parse(data);
    res.json(programmers);
  });
});


app.post('/api/programmersresource', (req, res) => {
  const newAssignment = req.body;
  // Read data from the JSON file
  fs.readFile(programmersdataFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).send('Server error');
    }

    const programmers = JSON.parse(data);
    newAssignment.id = programmers.programmers.length + 1;
    programmers.programmers.push(newAssignment);

    // Write updated data back to the JSON file
    fs.writeFile(programmersdataFile, JSON.stringify(programmers, null, 2), (err) => {
      if (err) {
        console.error('Error writing data file:', err);
        return res.status(500).send('Server error');
      }

      res.json(newAssignment);
    });
  });
});


// API endpoints for departments
const departmentsDataFile = 'departments.json';

app.get('/api/departments', (req, res) => {
  fs.readFile(departmentsDataFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading departments data file:', err);
      return res.status(500).send('Server error');
    }

    const departments = JSON.parse(data);
    res.json(departments);
  });
});

app.post('/api/departments', (req, res) => {
  const newDepartment = req.body;

  fs.readFile(departmentsDataFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading departments data file:', err);
      return res.status(500).send('Server error');
    }

    const departments = JSON.parse(data);
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
});

// Serve the index.html page on the homepage
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// Starting the server
// app.listen(process.env.PORT || 3000, () => {
//   console.log('App listening on port 3000!');
// });
