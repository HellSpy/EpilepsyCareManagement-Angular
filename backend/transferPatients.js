const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'; // replace with MongoDB connection string
const dbName = 'epilepsy_health_system';

async function transferPatients() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');
    const seizureLogsCollection = db.collection('seizure_logs');

    // Fetch patient data from the users collection
    const patients = await usersCollection.find({ role: 'Patient' }, { projection: { name: 1, age: 1, gender: 1, dateOfBirth: 1 } }).toArray();

    // Insert patient data into the seizure_logs collection
    if (patients.length > 0) {
      const result = await seizureLogsCollection.insertMany(patients);
      console.log(`${result.insertedCount} patients transferred to seizure_logs collection`);
    } else {
      console.log('No patients found in users collection');
    }
  } catch (err) {
    console.error('Error transferring patients:', err);
  } finally {
    await client.close();
    console.log('Database connection closed');
  }
}

transferPatients();
