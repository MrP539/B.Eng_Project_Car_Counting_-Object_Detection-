const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { validate, ValidationError } = require('mongoose-validator');

// Define validators
const sumValidator = [
//   validate({
//     validator: 'isNumeric',
//     message: 'Sum must be a numeric value.'
//   })
];

const timeinValidator = [
  // Define your validation logic for 'timein' here
];

const timeoutValidator = [
  // Define your validation logic for 'timeout' here
];

const gateIdValidator = [
  // Define your validation logic for 'gatein' and 'gateout' here
];

// Define Schema
const SumSchema = new mongoose.Schema({
  timein: {
    type: String,
    validate: timeinValidator
  },
  gatein: {
    type: String,
    validate: gateIdValidator
  },
  timeout: {
    type: String,
    validate: timeoutValidator
  },
  gateout: {
    type: String,
    validate: gateIdValidator
  },
  sumcar: {
    type: Number,
    validate: sumValidator
  },
  sumtruck: {
    type: Number,
    validate: sumValidator
  },
  summotorbike: {
    type: Number,
    validate: sumValidator
  },
  sum: {
    type: Number,
    validate: sumValidator
  }
});

// Apply unique validator
SumSchema.plugin(uniqueValidator, { message: 'That {PATH} is already taken.' });

// Create Model
const Sum = mongoose.model('Sum', SumSchema);

module.exports = Sum;
