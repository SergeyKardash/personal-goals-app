const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  canComment: {
    type: [String]
  },
  comments: {
    type: {
      message: String,
      date: {
        type: Date,
        default: Date.now
      },
      user: String
    }
  }
}, 
{timestamps: true});

module.exports = mongoose.model('Goal', goalSchema);