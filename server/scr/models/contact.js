const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phoneNumbers: {
    type: String,
    trim: true
  },

  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  zip: {
    type: String,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
