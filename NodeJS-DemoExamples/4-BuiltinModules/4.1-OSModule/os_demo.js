// os_demo.js
// ---------------------------------------------------------------
// 🎯 PURPOSE:
// Demonstrates key features and commonly used functions
// from Node.js built-in 'os' module.
//
// The 'os' module provides operating system-related utility methods
// and properties — helpful for system diagnostics, monitoring,
// or environment-aware scripting.
//
// Run: node os_demo.js
// ---------------------------------------------------------------

// Load the built-in OS module
const os = require("os");

console.log("=== Node.js 'os' Module Demonstration ===\n");

// ---------------------------------------------------------------
// 🔹 1. Basic Information
// ---------------------------------------------------------------
console.log("Operating System Type:", os.type());         // e.g. 'Windows_NT' or 'Linux' or 'Darwin'
console.log("Platform:", os.platform());                  // e.g. 'win32', 'linux', 'darwin'
console.log("CPU Architecture:", os.arch());              // e.g. 'x64'
console.log("OS Release Version:", os.release());         // e.g. '10.0.22621'
console.log("System Uptime (seconds):", os.uptime());     // Time since last reboot
console.log("Hostname:", os.hostname());                  // Computer’s network name
console.log();

// ---------------------------------------------------------------
// 🔹 2. User Information
// ---------------------------------------------------------------
const user = os.userInfo();
console.log("Current User Info:");
console.log(user); // Contains username, homedir, shell (on Linux/Mac), etc.
console.log("Home Directory:", os.homedir());
console.log("Temporary Directory:", os.tmpdir());
console.log();

// ---------------------------------------------------------------
// 🔹 3. CPU Information
// ---------------------------------------------------------------
console.log("CPU Information:");
const cpus = os.cpus();
console.log("Total CPU cores:", cpus.length);

// Show brief info about first CPU core
console.log("Example CPU Core:", cpus[0]);
console.log();

// ---------------------------------------------------------------
// 🔹 4. Memory Information
// ---------------------------------------------------------------
console.log("Memory Details:");
console.log("Total Memory:", (os.totalmem() / (1024 ** 3)).toFixed(2), "GB");
console.log("Free Memory:", (os.freemem() / (1024 ** 3)).toFixed(2), "GB");
console.log("Used Memory (%):", ((1 - os.freemem() / os.totalmem()) * 100).toFixed(2), "%");
console.log();

// ---------------------------------------------------------------
// 🔹 5. Network Interfaces
// ---------------------------------------------------------------
console.log("Network Interfaces:");
const networkData = os.networkInterfaces();
console.log(networkData);

// Example: print all IPv4 addresses (excluding internal like 127.0.0.1)
console.log("\nActive IPv4 Addresses:");
Object.values(networkData).forEach((interfaces) => {
  interfaces.forEach((iface) => {
    if (iface.family === "IPv4" && !iface.internal) {
      console.log(`→ ${iface.address} (${iface.mac})`);
    }
  });
});
console.log();

// ---------------------------------------------------------------
// 🔹 6. Endianness
// (Shows whether the CPU stores bytes as little-endian or big-endian)
// ---------------------------------------------------------------
console.log("CPU Endianness:", os.endianness());
console.log();

// ---------------------------------------------------------------
// 🔹 7. System Constants
// (Useful for cross-platform compatibility)
// ---------------------------------------------------------------
console.log("Path Separator:", os.platform() === "win32" ? "\\" : "/");
console.log("Line Break Style:", JSON.stringify(os.EOL)); // '\r\n' (Windows) or '\n' (Unix)
console.log();

// ---------------------------------------------------------------
// 🔹 8. Aggregated System Report
// ---------------------------------------------------------------
console.log("📊 System Summary Report:");
console.log({
  hostname: os.hostname(),
  type: os.type(),
  platform: os.platform(),
  arch: os.arch(),
  uptimeMinutes: (os.uptime() / 60).toFixed(1),
  totalMemoryGB: (os.totalmem() / (1024 ** 3)).toFixed(2),
  freeMemoryGB: (os.freemem() / (1024 ** 3)).toFixed(2),
  cpuCores: os.cpus().length,
});
console.log();

// ---------------------------------------------------------------
// 🧠 HOW THIS WORKS
// ---------------------------------------------------------------
// 1️⃣ The 'os' module interfaces with the operating system APIs
//     provided by Node’s C++ bindings (libuv).
// 2️⃣ It’s synchronous and reads data directly from the kernel.
// 3️⃣ Common use cases:
//     - System monitoring tools (like showing free RAM/CPU usage)
//     - Environment diagnostics before app start
//     - Logging OS details for debugging or support
// ---------------------------------------------------------------

console.log("✅ OS Module Demonstration Complete.\n");
