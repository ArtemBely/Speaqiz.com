const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const regSchema = new Schema ({
  name: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  score: {type: Number, required: true},
  city: {type: String},
  telephone: {type: String}
});


module.exports = mongoose.model('User', regSchema);
module.exports.createUser = function(newUser, callback) {
var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
}
