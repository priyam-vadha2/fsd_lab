// globals_demo1.js

console.log("=== Node.js Global Variables Demo 1 ===\n");

// __dirname gives the directory name of the current module
console.log("__dirname:", __dirname);

// __filename gives the full path (including file name) of the current module
console.log("__filename:", __filename);

// process gives info about the current Node.js process
console.log("\nProcess Info:");
console.log("Process ID:", process.pid);
console.log("Node Version:", process.version);
console.log("Current Working Directory:", process.cwd());

// Environment variables (you can set your own before running)
console.log("Environment (NODE_ENV):", process.env.NODE_ENV || "not set");
