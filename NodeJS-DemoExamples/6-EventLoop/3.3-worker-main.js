// worker-main.js
const fs = require('fs').promises;
const { Worker } = require('worker_threads');
const path = require('path');

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
      workerData: data
    });

    worker.on('message', (msg) => resolve(msg));    // result from worker
    worker.on('error', (err) => reject(err));
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

(async () => {
  try {
    console.log("📂 Reading file in main thread...");
    const raw = await fs.readFile('data.json', 'utf8');
    console.log("✅ File read in main thread!");

    const json = JSON.parse(raw);

    // offload processing to worker thread
    console.log("➡️ Offloading processing to worker thread...");
    const result = await runWorker(json);
    console.log(`🎓 Average Marks (from worker): ${result.avg.toFixed(2)}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    console.log("🏁 worker-main completed.");
  }
})();
