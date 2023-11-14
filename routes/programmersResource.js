const express = require('express');
const router = express.Router();
const programmersResource = require('../model/programmersResource')


// Serve the index.html file
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


// get all the programmers resource from the db
router.get('/programmersresource', (req, res) => {
  programmersResource.find({}).then(resources => {
    if (resources) {
      res.send(resources);
    } else {
      res.sendStatus(404);
    }
  }).catch(err => {
    res.status(412).json({msg: err.message});
  })
});

// create programmers resouirce to the db
router.post('/programmersresource', (req, res) => {
  programmersResource.create(req.body).then(resource => {
    res.send(resource);
  }).catch(err => {
    res.status(412).json({msg: err.message});
  })
});

// Get single programmers resource from the database
router.get('/programmersresource/:id', (req, res) => {
  programmersResource.findById(req.params.id).then(resource => {
    res.send(resource);
  }).catch(err => {
    res.status(412).json({msg: err.message});
  })
})

// update programmers resorce route
router.put('/programmersresource/:id', (req, res) => {
  programmersResource.findByIdAndUpdate(req.params.id, req.body).then(resource => {
    programmersResource.findById(req.params.id).then(resource => {
      if(resource) {
        res.send(resource);
      } else {
        res.sendStatus(404);
      }
    })
  }).catch(err => {
    res.status(412).json({msg: err.message});
  })
});

// delete programmers resource route
router.delete('/programmersresource/:id', (req, res) => {
  programmersResource.findByIdAndRemove(req.params.id).then(resource => {
    res.sendStatus(204);
  }).catch(err => {
    res.status(412).json({msg: err.message});
  })
});



// Get all the user resources from the db
router.get('/users', (req, res) => {
  usersResource.find({}).then(resources => {
    if (resources) {
      res.send(resources);
    } else {
      res.sendStatus(404);
    }
  }).catch(err => {
    res.status(412).json({msg: err.message});
  });
});

// Create user resource in the db
router.post('/users', (req, res) => {
  usersResource.create(req.body).then(resource => {
    res.send(resource);
  }).catch(err => {
    res.status(412).json({msg: err.message});
  });
});

// Get single user resource from the database
router.get('/users/:id', (req, res) => {
  usersResource.findById(req.params.id).then(resource => {
    res.send(resource);
  }).catch(err => {
    res.status(412).json({msg: err.message});
  });
});

// Update user resource route
router.put('/users/:id', (req, res) => {
  usersResource.findByIdAndUpdate(req.params.id, req.body).then(() => {
    usersResource.findById(req.params.id).then(updatedResource => {
      if(updatedResource) {
        res.send(updatedResource);
      } else {
        res.sendStatus(404);
      }
    });
  }).catch(err => {
    res.status(412).json({msg: err.message});
  });
});

// Delete user resource route
router.delete('/users/:id', (req, res) => {
  usersResource.findByIdAndRemove(req.params.id).then(resource => {
    res.sendStatus(204);
  }).catch(err => {
    res.status(412).json({msg: err.message});
  });
});

// Get all the department resources from the db
router.get('/departments', (req, res) => {
  departmentsResource.find({}).then(resources => {
    if (resources) {
      res.send(resources);
    } else {
      res.sendStatus(404);
    }
  }).catch(err => {
    res.status(412).json({msg: err.message});
  });
});

// Create department resource in the db
router.post('/departments', (req, res) => {
  departmentsResource.create(req.body).then(resource => {
    res.send(resource);
  }).catch(err => {
    res.status(412).json({msg: err.message});
  });
});

// Get single department resource from the database
router.get('/departments/:id', (req, res) => {
  departmentsResource.findById(req.params.id).then(resource => {
    res.send(resource);
  }).catch(err => {
    res.status(412).json({msg: err.message});
  });
});

// Update department resource route
router.put('/departments/:id', (req, res) => {
  departmentsResource.findByIdAndUpdate(req.params.id, req.body).then(() => {
    departmentsResource.findById(req.params.id).then(updatedResource => {
      if(updatedResource) {
        res.send(updatedResource);
      } else {
        res.sendStatus(404);
      }
    });
  }).catch(err => {
    res.status(412).json({msg: err.message});
  });
});

// Delete department resource route
router.delete('/departments/:id', (req, res) => {
  departmentsResource.findByIdAndRemove(req.params.id).then(resource => {
    res.sendStatus(204);
  }).catch(err => {
    res.status(412).json({msg: err.message});
  });
});


module.exports = router;