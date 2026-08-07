// callback_demo.js
// -------------------------------------------------------------
// This script demonstrates Node.js global timer functions:
//   - setTimeout(callback, delay)
//   - setInterval(callback, delay)
// It also explains how the Node.js Event Loop handles callbacks.
// -------------------------------------------------------------

console.log("=== Node.js Timer Globals Demo ===\n");

// -------------------------------------------------------------
// 🔹 setTimeout(callback, delay)
// Executes the callback function *once* after the given delay (in milliseconds)
// -------------------------------------------------------------
setTimeout(() => {
  console.log("⏰ setTimeout: This runs after 2 seconds (2000 ms)");
}, 2000);

// -------------------------------------------------------------
// 🔹 setInterval(callback, delay)
// Repeatedly executes the callback every given delay (in milliseconds)
// -------------------------------------------------------------
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`🔁 setInterval: Called ${count} time(s)`);

  // After 3 iterations, stop the interval using clearInterval()
  if (count === 3) {
    clearInterval(intervalId);
    console.log("🛑 Interval cleared after 3 iterations");
  }
}, 1000);

// -------------------------------------------------------------
// 🧠 How the Event Loop works here:
// -------------------------------------------------------------
// 1️⃣ When this script starts, synchronous code (like console.log) runs first.
// 2️⃣ The calls to setTimeout() and setInterval() are *registered* with Node's timer APIs.
// 3️⃣ The Event Loop keeps running and checks if any timer has expired.
// 4️⃣ When a timer's delay time is over, its callback is placed into the "callback queue".
// 5️⃣ Once the main call stack is empty, the Event Loop picks up the callback and executes it.
// -------------------------------------------------------------

console.log("\nMain thread finished scheduling timers ✅");
console.log("Now Node.js event loop takes over...\n");
