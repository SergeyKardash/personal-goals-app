const express = require('express');

const goalController = require('../controllers/goal');

const router = express.Router();

// GET /goals
router.get('/goals', goalController.getGoals);

// POST /goal
router.post('goal', goalController.createGoal);

module.exports = router;