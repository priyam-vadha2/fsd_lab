// Demonstration of async operations using Async/Await

const fs = require('fs').promises;

// Simulate async function for data processing
function processData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🔄 Processing data...");
      const avg = data.students.reduce((sum, s) => sum + s.marks, 0) / data.students.length;
      resolve(avg);
    }, 1000);
  });
}

// Async function that uses await to handle promises cleanly
async function main() {
  try {
    console.log("📂 Reading file...");
    const data = await fs.readFile('./data.json', 'utf-8');
    console.log("✅ File read successfully!");
    
    const jsonData = JSON.parse(data);
    
    const avgMarks = await processData(jsonData);
    console.log(`🎓 Average Marks: ${avgMarks.toFixed(2)}`);
  } catch (err) {
    console.error("❌ Error occurred:", err.message);
  } finally {
    console.log("🏁 Async/Await-based async operation completed.");
  }
}

// Call the async function
main();
