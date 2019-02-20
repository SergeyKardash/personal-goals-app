const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('../models/comment');

var commentSchema = Comment.schema


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
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);