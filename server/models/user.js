const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  goals: [{
    type: Schema.Types.ObjectId,
    ref: 'Goal'
  }]
})

module.exports = mongoose.model('User', userSchema);