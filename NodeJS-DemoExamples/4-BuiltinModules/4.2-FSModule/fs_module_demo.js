// fs_module_demo.js
// ----------------------------------------------------------------------
// 🎯 Purpose:
// Demonstrates key features of Node.js built-in "fs" (File System) module.
// Includes both synchronous and asynchronous versions for understanding.
// ----------------------------------------------------------------------

// Import the 'fs' and 'path' core modules
const fs = require("fs");
const path = require("path");

// ----------------------------------------------------------------------
// 🔹 1. Create a file and write content to it (Asynchronous)
// ----------------------------------------------------------------------

const filePath = path.join(__dirname, "sample.txt");

fs.writeFile(filePath, "Hello from Node.js FS module!", (err) => {
  if (err) {
    console.error("❌ Error writing file:", err);
    return;
  }
  console.log("✅ File written successfully at:", filePath);

  // ----------------------------------------------------------------------
  // 🔹 2. Read the file content (Asynchronous)
  // ----------------------------------------------------------------------
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading file:", err);
      return;
    }
    console.log("\n📄 File Content:\n", data);

    // ----------------------------------------------------------------------
    // 🔹 3. Append new content to the file
    // ----------------------------------------------------------------------
    fs.appendFile(filePath, "\nAppended text at: " + new Date().toLocaleString(), (err) => {
      if (err) {
        console.error("❌ Error appending file:", err);
        return;
      }
      console.log("\n✅ File appended successfully!");

      // ----------------------------------------------------------------------
      // 🔹 4. Read file stats (size, creation time, etc.)
      // ----------------------------------------------------------------------
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("❌ Error fetching stats:", err);
          return;
        }

        console.log("\n📊 File Stats:");
        console.log("Size:", stats.size, "bytes");
        console.log("Created on:", stats.birthtime);
        console.log("Modified on:", stats.mtime);

        // ----------------------------------------------------------------------
        // 🔹 5. Rename the file
        // ----------------------------------------------------------------------
        const newPath = path.join(__dirname, "renamed_sample.txt");
        fs.rename(filePath, newPath, (err) => {
          if (err) {
            console.error("❌ Error renaming file:", err);
            return;
          }
          console.log("\n✅ File renamed successfully to renamed_sample.txt");

          // ----------------------------------------------------------------------
          // 🔹 6. Delete the file
          // ----------------------------------------------------------------------
          fs.unlink(newPath, (err) => {
            if (err) {
              console.error("❌ Error deleting file:", err);
              return;
            }
            console.log("\n🗑️ File deleted successfully!");
          });
        });
      });
    });
  });
});

// ----------------------------------------------------------------------
// 🔹 7. Synchronous version (executed top-down blocking the event loop)
// ----------------------------------------------------------------------

// Note: Use try-catch when working with synchronous fs methods.
try {
  const syncFile = path.join(__dirname, "sync_demo.txt");
  fs.writeFileSync(syncFile, "This is synchronous write!");
  console.log("\n⚙️ Synchronous file created:", syncFile);

  const syncData = fs.readFileSync(syncFile, "utf8");
  console.log("📄 Synchronous Read:", syncData);

  fs.appendFileSync(syncFile, "\nMore text added synchronously!");
  console.log("✅ Synchronous append done!");

  fs.renameSync(syncFile, path.join(__dirname, "sync_renamed.txt"));
  console.log("📝 Synchronous rename done!");
} catch (err) {
  console.error("❌ Error (sync section):", err);
}

// ----------------------------------------------------------------------
// 🔹 8. Bonus: Check if a file or directory exists
// ----------------------------------------------------------------------
const checkPath = path.join(__dirname, "check_me.txt");

if (fs.existsSync(checkPath)) {
  console.log("\n📁 File exists:", checkPath);
} else {
  console.log("\n⚠️ File not found, creating one...");
  fs.writeFileSync(checkPath, "File created because it didn’t exist!");
  console.log("✅ check_me.txt created successfully!");
}

// ----------------------------------------------------------------------
// 🧠 Notes for Students:
//
//  - fs.readFile / fs.writeFile → Asynchronous (non-blocking)
//  - fs.readFileSync / fs.writeFileSync → Synchronous (blocking)
//  - Prefer async versions in production for performance
//  - Always handle errors using callbacks or try-catch
// ----------------------------------------------------------------------
