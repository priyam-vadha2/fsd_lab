// worker.js
const { parentPort, workerData } = require('worker_threads');

// simulate heavy processing (blocked or CPU intensive) - we will mimic with a delay loop
function heavyCompute(data) {
  // pretend heavy synchronous CPU work (here we still keep it simple)
  const avg = data.students.reduce((sum, s) => sum + s.marks, 0) / data.students.length;

  // Also simulate a delay without blocking Node's event loop in main thread
  const start = Date.now();
  while (Date.now() - start < 600) {
    // busy-wait to demonstrate CPU-bound work (worker thread only)
  }

  return avg;
}

// perform compute and send back
const avg = heavyCompute(workerData);
parentPort.postMessage({ avg });
