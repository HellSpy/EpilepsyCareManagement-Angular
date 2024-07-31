// hashPassword.js
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = 'mongodb://127.0.0.1:27017'; // connection string
const dbName = 'epilepsy_health_system';

async function hashAndUpdatePassword(email, plainPassword) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // Find the user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      console.error('User not found');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Update the user's password
    const result = await usersCollection.updateOne({ email }, { $set: { password: hashedPassword } });

    if (result.modifiedCount > 0) {
      console.log('Password updated successfully');
    } else {
      console.log('Password update failed');
    }
  } catch (err) {
    console.error('Error updating password:', err);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

const email = 'john.doe@example.com'; // email
const plainPassword = 'hashedpassword123'; // plain text password

hashAndUpdatePassword(email, plainPassword);
