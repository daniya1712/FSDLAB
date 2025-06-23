const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017'; // Use your Atlas URL if needed
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    const db = client.db("collegeDB");
    const collection = db.collection("students");
    // 1. CREATE (Insert Documents)
    await collection.insertMany([
      { name: "John", age: 22, course: "Math" },
      { name: "Jane", age: 21, course: "Science" },
      { name: "Mike", age: 23, course: "History" }
    ]);
    console.log("🟢 Documents inserted");
    // 2. READ (Find Documents)
    const allStudents = await collection.find().toArray();
    console.log("📋 All Students:", allStudents);
    // 3. UPDATE (Update One Document)
    await collection.updateOne({ name: "Jane" }, { $set: { age: 22 } });
    console.log("🔄 Updated Jane's age");
    // 4. DELETE (Delete One Document)
    await collection.deleteOne({ name: "Mike" });
    console.log("🗑️ Deleted Mike");
    // Final Output
    const finalList = await collection.find().toArray();
    console.log("📋 Final List:", finalList);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}
main();