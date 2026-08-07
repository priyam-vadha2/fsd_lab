// ==============================================
// 2.6.1-module.js
// Demonstrates how Node.js modules work (CommonJS)
// and how they differ from ES Modules (ESM).
// ==============================================

// This code runs immediately when the module is first required/imported
console.log("✅ [Module] File loaded and executed by Node.js");

// ------------------------------------------------------
// 🧠 Function definitions
// ------------------------------------------------------
function greet(name) {
  console.log("👋 [Module] greet() function is running...");
  return `Hello, ${name}! Welcome to Node.js modules.`;
}

// Another function to demonstrate multiple exports
function welcome() {
  console.log("🎉 [Module] Welcome to JP Class for Node JS");
}

// ------------------------------------------------------
// Immediate execution code (runs when module loads)
// ------------------------------------------------------
console.log("⚙️ [Module] Initial greeting:", greet("Developer"));

// ------------------------------------------------------
// 🧩 COMMONJS EXPORT (default in Node.js)
// ------------------------------------------------------
// This method uses `module.exports` or `exports`
// CommonJS works with `require()` for importing.
module.exports = {
  greetUser: greet,
  welcome: welcome
};

// ------------------------------------------------------
// 🧩 ALTERNATIVE COMMONJS STYLES
// ------------------------------------------------------
// module.exports = greet;                  // Single export
// exports.greetUser = greet;               // Attach property
// exports.welcome = welcome;               // Add multiple exports

// ------------------------------------------------------
// 🧠 ES MODULE (ESM) VERSION — COMMENTED EXAMPLE
// ------------------------------------------------------
// ✅ If your project uses ES Modules
//    (either `.mjs` file extension or "type": "module" in package.json),
//    you can use `export` / `import` syntax instead of CommonJS.
//
// Example (ES Module style):
//
// export function greet(name) {
//   console.log("👋 [Module] greet() function is running...");
//   return `Hello, ${name}! Welcome to Node.js modules.`;
// }
//
// export function welcome() {
//   console.log("🎉 [Module] Welcome to JP Class for Node JS");
// }
//
// ------------------------------------------------------
// 🧠 ES Module import example:
//
// import { greet, welcome } from './2.6.1-module.js';
// welcome();
// console.log(greet("Student"));
//
// ------------------------------------------------------
// Summary:
//   - CommonJS  → require() + module.exports
//   - ES Module  → import + export
// ------------------------------------------------------
console.log("🏁 [Module] Module setup complete");