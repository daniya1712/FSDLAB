const fs = require('fs');
const filePath = 'sample.txt';
try {
  // 1. Write to a file
  fs.writeFileSync(filePath, 'This is the initial content.\n');
  console.log('File written successfully.');
  // 2. Read the file
  const data = fs.readFileSync(filePath, 'utf8');
  console.log('File content after write:\n' + data);
  // 3. Append to the file
  fs.appendFileSync(filePath, 'This is appended content.\n');
  console.log('Content appended successfully.');
  // 4. Read again to see appended content
  const updatedData = fs.readFileSync(filePath, 'utf8');
  console.log('File content after append:\n' + updatedData);
  // 5. Rename the file
  const newFilePath = 'renamed_sample.txt';
  fs.renameSync(filePath, newFilePath);
  console.log(`File renamed to ${newFilePath}`);
  // 6. Delete the file
  fs.unlinkSync(newFilePath);
  console.log('File deleted successfully.');
} catch (err) {
  console.error('Error:', err);
}