const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const cartypeValidator = [
  // validate({
    // validator: 'isLength',
    // arguments: [0, 40],
    // message: 'Car type must not exceed {ARGS[1]} characters.'
  // })
];

// Define the license plate number validator
const licenseplatenumberValidator = [
  // validate({
  //   validator: 'isAlphanumeric',
  //   message: 'License plate number must be alphanumeric.'
  // })
];

// Define the timein validator
const timeinValidator = [
  // Define your validation logic here
];

// Define the gateId validator
const gateIdValidator = [
  // Define your validation logic here
];
const timeoutValidator = [
  // Define your validation logic here
];
const base64Validator = [
  // Define your validation logic here
];


const CarSchema = new mongoose.Schema({
  cartype: {
    type: String,
    // required: [true, 'Car type is required.'],
    validate: cartypeValidator
  },
  licenseplatenumber: {
    type: String,
    validate: licenseplatenumberValidator
  },
  timein: {
    type: Date,
    validate: timeinValidator
  },
  gatein: {
    type: String,
    validate: gateIdValidator
  },
  timeout: {
    type: Date,
    validate: timeoutValidator
  },
  gateout: {
    type: String,
    validate: gateIdValidator
  },
  base64: {
    type: String,
    validate: base64Validator
  },
});

// Use the unique validator plugin
CarSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
