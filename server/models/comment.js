const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    message: String,
    userEmail: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema);