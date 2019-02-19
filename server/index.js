const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const Auth0Strategy = require('passport-auth0');
const passport = require('passport');

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

var strategy = new Auth0Strategy({
  domain:       process.env.DOMAIN,
  clientID:     process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL:  '/callback',
  state: false
 },
 function(accessToken, refreshToken, extraParams, profile, done) {
   // accessToken is the token to call Auth0 API (not needed in the most cases)
   // extraParams.id_token has the JSON Web Token
   // profile has all the information from the user
   return done(null, profile);
 }
);

passport.use(strategy);


app.use(goalRoutes);
app.use(commentRoutes);

mongoose.connect('mongodb://localhost:27017/personalGoals', { useNewUrlParser: true }).then(result => {
  app.listen(8080);
})
.catch(err => console.log(err))


