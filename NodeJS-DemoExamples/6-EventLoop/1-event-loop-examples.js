/**
 * event-loop-examples.js
 *
 * Several small examples demonstrating Node's event loop, phases, and microtask queues.
 *
 * Run with:
 *   node event-loop-examples.js
 *
 * To demo each example separately: comment/uncomment the example blocks.
 */

/* ===========================
   Example 1: Basic ordering
   - sync code
   - process.nextTick (microtask)
   - Promise.then (microtask)
   - setTimeout(fn, 0) (macroTask - timer phase)
   - setImmediate(fn) (macroTask - check phase)
   This demonstrates ordering between microtasks and macrotasks.
   =========================== */

function example1_basicOrdering() {
  console.log('--- Example 1: basic ordering ---');

  console.log('sync 1');

  // schedule a timer (timers phase)
  setTimeout(() => {
    console.log('timeout 0');
  }, 0);

  // schedule a "check" callback (check phase)
  setImmediate(() => {
    console.log('setImmediate');
  });

  // schedule a microtask using Promise
  Promise.resolve().then(() => {
    console.log('promise then (microtask)');
  });

  // schedule a nextTick which runs before other microtasks
  process.nextTick(() => {
    console.log('process.nextTick');
  });

  console.log('sync 2');
}

//example1_basicOrdering();

/**
 * ============================================================
 * 🧠 NODE.JS EVENT LOOP – Microtasks vs. Macrotasks expected output
 * ============================================================
 *
 * CATEGORY TABLE
 * ------------------------------------------------------------
 * | Category   | Example                 | Event Loop Phase   | Description |
 * |-------------|------------------------|--------------------|--------------|
 * | 🧩 Microtask | process.nextTick()      | Runs right after current operation | Node’s own internal queue processed before Promises |
 * | 🧩 Microtask | Promise.then()          | After process.nextTick, before macrotasks | Standard JS microtask queue |
 * | ⏰ Macrotask | setTimeout(fn, 0)       | Timers Phase        | Executes after specified delay (0 means next timer phase) |
 * | ⏭️ Macrotask | setImmediate(fn)        | Check Phase         | Executes after poll phase, usually after timers |
 *
 * ------------------------------------------------------------
 * ORDER OF EXECUTION
 * ------------------------------------------------------------
 * 1️⃣  Synchronous code (runs immediately)
 * 2️⃣  process.nextTick()  → Node internal microtask
 * 3️⃣  Promise.then()      → Regular JS microtask
 * 4️⃣  setTimeout(fn, 0)   → Timer phase macrotask
 * 5️⃣  setImmediate(fn)    → Check phase macrotask
 *
 */

/* ===========================
   Example 2: timers vs I/O callbacks
   - show how a file I/O callback is dispatched in the poll phase
   - schedule setImmediate and setTimeout inside the I/O callback to show phase ordering
   =========================== */

const fs = require('fs');
const path = require('path');

function example2_ioAndTimers() {
  console.log('\n--- Example 2: I/O and timers ---');

  // Trigger an asynchronous file read. The callback will run in the poll phase.
  fs.readFile(__filename, 'utf8', (err, data) => {
    if (err) throw err;
    console.log('file read callback');

    // inside I/O callback: schedule a setTimeout and setImmediate
    setTimeout(() => {
      console.log('timeout inside I/O callback');
    }, 0);

    setImmediate(() => {
      console.log('setImmediate inside I/O callback');
    });

    // Also schedule a microtask to show it runs immediately after this callback returns
    Promise.resolve().then(() => {
      console.log('promise in I/O callback (microtask)');
    });
  });

  // schedule a setTimeout and setImmediate from the main tick
  setTimeout(() => console.log('timer from main tick'), 0);
  setImmediate(() => console.log('setImmediate from main tick'));

  console.log('after initiating fs.readFile');
}

// example2_ioAndTimers();

/* Typical output ordering students will observe (may vary slightly):
   1. after initiating fs.readFile
   2. file read callback                <-- poll phase when I/O completes
   3. promise in I/O callback (microtask)
   4. timeout inside I/O callback      <-- timers scheduled inside the I/O callback execute in the next timers phase
   5. setImmediate inside I/O callback <-- check phase after poll
   6. timer from main tick             <-- depends on loop; can be seen before or after I/O callback timers depending on exact timing
   7. setImmediate from main tick      <-- check phase
*/

/* ===========================
   Example 3: process.nextTick vs Promise microtasks
   - illustrate that process.nextTick runs before Promise microtasks
   =========================== */

