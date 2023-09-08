const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  email: String,
  wallet: { type: String, default: 0 },
  createdAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() }
})
const userModel = mongoose.model('user', userSchema)
module.exports = userModel
