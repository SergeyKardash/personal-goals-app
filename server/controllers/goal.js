const Goal = require('../models/goal');
const Comment = require('../models/comment');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require("nodemailer");

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

exports.addComment = (req, res, next) => {
  const goalId = req.params.goalId
  const message = req.body.message;
  const userEmail = req.body.userEmail;
  Goal.findById(goalId)
    .then((goal) => {
      if (!goal) {
        const error = new Error ('Could not find goal')
        error.status = 404;
        throw error;
      }
      goal.comments.push(new Comment({
        message: message,
        userEmail: userEmail
      }))
      return goal.save()
    })
    .then((result) => {
      res.status(200).json({goal: result});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err);
    })
}

exports.sendEmailForFeedback = (req, res, next) => {
  const email = req.body.email;
  const link = req.body.link;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    to: email,
    subject: "Personal Goal's App",
    html: `Hello. You have been invited for feedback. Leave feedback for the goal by link: ${link}`
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      next(err);
    } else {
      console.log(info);
      res.status(200).json({msg: 'success'})
    }
  });
}