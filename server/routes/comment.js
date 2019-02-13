const express = require('express');

const commentController = require('../controllers/comment');

const router = express.Router();

// PUT /comment
router.put('/comment/:commentId/:goalId', commentController.updateComment);

// DELETE /comment
router.delete('/comment/:commentId/:goalId', commentController.deleteComment);

module.exports = router;