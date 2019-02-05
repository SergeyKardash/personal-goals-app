const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
}, 
{timestamps: true});

module.exports = mongoose.model('Goal', goalSchema);