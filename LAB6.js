const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db('schoolDB'); // Creates or uses database
    const collection = db.collection('students'); // Creates or uses collection
    // Insert documents
    await collection.insertMany([
      { name: 'Alice', age: 21, course: 'Math' },
      { name: 'Bob', age: 22, course: 'Physics' }
    ]);
    console.log("✅ Documents inserted");
    // Find documents
    const allStudents = await collection.find().toArray();
    console.log("📋 All Students:", allStudents);
    // Update one document
    await collection.updateOne({ name: 'Alice' }, { $set: { age: 23 } });
    console.log("🔄 Updated Alice's age");
    // Delete one document
    await collection.deleteOne({ name: 'Bob' });
    console.log("🗑️ Deleted Bob");
    // Final check
    const updatedList = await collection.find().toArray();
    console.log("📋 Final List:", updatedList);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}
main();