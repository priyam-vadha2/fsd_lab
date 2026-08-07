// async_await_demo.js
// ----------------------------------------------------------------------
// This script demonstrates how async/await works in Node.js.
// It uses Promises, awaits their results, and explains how the
// event loop handles asynchronous code.
//
// Global variables used: __filename, __dirname, process
// ----------------------------------------------------------------------

console.log("=== Node.js Async/Await Demo ===\n");

// ----------------------------------------------------------------------
// 🔹 Utility: Simulate a delay using Promise
// This mimics an async operation (e.g., fetching data, reading a file)
// ----------------------------------------------------------------------
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited for ${ms} milliseconds`);
    }, ms);
  });
}

// ----------------------------------------------------------------------
// 🔹 Async function example
// Demonstrates awaiting multiple asynchronous operations
// async marks the function to return a Promise
// ----------------------------------------------------------------------
async function demoAsyncAwait() {
  console.log("🟢 Starting async function...\n");

  // __filename and __dirname are accessible globally
  console.log("Current File:", __filename);
  console.log("Current Directory:", __dirname, "\n");

  // Awaiting a Promise pauses execution *inside* the async function
  //await can only be used inside async functions
  //await pauses the function execution until the Promise resolves
  //and registers the rest of the function as a callback to be executed later
  //once promisie is resolved, it returns the resolved value and resumes execution
  //Meanwhile, the event loop can continue processing other events
  //This is non-blocking for the main thread
  const result1 = await wait(1000);
  console.log("1️⃣ After first await →", result1);

  const result2 = await wait(2000);
  console.log("2️⃣ After second await →", result2);

  // Demonstrating that synchronous code still runs immediately
  console.log("\nAll async operations complete ✅");
}

// ----------------------------------------------------------------------
// 🔹 Calling the async function
// Note: async functions always return a Promise
// ----------------------------------------------------------------------
demoAsyncAwait()
  .then(() => {
    console.log("\n🔚 Async function finished successfully");
  })
  .catch((err) => {
    console.error("❌ Something went wrong:", err);
  });

// ----------------------------------------------------------------------
// 🧠 How the Event Loop Works Here
// ----------------------------------------------------------------------
// 1️⃣ The async function `demoAsyncAwait` is called.
// 2️⃣ It starts executing synchronously until it hits the first `await`.
// 3️⃣ The `await` pauses execution INSIDE the async function and
//     returns control to the event loop.
// 4️⃣ Meanwhile, Node.js can continue doing other work.
// 5️⃣ When the Promise resolves, its callback goes into the event queue.
// 6️⃣ Once the call stack is free, the event loop resumes the async function.
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// 🔹 Demonstrate process global usage
// Shows when the script will exit and current memory usage.
// ----------------------------------------------------------------------
process.on("beforeExit", () => {
  console.log("\n🧭 process.beforeExit event triggered");
  console.log("Memory usage:", process.memoryUsage().heapUsed / 1024 / 1024, "MB");
});
console.log("\nMain thread finished executing ✅");
console.log("Now Node.js event loop takes over...\n");
// ----------------------------------------------------------------------