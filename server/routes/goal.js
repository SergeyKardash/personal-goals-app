const express = require('express');

const goalController = require('../controllers/goal');

const router = express.Router();

// GET /goals
router.get('/goals', goalController.getGoals);

// GET /goal
router.get('/goal/:goalId', goalController.getGoal);

// POST /goal
router.post('/goal', goalController.createGoal);

module.exports = router;
