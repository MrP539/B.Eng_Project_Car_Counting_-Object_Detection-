const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');


const intimeValidator = [

];


const outtimeValidator = [
 
];

const gateIdValidator = [
    // Define your validation logic here
  ];

const inputSchema = new mongoose.Schema({
  
  intime: {
    type: Date,
    validate: intimeValidator
  },
  outtime: {
    type: Date,
    validate: outtimeValidator
  },
  ingate: {
    type: String,
    validate: gateIdValidator,
  },
  outgate: {
    type: String,
    validate: gateIdValidator
  }
});


inputSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const input = mongoose.model('input', inputSchema);

module.exports = input;
