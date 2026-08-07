// streams + async iterator (for await ... of)
// Good when you want to process large files incrementally.
// For small JSON this demonstrates how to use async iterators with streams.

const fs = require('fs');

// helper to read whole stream as text using async iterator
async function readStreamAsString(path) {
  const stream = fs.createReadStream(path, { encoding: 'utf8' });
  let data = '';
  // for-await works because Readable implements async iterable
  for await (const chunk of stream) {
    data += chunk;
  }
  return data;
}

// simulate processing using a Promise with setTimeout
function processData(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("🔄 Processing data (stream)...");
      const avg = data.students.reduce((sum, s) => sum + s.marks, 0) / data.students.length;
      resolve(avg);
    }, 700);
  });
}

(async function main() {
  try {
    console.log("📂 Reading file via stream...");
    const raw = await readStreamAsString('data.json');
    console.log("✅ File read via stream!");
    const json = JSON.parse(raw);

    const avg = await processData(json);
    console.log(`🎓 Average Marks: ${avg.toFixed(2)}`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    console.log("🏁 stream-asynciter-version completed.");
  }
})();