function example3_nextTickVsPromise() {
  console.log('\n--- Example 3: nextTick vs Promise microtasks ---');

  Promise.resolve().then(() => {
    console.log('promise resolved 1');
  });

  process.nextTick(() => {
    console.log('nextTick 1');
  });

  process.nextTick(() => {
    console.log('nextTick 2');
  });

  Promise.resolve().then(() => {
    console.log('promise resolved 2');
  });

  console.log('sync end');
}

// example3_nextTickVsPromise();

/* Expected:
   1. sync end
   2. nextTick 1
   3. nextTick 2
   4. promise resolved 1
   5. promise resolved 2
*/

/* ===========================
   Example 4: long CPU-bound task (blocking) vs cooperative chunking
   - shows how a heavy sync loop blocks the event loop
   - then shows how to break work into chunks using setImmediate to allow I/O and timers to run
   =========================== */

function heavyComputationBlock(iterations) {
  // A deliberately blocking computation (synchronous)
  let count = 0;
  for (let i = 0; i < iterations; i++) {
    count += i;
  }
  return count;
}

function example4_blockingVsChunked() {
  console.log('\n--- Example 4: blocking vs chunked ---');

  console.log('start: scheduling a timer that should fire soon (100ms)');
  setTimeout(() => {
    console.log('timer fired (should be delayed if blocking)');
  }, 100);

  console.log('starting heavy sync work (blocking)...');
  // This will block the event loop until it completes
  heavyComputationBlock(1e8); // adjust down if it takes too long on your machine
  console.log('finished heavy sync work');

  // Now show chunked work using setImmediate so other events can run
  let remaining = 5;
  function chunkedWork() {
    // do a small CPU task synchronously
    heavyComputationBlock(2e7);
    console.log('chunk done, remaining:', remaining);
    remaining--;
    if (remaining > 0) {
      // schedule next chunk in the check phase using setImmediate,
      // which yields back to the event loop between chunks
      setImmediate(chunkedWork);
    } else {
      console.log('all chunks done');
    }
  }

  setImmediate(chunkedWork);
}

// example4_blockingVsChunked();

/* What to point out:
   - The first setTimeout likely fires later than 100ms if the heavy computation blocked the loop.
   - Using setImmediate (or setTimeout with small delay) between chunks yields to the event loop and lets timers and I/O run.
*/

/* ===========================
   Example 5: multiple microtasks and macrotasks ordering "deep dive"
   - complex composition to illustrate microtasks queuing repeatedly
   =========================== */

function example5_microtaskLooping() {
  console.log('\n--- Example 5: microtasks queuing repeatedly ---');

  console.log('start');

  // schedule a timeout
  setTimeout(() => {
    console.log('timeout callback start');

    // inside this timer, schedule multiple microtasks and nextTick
    process.nextTick(() => console.log('nextTick inside timeout'));
    Promise.resolve().then(() => console.log('promise inside timeout'));

    // schedule another microtask from inside a microtask, showing the microtask queue grows
    Promise.resolve().then(() => {
      console.log('promise A inside timeout');
      Promise.resolve().then(() => {
        console.log('promise B scheduled inside promise A (still microtask)');
      });
    });

    console.log('timeout callback end');
  }, 0);

  // schedule initial microtasks right away
  Promise.resolve().then(() => {
    console.log('initial promise 1');
  });

  process.nextTick(() => {
    console.log('initial nextTick');
  });

  Promise.resolve().then(() => {
    console.log('initial promise 2');
  });

  console.log('end of start tick');
}

// example5_microtaskLooping();

/* Expected observation:
   - initial sync prints
   - process.nextTick runs before promises
   - promise microtasks run and can enqueue more microtasks, which run before moving to timers
   - then timer callback runs, and inside it process.nextTick again runs immediately before promises queued there
*/

/* ===========================
   Helper to run all examples sequentially (with spacing)
   WARNING: some examples block or take time; use selectively for classroom demos.
   =========================== */

async function runSelectedExamples() {
  // Uncomment the examples you want to run in sequence.

  example1_basicOrdering();
  // wait a bit to let asynchronous callbacks appear clearly
  await new Promise(r => setTimeout(r, 200));

  example2_ioAndTimers();
  await new Promise(r => setTimeout(r, 500)); // give I/O time

  example3_nextTickVsPromise();
  await new Promise(r => setTimeout(r, 200));

  // For blocking demonstration, be careful on student machines. You may skip or lower iterations.
  // example4_blockingVsChunked();
  // await new Promise(r => setTimeout(r, 1000));

  example5_microtaskLooping();
  await new Promise(r => setTimeout(r, 500));
}

// runSelectedExamples(); // uncomment to run all the selected demos automatically
