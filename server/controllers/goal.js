exports.getGoals = (req, res, next) => {
  res.status(200).json({
    goals: [{title: 'Firs Goal', description: 'Goal Description'}]
  });
};

exports.createGoal = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  // Create Goal in db
  res.status(201).json({
    message: 'Goal created successfully!',
    goal: { id: new Date().toISOString(), title: title, description: description}
  });
};