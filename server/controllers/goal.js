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
    .catch(err => console.log(err))
};