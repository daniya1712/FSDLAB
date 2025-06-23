const http = require('http');
const qs = require('querystring');
const users = { Akhila: '123456' };
const html = `
  <html><body>
    <h2>Login</h2>
    <form method="POST">
      Username: <input name="username"><br/>
      Password: <input name="password" type="password"/><br/>
      <button type="submit">Login</button>
    </form>
  </body></html>
`;
http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { username, password } = qs.parse(body);
      if (users[username] === password) {
        res.end('Login Successful!');
      } else {
        res.end('Invalid Username and/or Password.');
      }
    });
  }
}).listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});