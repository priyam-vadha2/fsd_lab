// main.js
// -------------------------
// Demonstrates how to import the modules above and shows behavior
// for different export styles, require caching, and the exports pitfall.
// Run: node main.js
// -------------------------

console.log("=== Node.js Modules & Exports Demo ===\n");

// 1) Import the aggregator which in turn re-exports many things
const mod = require("./index");

// Constants (named exports)
console.log("APP_NAME:", mod.APP_NAME);
console.log("VERSION:", mod.VERSION);
console.log("PI:", mod.PI, "\n");

// Utilities (named function exports)
console.log("2 + 3 =", mod.add(2, 3));

mod.waitAndMultiply(3, 4, 300).then((result) => {
  console.log("3 * 4 (after 300ms) =", result);

  // 2) Class import (single export)
  const Greeter = require("./classModule");
  const g = new Greeter("Pradeep");
  console.log(g.greet());

  // 3) Default-function style import
  const say = require("./defaultFunctionExport");
  console.log(say("Student"));

  // 4) Pitfall demonstration
  const pit = require("./pitfall");
  console.log("Pitfall module exported object:", pit);

  // 5) require cache demo:
  console.log("\n-- require cache demo --");
  const before = require.cache[require.resolve("./index.js")];
  console.log("Is index.js cached?", !!before);

  // Access info function to show module-provided runtime info
  console.log("Module info:", mod.info());

  // Delete from require cache and re-require (forces re-execution)
  delete require.cache[require.resolve("./index.js")];
  const modReloaded = require("./index.js");
  console.log("Reloaded module info:", modReloaded.info());

  // 6) Explain difference between exports and module.exports in runtime
  console.log("\n-- exports vs module.exports note --");
  console.log("If a module assigns `exports = {...}` the change is NOT exported.");
  console.log("To replace the exported value, assign `module.exports = ...` explicitly.");

  console.log("\nDemo complete ✅");
});
