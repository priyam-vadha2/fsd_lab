// defaultFunctionExport.js
// -------------------------
// Another pattern: export a single function as the module itself:
// -------------------------

function sayHello(name = "friend") {
  return `Hi ${name}, from the module-function!`;
}

// This makes require(...) return the function itself
module.exports = sayHello;

// Importing code can do: const sayHello = require('./defaultFunctionExport');
