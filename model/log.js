
const mongoose = require('mongoose');

const { Schema } = mongoose;
const logSchema = new Schema({
  log: String
});

module.exports = mongoose.model('log', logSchema);
