## 📘 Node.js HTTP Module – Demo Application

This simple Node.js project demonstrates the **built-in `http` module** without using Express or any external libraries.  
It helps students understand how Node handles **requests, responses, routing, headers, streaming, and client requests** using only core modules.

---

### 🧩 Project Structure

```
node-http-demo/
│
├── server.js    # HTTP server demonstrating multiple routes and features
├── client.js    # Simple Node client that makes GET and POST requests to the server
└── public/
    └── hello.txt   # A small text file served by the server
```

---

### 🛠️ 1. Setup Instructions

1. **Install Node.js** (v18+ recommended).  
   Check:

   ```bash
   node -v
   ```

2. **Create a new folder** for the demo and open it in VS Code or terminal:

   ```bash
   mkdir node-http-demo
   cd node-http-demo
   ```

3. **Add the two files** from this lesson:

   - `server.js` (HTTP server)
   - `client.js` (example HTTP client)

4. No external installation needed — both use **built-in modules only** (`http`, `fs`, `path`, `url`, `querystring`).

---

### 🚀 2. Running the Server

Start the server:

```bash
node server.js
```

Expected console output:

```
HTTP demo server running at http://localhost:3000/
```

Keep this terminal open — the server listens for incoming requests.

---

### 🧠 3. Understanding `server.js`

#### 🔹 Modules Used

- `http` → creates server and handles requests/responses
- `fs` → reads and streams files
- `path` → constructs platform-independent file paths
- `url` & `querystring` → parse URLs and query parameters

#### 🔹 Key Features Demonstrated

| Route               | Description                       | Concepts Demonstrated                        |
| ------------------- | --------------------------------- | -------------------------------------------- |
| `/`                 | Default route                     | Basic text response                          |
| `/json`             | Returns JSON                      | `res.writeHead()`, JSON response             |
| `/echo` (POST)      | Echoes POST body                  | Handling request body, `data` & `end` events |
| `/static/hello.txt` | Serves a static file              | Using `fs.readFileSync()`, headers           |
| `/stream`           | Streams a file repeatedly         | Chunked responses, streaming                 |
| `/redirect`         | Redirects to `/`                  | HTTP status code 302 & `Location` header     |
| `/outgoing`         | Server makes its own HTTP request | Using `http.get()` internally                |

#### 🔹 Additional Examples

- Custom headers (`X-Demo`)
- `Cache-Control` for caching static files
- Server configuration (`keepAliveTimeout`, `headersTimeout`)

---

### 🧪 4. Running the Client

Open **a new terminal tab** (keep the server running), and execute:

```bash
node client.js
```

Expected output:

```
GET /json status: 200
GET response body: {"message":"This is JSON","time":"..."}

POST /echo status: 200
POST response body: {"received":{"name":"student","score":95}}
```

---

### 🌐 5. Test Endpoints Manually

Try the following commands (or use your browser / Postman):

| Command                                                                                          | Description                     |
| ------------------------------------------------------------------------------------------------ | ------------------------------- |
| `curl http://localhost:3000/`                                                                    | Default text route              |
| `curl http://localhost:3000/json`                                                                | JSON API                        |
| `curl -X POST http://localhost:3000/echo -d "hello world"`                                       | POST raw text                   |
| `curl -X POST http://localhost:3000/echo -H "Content-Type: application/json" -d '{"x":1,"y":2}'` | POST JSON                       |
| `curl http://localhost:3000/static/hello.txt`                                                    | Fetch static file               |
| `curl http://localhost:3000/stream`                                                              | Observe chunked streaming       |
| `curl -I http://localhost:3000/redirect`                                                         | See redirect headers            |
| `curl http://localhost:3000/outgoing`                                                            | Server calling its own endpoint |

---

### 💬 6. Discussion & Teaching Points

| Topic                    | Key Idea                                           | Quick Demo                      |
| ------------------------ | -------------------------------------------------- | ------------------------------- |
| Request/Response Streams | Both are readable/writable streams                 | Log `req.headers`, `req.method` |
| Routing                  | Use `if` / map to match URL paths                  | Show `pathname` parsing         |
| Reading POST Data        | Listen for `'data'` and `'end'` events             | Inspect chunks                  |
| Status Codes             | Use `res.writeHead(code, headers)`                 | Try changing to `404`           |
| Headers                  | Use `res.setHeader()` or directly in `writeHead()` | Add custom headers              |
| Streaming                | Use `fs.createReadStream()` and `pipe()`           | Check chunked transfer          |
| Redirects                | Status code 302 + `Location` header                | Test with `/redirect`           |
| Outgoing Requests        | Server as client via `http.get()`                  | `/outgoing` endpoint            |

---

### 🧭 7. Suggested Classroom Flow

1. **Intro (10 min)** – Discuss what happens when a browser hits a URL.
2. **Code Walkthrough (15 min)** – Explain each route & how `req`/`res` work.
3. **Live Demo (15 min)** – Run curl commands and show streaming & redirect.
4. **Activity (15 min)** – Ask students to:
   - Add a `/time` route returning current server time
   - Modify `/echo` to count requests
   - Serve an HTML file under `/page`
5. **Wrap-up Discussion (5 min)** – Compare with Express and explain how Express automates these manual steps.

---

### 📚 8. Concepts Reinforced

- HTTP fundamentals (methods, status codes, headers)
- Node.js as an event-driven server
- Streams and backpressure
- JSON vs plain text responses
- Outgoing HTTP requests in Node.js

---

### 🧩 9. Optional Extension Ideas

- Add `/upload` route to handle file uploads (using streams)
- Add `/download` to send a large generated file
- Introduce environment variable for `PORT`
- Replace manual routing with a mini custom router function

---

### ✅ 10. Cleanup & Stop

To stop the server:

```bash
CTRL + C
```

---

### 🎓 Summary

| Component        | Purpose                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| `server.js`      | Teaches HTTP server-side concepts (requests, routes, headers, streams) |
| `client.js`      | Teaches outgoing requests and Node as an HTTP client                   |
| `curl` / browser | Reinforces request-response understanding                              |
