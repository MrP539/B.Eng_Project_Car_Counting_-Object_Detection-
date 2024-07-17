const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const Sum = require('../models/sum');

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


// READ (ONE)
router.get('/:id', (req, res) => {
  Sum.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such sum.` });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  const { gatein } = req.query;
  const { gateout } = req.query;
  const { timein } = req.query;
  const { timeout } = req.query;
  let query = {}; // กำหนด query เริ่มต้นเป็นว่าง

  if (gatein) {
    query = { gatein: gatein };
  }

  if (gateout) {
    query = { gateout: gateout };
  }

  if (timein) {
    query = { timein: { $regex : timein } };
    // query = { $lt: timein };
  }
  if (timeout) {
    query = { timeout: {$regex : timeout } };
  }

   if (gatein && timein) {
    query = { ...query, gatein: gatein, timein: { $regex : timein } };
  } else if (gatein && timeout) {
    query = { ...query, gatein: gatein, timeout: { $regex : timeout } };
  } else if (gateout && timein) {
    query = { ...query, gateout: gateout, timein: { $regex : timein } };
  } else if (gateout && timeout) {
    query = { ...query, gateout: gateout, timeout: { $regex : timeout } };
  }


  Sum.find(query) // แก้ไข YourModel เป็นชื่อโมเดลของคุณ
    .then((result) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});


// CREATE
router.post('/', postLimiter, (req, res) => {

  // Validate the age
  
  let newSum = new Sum({
    sum: req.body.sum,
    sumcar: req.body.sumcar,
    sumtruck: req.body.sumtruck,
    summotorbike: req.body.summotorbike,
    gatein: req.body.gatein,
    gateout: req.body.gateout,
    timein: req.body.timein,
    timeout: req.body.timeout
  });

  newSum.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          sum: result.sum,
          sumcar: result.sumcar,
          sumtruck:result.sumtruck,
          summotorbike: result.summotorbike,
          gatein: result.gatein,
          gateout: result.gateout,
          timein: result.timein,
          timeout: result.timeout,
        }
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.sum) {
          res.status(400).json({ success: false, msg: err.errors.sum.message });
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
router.put('/:id', (req, res) => {


  let updatedSum = {
    sum: req.body.sum,
    sumcar: req.body.sumcar,
    sumtruck: req.body.sumtruck,
    summotorbike: req.body.summotorbike,
    gatein: req.body.gatein,
    gateout: req.body.gateout,
    timein: req.body.timein,
    timeout: req.body.timeout
  };

  Sum.findOneAndUpdate({ _id: req.params.id }, updatedSum, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      Sum.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              sum: newResult.sum,
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
        if (err.errors.sum) {
          res.status(400).json({ success: false, msg: err.errors.sum.message });
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

  Sum.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          sum: result.sum,
          sumcar: result.sumcar,
          sumtruck: result.sumtruck,
          summotorbike: result.summotorbike,
          gatein: result.gatein,
          gateout: result.gateout,
          timein: result.timein,
          timeout: result.timeout
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeName = (sum) => {
  return stringCapitalizeName(sum);
}
sanitizeAge = (age) => {
  // Return empty if age is non-numeric
  if (isNaN(age) && age != '') return '';
  return (age === '') ? age : parseInt(age);
}
sanitizeGender = (gender) => {
  // Return empty if it's neither of the two
  return (gender === 'm' || gender === 'f') ? gender : '';
}
