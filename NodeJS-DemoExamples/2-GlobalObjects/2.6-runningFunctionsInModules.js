// ==============================================
// 2.6-runningFunctionsInModules.js
// This file imports the module and uses its exports.
// ==============================================

console.log("🚀 [Main] Script started");

const customModule = require('./2.6.1-module');

console.log("🧩 [Main] Module imported successfully");

// Now calling the exported function
console.log("🎯 [Main] Calling exported greetUser()...");
const message = customModule.greetUser("Another Developer");
console.log("💬 [Main] Message received:", message);
customModule.welcome();
console.log("🏁 [Main] Script ended");
