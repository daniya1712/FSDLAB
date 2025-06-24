const http = require('http');
const url = require('url');


// Create HTTP server
http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true); // true to get query as object
  const pathname = parsedUrl.pathname;
 if (pathname === '/') {
    // Serve form HTML
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
<h2>Enter Your Info</h2>
<form action="/submit" method="get">
        Name: <input type="text" name="name" /><br><br>
        Age: <input type="number" name="age" /><br><br>
<input type="submit" value="Submit" />
</form>
    `);
    res.end();
  } else if (pathname === '/submit') {
    // Handle query string data
    const name = parsedUrl.query.name;
const age = parsedUrl.query.age;
 res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h3>Hello, ${name}!</h3>`);
    res.write(`<p>Your age is ${age}.</p>`);
    res.end();
  } else {
    // 404 Not Found
    res.writeHead(404, { 'Content-Type': 'text/plain' });
res.end('404 Not Found');
 }
}).listen(3002);
console.log('🌐 Server running at http://localhost:3002');