const Comment = require('../models/comment');
const Goal = require('../models/goal');

exports.updateComment = (req, res, next) => {
  const commentId = req.params.commentId;
  const goalId = req.params.goalId;
  const message = req.body.message;

  Goal.findById(goalId)
    .then((goal) => {
      if (!goal) {
        const error = new Error ('Could not find goal');
        error.statusCode = 404;
        throw error;
      }
      const comment = goal.comments.id(commentId)
      if (!comment) {
        const error = new Error ('Could not find comment');
        error.statusCode = 404;
        throw error;
      } 
      comment.message = message;
      return goal.save();
    })
    .then((result) => {
      res.status(200).json({goal: result});
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    });
}

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.commentId;
  const goalId = req.params.goalId;

  Goal.findById(goalId)
    .then((goal) => {
      if (!goal) {
        const error = new Error ('Could not find goal');
        error.statusCode = 404;
        throw error;
      }
      const comment = goal.comments.id(commentId)
      if (!comment) {
        const error = new Error ('Could not find comment');
        error.statusCode = 404;
        throw error;
      } 
      comment.remove();
      return goal.save();
    })
    .then((result) => {
      res.status(200).json({goal: result});
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    });
}