// path_module_demo.js
// ----------------------------------------------------------------------
// 🎯 Purpose:
// Demonstrates key features of Node.js built-in "path" module.
// Used for handling and transforming file and directory paths.
//
// 🧠 Note:
// The 'path' module helps make your code OS-independent (works on
// Windows "\" and Linux/Mac "/").
// ----------------------------------------------------------------------

// Import the 'path' core module
const path = require("path");

// ----------------------------------------------------------------------
// 🔹 1. Get directory name from a path
// ----------------------------------------------------------------------
const sampleFilePath = "C:\\Users\\Student\\NodeJS\\demo\\file.txt";
console.log("1️⃣ Directory name:", path.dirname(sampleFilePath));

// ----------------------------------------------------------------------
// 🔹 2. Get the file name (with and without extension)
// ----------------------------------------------------------------------
console.log("2️⃣ File name:", path.basename(sampleFilePath));
console.log("   File name (no extension):", path.basename(sampleFilePath, ".txt"));

// ----------------------------------------------------------------------
// 🔹 3. Get the file extension
// ----------------------------------------------------------------------
console.log("3️⃣ File extension:", path.extname(sampleFilePath));

// ----------------------------------------------------------------------
// 🔹 4. Join multiple path segments
// ----------------------------------------------------------------------
// ✅ Safely joins using correct separator based on OS
const joinedPath = path.join(__dirname, "folderA", "folderB", "notes.txt");
console.log("4️⃣ Joined Path:", joinedPath);

// ----------------------------------------------------------------------
// 🔹 5. Resolve a path (absolute path calculation)
// ----------------------------------------------------------------------
// ✅ It resolves relative segments (‘..’, ‘.’) into an absolute path.
const resolvedPath = path.resolve("folderA", "..", "folderB", "notes.txt");
console.log("5️⃣ Resolved Path:", resolvedPath);

// ----------------------------------------------------------------------
// 🔹 6. Parse a file path into components
// ----------------------------------------------------------------------
const parsed = path.parse(sampleFilePath);
console.log("6️⃣ Parsed Path Object:", parsed);

/*
Parsed Object structure:
{
  root: 'C:\\',
  dir: 'C:\\Users\\Student\\NodeJS\\demo',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/

// ----------------------------------------------------------------------
// 🔹 7. Format a parsed path object back to a string
// ----------------------------------------------------------------------
const formatted = path.format({
  dir: "C:\\Users\\Student\\NodeJS\\demo",
  name: "formattedFile",
  ext: ".js",
});
console.log("7️⃣ Formatted Path:", formatted);

// ----------------------------------------------------------------------
// 🔹 8. Normalize a messy path
// ----------------------------------------------------------------------
// ✅ Useful to clean up "../" or "//" etc.
const messyPath = "C:\\Users\\\\Student\\NodeJS\\demo\\..\\test\\file.txt";
console.log("8️⃣ Normalized Path:", path.normalize(messyPath));

// ----------------------------------------------------------------------
// 🔹 9. Check if path is absolute
// ----------------------------------------------------------------------
console.log("9️⃣ Is absolute path?", path.isAbsolute(sampleFilePath)); // true
console.log("   Is absolute path?", path.isAbsolute("./data/file.txt")); // false

// ----------------------------------------------------------------------
// 🔹 10. Get relative path between two directories
// ----------------------------------------------------------------------
const from = "C:\\Users\\Student\\NodeJS\\demo";
const to = "C:\\Users\\Student\\NodeJS\\demo\\subfolder\\file.txt";
console.log("🔟 Relative Path:", path.relative(from, to));

// --------------------------------------------------------------------
// 🧠 HOW THIS WORKS
// --------------------------------------------------------------------
// 1️⃣ The 'path' module is a core Node.js module, no installation needed.
// 2️⃣ It provides utilities for working with file and directory paths.
// 3️⃣ It handles different OS path formats (Windows vs Unix).
// 4️⃣ Most functions are synchronous and return strings or objects.
// --------------------------------------------------------------------