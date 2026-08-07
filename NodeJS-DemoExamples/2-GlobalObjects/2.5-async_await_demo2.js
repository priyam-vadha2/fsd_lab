// async_await_demo.js
// ----------------------------------------------------------------------
// 🎯 Purpose:
// Demonstrates how async/await works in Node.js using Promises,
// global variables, and the Node.js Event Loop.
//
// 🔹 Global variables demonstrated:
//     __filename, __dirname, process
// ----------------------------------------------------------------------

console.log("=== Node.js Async/Await Demo ===\n");

// ----------------------------------------------------------------------
// 🔹 Utility Function: Simulate a delay using a Promise
// Acts like an asynchronous operation (e.g., reading from DB, API call)
// ----------------------------------------------------------------------
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited for ${ms} milliseconds`);
    }, ms);
  });
}

// ----------------------------------------------------------------------
// 🔹 Async function demonstrating async/await flow
// ----------------------------------------------------------------------
async function demoAsyncAwait() {
  console.log("🟢 Starting async function...\n");

  // Display current file and directory (global variables)
  console.log("Current File:", __filename);
  console.log("Current Directory:", __dirname, "\n");

  // Await pauses *inside* the async function, allowing the event loop to run
  const result1 = await wait(1000);
  console.log("1️⃣ After first await →", result1);

  const result2 = await wait(2000);
  console.log("2️⃣ After second await →", result2);

  console.log("\nAll async operations complete ✅");
}

// ----------------------------------------------------------------------
// 🔹 Call the async function
// Async functions always return a Promise.
// ----------------------------------------------------------------------
demoAsyncAwait()
  .then(() => {
    console.log("\n🔚 Async function finished successfully");
  })
  .catch((err) => {
    console.error("❌ Something went wrong:", err);
  });

// ----------------------------------------------------------------------
// 🧠 Event Loop Explanation (with ASCII timeline)
// ----------------------------------------------------------------------
//
// Synchronous and asynchronous flow visualization:
//
//   ┌────────────────────────────────────────────────────────────┐
//   │                 Node.js Event Loop Timeline                │
//   └────────────────────────────────────────────────────────────┘
//
//   TIME →  ─────────────────────────────────────────────────────────────▶
//
//   [Sync Start] → [Register Promise callbacks] → [Main Stack Ends]
//                           │
//                           ▼
//                  [Event Loop waiting...⏳]
//                           │
//               (After 1s) setTimeout callback fires
//                           │
//                           ▼
//              Promise 1 resolved → async resumes (await #1)
//                           │
//                           ▼
//               (After 2s) setTimeout callback fires again
//                           │
//                           ▼
//              Promise 2 resolved → async resumes (await #2)
//                           │
//                           ▼
//             Async function finishes → .then() executes
//                           │
//                           ▼
//             beforeExit event (final cleanup) → process exits
//
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// 🔹 Demonstrate process global usage
// beforeExit runs right before Node exits, once event loop is empty
// ----------------------------------------------------------------------
process.on("beforeExit", () => {
  console.log("\n🧭 process.beforeExit event triggered");
  console.log("Memory usage:", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2), "MB");
});
