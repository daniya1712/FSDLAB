const http = require('http');
const url = require('url');
const querystring = require('querystring');
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const queryData = querystring.parse(parsedUrl.query);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  if (Object.keys(queryData).length > 0) {
    res.write('<h2>Form Data Received:</h2>');
    res.write(`<p><strong>Name:</strong> ${queryData.name || 'N/A'}</p>`);
    res.write(`<p><strong>Email:</strong> ${queryData.email || 'N/A'}</p>`);
    res.end(); // Correct: End after all writes
  } else {
    res.write('<h2>Please submit the form data in the query string</h2>');
    res.end(); // Still needed here
  }
});
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
