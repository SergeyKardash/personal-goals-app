const express = require('express');
const bodyParser = require('body-parser');

const Auth0Strategy = require('passport-auth0');
const passport = require('passport');

const authRoutes = require('./routes/auth');
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
  domain:       'personalgoalapp.eu.auth0.com',
  clientID:     'UPkLzNww2Fpl7ShTT6AlxXDB3kv7EI5u',
  clientSecret: 'L0c3yurmOzRvb4aq3eUNq3AVyeEOdqJ2ZetF7t9xE_pfVequ4-cE8CpqFOEQLIun',
  callbackURL:  '/callback'
 },
 function(accessToken, refreshToken, extraParams, profile, done) {
   // accessToken is the token to call Auth0 API (not needed in the most cases)
   // extraParams.id_token has the JSON Web Token
   // profile has all the information from the user
   return done(null, profile);
 }
);

passport.use(strategy);


app.use(authRoutes)
app.use(goalRoutes);
app.use(commentRoutes);

mongoose.connect('mongodb://localhost:27017/personalGoals', { useNewUrlParser: true }).then(result => {
  app.listen(8080);
})
.catch(err => console.log(err))


