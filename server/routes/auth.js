const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/callback', passport.authenticate('auth0', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.send('asdfasdf')
  });

router.get('/login', passport.authenticate('auth0', {}), function (req, res) {
  res.status(200).json({
    message: 'Success 2'
  })
});

module.exports = router;