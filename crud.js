const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'college';
const collectionName = 'students';
async function runCRUD() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db(dbName);
    const students = db.collection(collectionName);
    // 1️⃣ CREATE: Insert a new student
    const createResult = await students.insertOne({
      name: "Chandana",
      age: 21,
      branch: "CSE"
    });
    console.log("📦 Document Inserted:", createResult.insertedId);
    // 2️⃣ READ: Find all students
    const readResult = await students.find({}).toArray();
    console.log("📖 All Students:", readResult);
    // 3️⃣ UPDATE: Update student's branch
    const updateResult = await students.updateOne(
      { name: "Chandana" },
      { $set: { branch: "AI-ML" } }
    );
    console.log(`🔧 Matched: ${updateResult.matchedCount}, Modified: ${updateResult.modifiedCount}`);
    // 4️⃣ DELETE: Delete the student
    const deleteResult = await students.deleteOne({ name: "Chandana" });
    console.log(`🗑️ Deleted Count: ${deleteResult.deletedCount}`);
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    // Close connection
    await client.close();
    console.log("🔌 Connection closed");
  }
}
runCRUD();