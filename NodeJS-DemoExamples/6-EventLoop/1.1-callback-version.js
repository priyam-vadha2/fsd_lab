// Demonstration of async operations using Callbacks

const fs = require('fs');

// Function to read file asynchronously using callback
function readFileCallback(callback) {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      // Pass error to callback
      return callback(err, null);
    }
    console.log("✅ File read successfully!");
    callback(null, JSON.parse(data)); // pass parsed JSON
  });
}

// Function to process data asynchronously using callback
function processData(data, callback) {
  // simulate a time-consuming async task
  setTimeout(() => {
    console.log("🔄 Processing data...");
    const avg = data.students.reduce((sum, s) => sum + s.marks, 0) / data.students.length;
    callback(null, avg); // callback with result
  }, 1000);
}

// Main flow using nested callbacks
readFileCallback((err, data) => {
  if (err) {
    console.error("❌ Error while reading file:", err.message);
    return;
  }

  processData(data, (err, avgMarks) => {
    if (err) {
      console.error("❌ Error while processing data:", err.message);
      return;
    }

    console.log(`🎓 Average Marks: ${avgMarks.toFixed(2)}`);
    console.log("🏁 Callback-based async operation completed.");
  });
});
