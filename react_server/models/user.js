const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const nameValidator = [
  // validate({
  //   validator: 'isLength',
  //   arguments: [0, 40],
  //   message: 'Name must not exceed {ARGS[1]} characters.'
  // })
];

const emailValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Email must not exceed {ARGS[1]} characters.'
  }),
  validate({
    validator: 'isEmail',
    message: 'Email must be valid.'
  })
];

const ageValidator = [
  // TODO: Make some validations here...
];

const genderValidator = [
  // TODO: Make some validations here...
];

const passwordValidator = [
  // TODO: Make some validations here...
];
const roleValidator = [
  // TODO: Make some validations here...
];
// Define the database model
const resetPasswordTokenValidator = [
  // TODO: Make some validations here...
];
const resetPasswordExpiresValidator = [
  // TODO: Make some validations here...
];
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: nameValidator
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: emailValidator
  },
  age: {
    type: Number,
    validate: ageValidator
  },
  gender: {
    type: String,
    validate: genderValidator
  },
  password: {
    type: String,
    validate: passwordValidator
  },
  role: {
    type: String,
    validate: roleValidator
  },
  resetPasswordToken: {
    type: String,
    validate: resetPasswordTokenValidator
  },
  resetPasswordExpires: {
    type: Date,
    validate: resetPasswordExpiresValidator
  }
});

// Use the unique validator plugin
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const User = module.exports = mongoose.model('user', UserSchema);
