// utils.js
// -------------------------
// Demonstrates exporting multiple named functions using 'exports' shorthand
// -------------------------

// A small utility function
function add(a, b) {
  return a + b;
}

// Another util - asynchronous style
function waitAndMultiply(a, b, ms = 500) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(a * b), ms);
  });
}

// Export named functions using the exports alias
exports.add = add;
exports.waitAndMultiply = waitAndMultiply;

// Note:
// `exports` is only a shortcut to module.exports. If you reassign
// `exports = {}` you'll break the link — see pitfall.js example.
