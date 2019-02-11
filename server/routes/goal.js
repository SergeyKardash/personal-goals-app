const express = require('express');

const goalController = require('../controllers/goal');

const router = express.Router();

// GET /goals
router.get('/goals', goalController.getGoals);

// GET /goal
router.get('/goal/:goalId', goalController.getGoal);

// PUT /goal 
router.put('/goal/:goalId', goalController.updateGoal);

// POST /goal
router.post('/goal', goalController.createGoal);

// DELETE /goal
router.delete('/goal/:goalId', goalController.deleteGoal);

//POST /sendEmail
router.post('/sendEmail', goalController.sendEmailForFeedback);

module.exports = router;
