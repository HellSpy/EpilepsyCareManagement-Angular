const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017/epilepsy_health_system'; // MongoDB connection

const medications = [
  {
    name: 'Valproic Acid',
    description: 'Valproic acid is an anticonvulsant medication primarily used to treat epilepsy and bipolar disorder.',
    sideEffects: 'Nausea, vomiting, dizziness, headache, and abdominal pain.',
    dosageInstructions: 'Follow your doctor\'s instructions. Typical dose is 500mg taken twice a day.',
    brandNames: ['Depakote', 'Stavzor'],
    interactions: 'Can interact with other anticonvulsants, aspirin, and certain antibiotics.',
    contraindications: 'Liver disease, urea cycle disorders, and known hypersensitivity.',
    commonUses: 'Epilepsy, bipolar disorder, and migraine prophylaxis.'
  },
  {
    name: 'Lamotrigine',
    description: 'Lamotrigine is used to prevent and control seizures. It is an anticonvulsant or antiepileptic drug.',
    sideEffects: 'Drowsiness, dizziness, headache, and blurred vision.',
    dosageInstructions: 'Typically started at a low dose and gradually increased. Follow your doctor\'s instructions.',
    brandNames: ['Lamictal'],
    interactions: 'Can interact with other anticonvulsants, hormonal contraceptives, and certain antidepressants.',
    contraindications: 'Known hypersensitivity to lamotrigine or any component of the formulation.',
    commonUses: 'Epilepsy and bipolar disorder.'
  },
  {
    name: 'Carbamazepine',
    description: 'Carbamazepine is an anticonvulsant and mood-stabilizing drug used primarily in the treatment of epilepsy and neuropathic pain.',
    sideEffects: 'Dizziness, drowsiness, unsteadiness, nausea, and vomiting.',
    dosageInstructions: 'Follow your doctor\'s instructions. Typical starting dose is 200mg twice a day.',
    brandNames: ['Tegretol', 'Carbatrol'],
    interactions: 'Can interact with certain antidepressants, antifungals, and other anticonvulsants.',
    contraindications: 'Bone marrow depression, known hypersensitivity to carbamazepine.',
    commonUses: 'Epilepsy, trigeminal neuralgia, and bipolar disorder.'
  },
  {
    name: 'Levetiracetam',
    description: 'Levetiracetam is an anticonvulsant medication used to treat epilepsy.',
    sideEffects: 'Drowsiness, dizziness, weakness, and infection.',
    dosageInstructions: 'Follow your doctor\'s instructions. Typical dose is 500mg twice a day.',
    brandNames: ['Keppra'],
    interactions: 'Generally has fewer drug interactions compared to other anticonvulsants.',
    contraindications: 'Known hypersensitivity to levetiracetam or any component of the formulation.',
    commonUses: 'Partial-onset, myoclonic, and tonic-clonic seizures.'
  },
  {
    name: 'Phenytoin',
    description: 'Phenytoin is an anticonvulsant used to control seizures.',
    sideEffects: 'Nausea, vomiting, constipation, dizziness, and drowsiness.',
    dosageInstructions: 'Follow your doctor\'s instructions. Typical dose is 100mg taken two to three times a day.',
    brandNames: ['Dilantin'],
    interactions: 'Can interact with other anticonvulsants, oral contraceptives, and certain antibiotics.',
    contraindications: 'Known hypersensitivity to phenytoin or any component of the formulation.',
    commonUses: 'Control of tonic-clonic and psychomotor seizures.'
  },
  {
    name: 'Topiramate',
    description: 'Topiramate is an anticonvulsant used to treat epilepsy and prevent migraines.',
    sideEffects: 'Tingling of the arms and legs, loss of appetite, nausea, diarrhea, and weight loss.',
    dosageInstructions: 'Follow your doctor\'s instructions. Typical dose is 25mg to 50mg taken twice a day.',
    brandNames: ['Topamax'],
    interactions: 'Can interact with other anticonvulsants, oral contraceptives, and certain diuretics.',
    contraindications: 'Known hypersensitivity to topiramate or any component of the formulation.',
    commonUses: 'Epilepsy and migraine prophylaxis.'
  }
];

async function run() {
  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('epilepsy_health_system');
    const collection = database.collection('medicationdetails'); // select the specific collection

    // Remove existing documents if any
    console.log('Removing existing documents...');
    const deleteResult = await collection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing documents.`);

    // Insert new documents
    console.log('Inserting new documents...');
    const result = await collection.insertMany(medications);
    console.log(`${result.insertedCount} medications inserted.`);
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    await client.close();
    console.log('Closed MongoDB connection');
  }
}

run().catch(console.dir);
