// testConnection.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/epilepsy_health_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  mongoose.connection.close();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
