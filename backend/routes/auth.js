const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log(`User already exists: ${email}`);
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    console.log(`User registered successfully: ${email}`);
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(`Error in register route: ${err.message}`);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Invalid credentials: ${email}`);
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Invalid credentials for user: ${email}`);
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,  // Add email to the payload
        role: user.role
      }
    };

    // Sign token
    jwt.sign(
      payload,
      'secret', // Replace with your own secret
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        console.log(`User logged in successfully: ${email}`);
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(`Error in login route: ${err.message}`);
    res.status(500).send('Server error');
  }
});


module.exports = router;
