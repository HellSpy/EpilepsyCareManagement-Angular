const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const seizureLogsRoutes = require('./routes/seizureLogs');
const analyticsRouter = require('./routes/analytics');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/epilepsy_health_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit process with failure
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', patientRoutes);
app.use('/api', seizureLogsRoutes);
app.use('/api/analytics', analyticsRouter);

// Basic route
app.get('/', (req, res) => res.send('Hello World'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
