/**
 * 2-async-blockingcode.js
 *
 * Demonstrates a blocking endpoint that freezes the server even though
 * other endpoints are lightweight. Includes fixed versions:
 *  - /fixed-chunked  -> cooperative chunking using setImmediate
 *  - /fixed-worker   -> offload work to a Worker Thread
 *
 * Usage:
 *   node server_blocking_demo.js
 *
 * In terminals for testing:
 *   # Start server
 *   node server_blocking_demo.js
 *
 *   # In another terminal: quick response endpoint
 *   curl http://localhost:4000/fast
 *
 *   # Trigger the blocking endpoint (this will block everything)
 *   curl http://localhost:4000/heavy-blocking
 *
 *   # While the blocking endpoint is running, try:
 *   curl http://localhost:4000/fast
 *   # -> You will notice slow or no response until heavy-blocking finishes
 *
 *   # Try fixed endpoints:
 *   curl http://localhost:4000/fixed-chunked
 *   curl http://localhost:4000/fixed-worker
 *
 * Teaching points (inline comments below):
 *  - "async" function doesn't make CPU-bound tasks non-blocking.
 *  - If you run heavy synchronous work on the main thread, Node's event loop is blocked.
 *  - Fixes: cooperative yielding (setImmediate) or Worker Threads.
 */

const http = require('http');
const { Worker, isMainThread, parentPort } = require('worker_threads');

const PORT = 4000;

/* ----------------------------
   Synchronous heavy computation
   ----------------------------
   This simulates a CPU-bound job (e.g., processing large array, crypto, image transformation).
   It is synchronous and will block the event loop while running.
*/
function heavySyncComputation(iterations = 5e8) {
  // NOTE: iterations default is intentionally large for demo on reasonably fast machines.
  // Reduce number if it takes too long on student machines.
  let count = 0;
  for (let i = 0; i < iterations; i++) {
    // Some meaningless math to keep CPU busy
    count += Math.sqrt(i % 1000);
  }
  return count;
}

/* ----------------------------
   Cooperative chunked computation
   ----------------------------
   Break the big job into small chunks and yield to the event loop between chunks
   using setImmediate. This allows other I/O/timers to run.
*/
function heavyChunkedComputation(iterations = 5e8, chunkSize = 5e6, onProgress, onDone) {
  let processed = 0;
  function doChunk() {
    const end = Math.min(processed + chunkSize, iterations);
    // synchronous work for this chunk
    for (let i = processed; i < end; i++) {
      // simple CPU load
      Math.sqrt(i % 1000);
    }
    processed = end;
    if (onProgress) onProgress(processed / iterations);
    if (processed < iterations) {
      // yield back to event loop, schedule next chunk
      setImmediate(doChunk);
    } else {
      if (onDone) onDone();
    }
  }
  // start first chunk
  setImmediate(doChunk);
}

/* ----------------------------
   Worker thread wrapper
   ----------------------------
   Offload heavySyncComputation to a worker thread so the main thread remains responsive.
*/
function runHeavyWorker(iterations) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: { iterations }
    });
    worker.once('message', (result) => resolve(result));
    worker.once('error', reject);
    worker.once('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

/* ----------------------------
   HTTP Server & Routes
   ---------------------------- */
const server = http.createServer(async (req, res) => {
  // simple router
  const url = req.url;

  if (url === '/fast') {
    // Lightweight route: should respond immediately unless main thread is blocked
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('fast response OK\n');
    return;
  }

  if (url === '/heavy-blocking') {
    // THIS IS THE BUGGY "async-looking but blocking" ENDPOINT
    // Many junior devs write `async function` and assume it's non-blocking.
    // Here we intentionally simulate an "async" handler pattern that performs blocking work.
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('heavy-blocking started\n');

    // Synchronous heavy computation on the main thread.
    // While this runs, the event loop is blocked: /fast and other routes cannot be served.
    // This demonstrates the problem.
    const start = Date.now();
    const result = heavySyncComputation(3e8); // adjust iterations for demo speed
    const timeMs = Date.now() - start;

    res.write(`heavy-blocking finished in ${timeMs} ms, result=${result}\n`);
    res.end();
    return;
  }

  if (url === '/fixed-chunked') {
    // Cooperative chunking solution: break work into chunks and yield between them.
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('fixed-chunked started\n');

    // Provide progress updates (non-blocking)
    heavyChunkedComputation(
      3e8,      // total iterations (same scale as blocking version)
      3e6,      // chunk size (tune as needed)
      (progress) => {
        // NOTE: we don't flood the response — in real apps you might use websockets or SSE for progress
        // Here we simply log to server console for demonstration.
        console.log(`[fixed-chunked] progress ${(progress * 100).toFixed(1)}%`);
      },
      () => {
        res.write('fixed-chunked finished\n');
        res.end();
      }
    );

    return;
  }

  if (url === '/fixed-worker') {
    // Worker thread solution: run heavy task off the main thread
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('fixed-worker started\n');

    try {
      const start = Date.now();
      const result = await runHeavyWorker(3e8); // worker executes heavySyncComputation
      const timeMs = Date.now() - start;
      res.write(`fixed-worker finished in ${timeMs} ms, result=${result}\n`);
      res.end();
    } catch (err) {
      res.write(`worker failed: ${err.message}\n`);
      res.end();
    }
    return;
  }

  // root or unknown path
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(
    'Paths:\n' +
    '  /fast           -> quick response\n' +
    '  /heavy-blocking -> BLOCKS the server (bad anti-pattern)\n' +
    '  /fixed-chunked  -> non-blocking via chunking (cooperative)\n' +
    '  /fixed-worker   -> non-blocking via Worker Threads\n'
  );
});

if (isMainThread) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Try: curl http://localhost:4000/fast');
    console.log('Then: curl http://localhost:4000/heavy-blocking  (observe blocking)');
  });
} else {
  // Worker thread code path: run heavy computation and return result
  const { workerData, parentPort } = require('worker_threads');
  const { iterations } = workerData;
  // Perform same heavy sync computation in worker and send back the result
  const res = heavySyncComputation(iterations);
  parentPort.postMessage(res);
}

//Point to stress with this example
//Node Js best for I/O bounded tasks but not for CPU bounded tasks
//If you run CPU bounded tasks on main thread, it will block the event loop
//So, other I/O tasks will be blocked until the CPU bounded task is completed
//To fix this, we can use cooperative chunking (setImmediate) or Worker Threads or 
// use a separate microservice for CPU bounded tasks
