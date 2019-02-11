const Goal = require('../models/goal')

exports.getGoals = (req, res, next) => {
  Goal.find()
    .select('-__v')
    .then(result => {
      res.status(200).json({
        goals: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
};

exports.getGoal = (req, res, next) => {
  const goalId = req.params.goalId;
  Goal.findById(goalId)
    .then((goal) => {
      if (!goal) {
        const error = new Error ('Could not find goal');
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
  const status = req.body.status;
  const goal = new Goal({
    title: title, 
    description: description,
    status: status
  });
  goal.save()
    .then(result => {
      res.status(201).json({
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

exports.updateGoal = (req, res, next) => {
  const goalId = req.params.goalId
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const canComment = req.body.canComment;
  Goal.findById(goalId)
    .then((goal) => {
      if (!goal) {
        const error = new Error ('Could not find goal');
        error.statusCode = 404;
        throw error;
      }
      goal.title = title;
      goal.description = description;
      goal.status = status;
      goal.canComment = canComment;
      return goal.save();
    })
    .then (result => {
      res.status(200).json({goal: result});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
}

exports.deleteGoal = (req, res, next) => {
  const goalId = req.params.goalId;
  Goal.findById(goalId)
    .then((goal) => {
      if (!goal) {
        const error = new Error ('Could not find goal')
        error.status = 404;
        throw error;
      }
      return Goal.findByIdAndRemove(goalId)
    })
    .then((result) => {
      res.status(200).json({message: 'Goal deleted', goal: result})
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })

}