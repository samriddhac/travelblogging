const fs = require('fs');
const http = require('http');
const https = require('https');
const app = require('./server');
const path = require('path');
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

https.createServer({
      key: fs.readFileSync(path.join(__dirname, 'cert/key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert/cert.pem'))
    }, app).listen(8443);