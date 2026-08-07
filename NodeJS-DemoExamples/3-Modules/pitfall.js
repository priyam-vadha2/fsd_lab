// pitfall.js
// -------------------------
// Demonstrates a common pitfall: reassigning 'exports' instead of module.exports
// -------------------------

// Correct way: define properties on exports / module.exports
exports.ok = "This is fine";

// WRONG: reassigning exports to a new object DOES NOT change module.exports
// (Because 'exports' is a reference to module.exports at module initialization.)
// The following line (if uncommented) would break external access to the new object:
// exports = {
//   broken: true
// };

// Correct way to replace the entire exported object:
const replacement = { fixed: true };
module.exports = replacement;

// Note: because module.exports was replaced below, the earlier exports.ok
// will NOT be present on the final exported object. This demonstrates why
// you should be careful: choose either attach-to-exports OR replace module.exports,
// but don't mix them expecting merging behavior.
