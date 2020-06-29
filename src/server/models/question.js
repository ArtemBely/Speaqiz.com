const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema ({
  name: { type: String, require: true },
  first: { type: String, require: true },
  second: { type: String, require: true },
  third: { type: String, require: true },
  right: { type: String, require: true },
  coverImageName: { type: String, require: true }
});

module.exports = mongoose.model('Question', questSchema);
