const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// GET /user
router.get('/user/:userId', userController.getUser);

// POST /user
router.post('/user', userController.createUser);

module.exports = router;