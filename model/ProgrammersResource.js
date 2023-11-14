const mongoose = require('mongoose');

// Creating schema
const programmersResourceSchema = mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  imageUrl: String,
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

const programmersResource = mongoose.model('programmersResource', programmersResourceSchema);
module.exports = programmersResource;