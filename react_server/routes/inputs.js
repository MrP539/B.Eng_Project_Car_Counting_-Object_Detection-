const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const Input = require('../models/input');

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = rateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minutes.` });
  }
});

// Minor sanitizing to be invoked before reaching the database
sanitizeInput = (input) => {
  return {
    ingate: input.ingate,
    outgate: input.outgate,
    intime: input.intime,
    outtime: input.outtime,
    description: input.description
  };
}

// Function to capitalize the first letter of each word in the string
sanitizeName = (name) => {
  return stringCapitalizeName(name);
}

// Middleware for sanitizing inputs
const sanitizeInputMiddleware = (req, res, next) => {
  req.body = sanitizeInput(req.body);
  next();
};

// READ (ONE)
router.get('/:id', (req, res) => {
  Input.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such input.` });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  Input.find({})
    .then((result) => {
      res.header("Access-Control-Allow-Origin", "*")
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post('/', postLimiter, sanitizeInputMiddleware, (req, res) => {
  console.log(req.body)
  let newInput = new Input({
    ingate: req.body.ingate,
    outgate: req.body.outgate,
    intime: req.body.intime,
    outtime: req.body.outtime,
    description: req.body.description
  });

  newInput.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          ingate: result.ingate,
          outgate: result.outgate,
          intime: result.intime,
          outtime: result.outtime,
          description: result.description
        }
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.ingate) {
          res.status(400).json({ success: false, msg: err.errors.ingate.message });
          return;
        }
        if (err.errors.description) {
          res.status(400).json({ success: false, msg: err.errors.description.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// UPDATE
router.put('/:id', sanitizeInputMiddleware, (req, res) => {
  let updatedInput = {
    ingate: req.body.ingate,
    outgate: req.body.outgate,
    intime: req.body.intime,
    outtime: req.body.outtime,
    description: req.body.description
  };

  Input.findOneAndUpdate({ _id: req.params.id }, updatedInput, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      Input.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              ingate: newResult.ingate,
              outgate: newResult.outgate,
              intime: newResult.intime,
              outtime: newResult.outtime,
              description: newResult.description
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.ingate) {
          res.status(400).json({ success: false, msg: err.errors.ingate.message });
          return;
        }
        if (err.errors.description) {
          res.status(400).json({ success: false, msg: err.errors.description.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  Input.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          ingate: result.ingate,
          description: result.description
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;
