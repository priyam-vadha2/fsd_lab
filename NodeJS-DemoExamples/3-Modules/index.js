// index.js
// -------------------------
// Aggregator (barrel) module that re-exports things from other modules.
// Useful pattern for grouping module exports in a single entry point.
// -------------------------

// Require other modules
const constants = require("./constants"); // object with named properties
const utils = require("./utils");         // object with named functions
const Greeter = require("./classModule"); // exported class (function)
const sayHello = require("./defaultFunctionExport"); // exported function

// Re-export selected items using module.exports as an object
module.exports = {
  // Spread the constants object into the aggregator
  ...constants,

  // Attach utilities
  add: utils.add,
  waitAndMultiply: utils.waitAndMultiply,

  // Attach class and default function
  Greeter,
  sayHello,

  // Provide a convenience function showing require cache behavior (demo)
  info: () => ({ loadedAt: new Date().toISOString(), pid: process.pid }),
};
