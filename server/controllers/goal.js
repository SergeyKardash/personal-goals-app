const Goal = require('../models/goal')

exports.getGoals = (req, res, next) => {
  Goal.find()
    .select('-__v')
    .then(result => {
      console.log(result);
      res.status(200).json({
        goals: result
      });
    })
    .catch(err => console.log(err))
};

exports.getGoal = (req, res, next) => {
  const goalId = req.params.goalId;
  Goal.findById(goalId)
    .then((goal) => {
      if (!goal) {
        const error = new Error ('Could not find post');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({goal: goal})
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
}

exports.createGoal = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const goal = new Goal({
    title: title, 
    description: description
  });
  goal.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Goal created successfully!',
        goal: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
};