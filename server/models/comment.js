const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    message: String,
    date: {
      type: Date,
      default: Date.now
    },
    userEmail: String
})

module.exports = mongoose.model('Comment', commentSchema);