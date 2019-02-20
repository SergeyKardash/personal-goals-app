const User = require('../models/user');

exports.createUser = (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const user = new User({
    email: email, 
    name: name
  });
  User.findOne({email: email})
  .then((result) => {
    if (result) {
    return Promise.resolve(result);
    } else {
      return user.save()
    }
  })
  .then(result => {
    res.status(201).json({
      user: result
    });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err);
  })
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
  .populate('goals')
  .exec()
  .then((user) => {
    if (!user) {
      const error = new Error ('Could not find user');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({user: user})
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err);
  })
}