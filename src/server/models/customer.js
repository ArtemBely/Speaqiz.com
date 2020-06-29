const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customSchema = new Schema({
  name: {type: String, require: true},
  age: {type: String, require: true},
  weight: {type: String, require: true}
});

module.exports = mongoose.model('Custom', customSchema);
