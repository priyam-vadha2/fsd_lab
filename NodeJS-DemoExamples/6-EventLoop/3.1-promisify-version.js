// util.promisify example - convert callback API to Promise
const fs = require('fs');
const { promisify } = require('util');

// promisify the callback-style readFile
const readFileAsync = promisify(fs.readFile);

// simulate async processing using setTimeout wrapped in a Promise
function processData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🔄 Processing data (promisify)...");
      const avg = data.students.reduce((sum, s) => sum + s.marks, 0) / data.students.length;
      resolve(avg);
    }, 800);
  });
}

readFileAsync('data.json', 'utf8')
  .then(raw => {
    console.log("✅ File read via promisify!");
    const json = JSON.parse(raw);
    return processData(json);
  })
  .then(avg => {
    console.log(`🎓 Average Marks: ${avg.toFixed(2)}`);
  })
  .catch(err => {
    console.error("❌ Error:", err.message);
  })
  .finally(() => {
    console.log("🏁 promisify-version completed.");
  });
