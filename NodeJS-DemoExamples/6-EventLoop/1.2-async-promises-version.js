// Demonstration of async operations using Promises

const fs = require('fs').promises; // using fs promises API

// Function to read file asynchronously using Promises
function readFilePromise() {
  return fs.readFile('./data.json', 'utf-8')
    .then(data => {
      console.log("✅ File read successfully!");
      return JSON.parse(data);
    });
}

// Function to process data (returns a Promise)
function processData(data) {
  return new Promise((resolve, reject) => {
    // simulate a time-consuming task
    setTimeout(() => {
      console.log("🔄 Processing data...");
      const avg = data.students.reduce((sum, s) => sum + s.marks, 0) / data.students.length;
      resolve(avg);
    }, 1000);
  });
}

// Chain the promises
readFilePromise()
  .then(data => processData(data))
  .then(avgMarks => {
    console.log(`🎓 Average Marks: ${avgMarks.toFixed(2)}`);
  })
  .catch(err => {
    console.error("❌ Error occurred:", err.message);
  })
  .finally(() => {
    console.log("🏁 Promise-based async operation completed.");
  });
