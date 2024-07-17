const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];

const descriptionValidator = [
    // TODO: Make some validations here...
  ];

// Define the database model
const GateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: nameValidator
  },
  description: {
    type: String,
    validate: descriptionValidator
  },
});

// Use the unique validator plugin
GateSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Gate = module.exports = mongoose.model('gate', GateSchema);
