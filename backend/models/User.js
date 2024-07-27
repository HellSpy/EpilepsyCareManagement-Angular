const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Patient', 'Doctor', 'Admin'], required: true },
  // Additional fields for patients
  medicalHistory: { type: Array, default: [] },
  medications: { type: Array, default: [] }
});

module.exports = mongoose.model('User', UserSchema);
