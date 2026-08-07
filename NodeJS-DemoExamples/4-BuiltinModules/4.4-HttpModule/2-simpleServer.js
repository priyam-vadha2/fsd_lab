/**
 * simpleServer.js
 * Simple Node HTTP demo server (no external dependencies)
 *
 * Demonstrates:
 * - creating an HTTP server
 * - basic routing (GET/POST)
 * - reading query strings
 * - reading POST body (streamed)
 * - setting headers & status codes
 * - serving a small static file
 * - streaming a large file with createReadStream (shows chunked responses)
 * - redirecting
 * - simple JSON API
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');           // to parse URL + query
const querystring = require('querystring');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// ensure public directory exists and has a sample file
if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR);
fs.writeFileSync(path.join(PUBLIC_DIR, 'hello.txt'), 'Hello from static file!\n', { flag: 'w' });

/**
 * Helper: send JSON response
 */
function sendJSON(res, statusCode, obj) {
  const payload = JSON.stringify(obj);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'X-Demo': 'node-http-module'
  });
  res.end(payload);
}

/**
 * Helper: send plain text
 */
function sendText(res, statusCode, text) {
  res.writeHead(statusCode, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end(text);
}

/**
 * Route handlers map (simple)
 */
const handlers = {
  '/': (req, res, parsedUrl) => {
    sendText(res, 200, 'Node http demo server\nAvailable routes: /, /json, /echo (POST), /static/hello.txt, /stream, /redirect, /outgoing');
  },

  '/json': (req, res) => {
    // example JSON API
    sendJSON(res, 200, { message: 'This is JSON', time: new Date().toISOString() });
  },

  '/echo': (req, res) => {
    // echo POST body back as JSON
    if (req.method !== 'POST') {
      sendText(res, 405, 'Method Not Allowed - use POST');
      return;
    }

    let chunks = [];
    req.on('data', (chunk) => {
      // body data arrives in chunks
      chunks.push(chunk);
      // simple protection: don't accept very large bodies in demo
      if (Buffer.concat(chunks).length > 1e6) { // ~1MB
        res.writeHead(413, { 'Content-Type': 'text/plain' });
        res.end('Payload Too Large');
        req.connection.destroy();
      }
    });

    req.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      // try to parse as JSON, otherwise return raw text
      try {
        const parsed = JSON.parse(body);
        sendJSON(res, 200, { received: parsed });
      } catch (e) {
        sendJSON(res, 200, { receivedText: body });
      }
    });
  },

  '/static/hello.txt': (req, res) => {
    // serve a small static file synchronously (simple)
    const filePath = path.join(PUBLIC_DIR, 'hello.txt');
    if (!fs.existsSync(filePath)) {
      sendText(res, 404, 'Not found');
      return;
    }
    // set caching header example
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=60'
    });
    res.end(fs.readFileSync(filePath, 'utf8'));
  },

  '/stream': (req, res) => {
    // stream a large/simulated large file using createReadStream
    // We'll stream the same hello.txt repeatedly to simulate a bigger stream (demo)
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      // Note: Not setting Content-Length causes transfer-encoding: chunked automatically
      'Transfer-Encoding': 'chunked'
    });

    // Stream the file 10 times with small delay to show chunked arrival in client
    const filePath = path.join(PUBLIC_DIR, 'hello.txt');
    let i = 0;
    function pipeOne() {
      if (i++ >= 10) {
        res.end('--- stream end ---\n');
        return;
      }
      const rs = fs.createReadStream(filePath);
      rs.pipe(res, { end: false }); // keep response open
      rs.on('end', () => {
        res.write(`--- chunk ${i} done ---\n`);
        setTimeout(pipeOne, 200); // small pause between chunks
      });
      rs.on('error', err => {
        console.error('Read stream error', err);
        res.end();
      });
    }
    pipeOne();
  },

  '/redirect': (req, res) => {
    // demonstrate redirect (302)
    res.writeHead(302, { Location: '/' });
    res.end('Redirecting to /');
  },

  '/outgoing': (req, res) => {
    // Demonstrates making an outgoing HTTP request (server acts as client)
    // We'll call our own /json endpoint using http.get
    const httpClient = require('http');
    httpClient.get(`http://localhost:${PORT}/json`, (r) => {
      let data = '';
      r.on('data', chunk => data += chunk);
      r.on('end', () => {
        // forward received JSON body to the original client
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ fromOutgoingCall: JSON.parse(data) }));
      });
    }).on('error', (err) => {
      sendText(res, 500, 'Outgoing request failed: ' + err.message);
    });
  }
};

/**
 * Main server
 */
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  // log requests (simple)
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // parse query string (demonstration)
  const query = querystring.parse(parsedUrl.query);

  // simple routing: exact path match first
  if (handlers[pathname]) {
    try {
      handlers[pathname](req, res, parsedUrl, query);
    } catch (err) {
      console.error('Handler error', err);
      sendText(res, 500, 'Internal Server Error');
    }
    return;
  }

  // fallback: show 404 and echo query example
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found. Try /, /json, /echo, /static/hello.txt, /stream, /redirect, /outgoing\n' +
          `Query: ${JSON.stringify(query)}`);
});

/**
 * Demonstrate server 'listening', and also show keepAliveTimeout example
 */
server.keepAliveTimeout = 61 * 1000; // milliseconds (example)
server.headersTimeout = 65 * 1000; // headers must arrive within this

server.listen(PORT, () => {
  console.log(`HTTP demo server running at http://localhost:${PORT}/`);
});
