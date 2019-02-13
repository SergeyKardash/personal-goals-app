const express = require('express');
const bodyParser = require('body-parser');

const goalRoutes = require('./routes/goal');
const commentRoutes = require('./routes/comment');

const mongoose = require('mongoose')

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(goalRoutes);
app.use(commentRoutes);

mongoose.connect('mongodb://localhost:27017/personalGoals', { useNewUrlParser: true }).then(result => {
  app.listen(8080);
})
.catch(err => console.log(err))


