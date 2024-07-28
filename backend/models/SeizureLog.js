const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for the seizure logs
const SeizureLogSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  seizureLogs: [
    {
      id: { type: String, required: true },
      date: { type: Date, required: true },
      type: { type: String, required: true },
      duration: { type: String, required: true },
      triggers: { type: String, required: true }
    }
  ]
}, { collection: 'seizure_logs' }); // Explicitly set the collection name

module.exports = mongoose.model('SeizureLog', SeizureLogSchema);
