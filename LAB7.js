const { MongoClient } = require('mongodb');
async function main() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('myDB');
  const col = db.collection('users');
  // Insert sample data if collection is empty
  const current = await col.countDocuments();
  if (current === 0) {
    await col.insertMany([
      { username: 'user1', role: 'user', active: true, createdAt: new Date() },
      { username: 'admin', role: 'admin', active: true, createdAt: new Date() },
      { username: 'user2', role: 'user', active: true, createdAt: new Date() },
      { username: 'user3', role: 'user', active: true, createdAt: new Date() },
      { username: 'admin2', role: 'admin', active: true, createdAt: new Date() },
      // add more if desired
    ]);
    console.log('Inserted sample data.');
  }
  const total = await col.countDocuments({});
  const adminCount = await col.countDocuments({ role: 'admin' });
  const page = 2;
  const pageSize = 2;
  const skip = (page - 1) * pageSize;
  const docs = await col
    .find({ active: true })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize)
    .toArray();
  console.log('Total documents:', total);
  console.log('Admins count:', adminCount);
  console.log(`Page ${page} results (${docs.length} items):`, docs);
  await client.close();
}
main().catch(err => {
  console.error(err);
  process.exit(1);
});