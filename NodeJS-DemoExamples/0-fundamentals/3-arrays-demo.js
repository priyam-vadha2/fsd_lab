/*********************************************************************************
 * arrays-demo.js
 *
 * Teaching goals:
 *  - Demonstrate common Array methods in JS with examples and comments.
 *  - Show mutation vs immutability, chaining, and practical use-cases.
 *  - Provide exercises and tips for students.
 *
 * Run:
 *  node arrays-demo.js
 *
 * Tip:
 *  - Read comments, run the file, then edit/uncomment lines to experiment.
 *********************************************************************************/

/* -------------------------
   Sample data (shared)
   ------------------------- */
const students = [
  { id: 1, name: "Mouni", marks: 85, subjects: ["math", "eng"] },
  { id: 2, name: "Mahi", marks: 52, subjects: ["sci"] },
  { id: 3, name: "Maha", marks: 78, subjects: ["math", "sci"] },
  { id: 4, name: "Magi", marks: 95, subjects: ["eng", "art"] },
  { id: 5, name: "Hema", marks: 68, subjects: [] }
];

console.log("\n=== Initial data ===");
console.log(students);

/* ============================
   1) forEach - iterate (no return)
   ============================ */
console.log("\n1) forEach - iterate (no return)");

students.forEach((s, idx) => {
  // forEach is for side-effects (logging, mutating outer scope, DOM updates etc.)
  console.log(`#${idx + 1} ${s.name} -> ${s.marks}`);
});

// Important: forEach returns undefined so it can't be chained usefully:
// const x = students.forEach(s => s.marks); // x === undefined


/* ============================
   2) map - transform to a new array (non-mutating)
   ============================ */
console.log("\n2) map - transform (returns new array)");

const names = students.map(s => s.name); // extract names
console.log("names:", names);

// Map can also map to a new object (avoid mutating original)
const studentsWithGrade = students.map(s => ({
  id: s.id,
  name: s.name,
  marks: s.marks,
  grade: s.marks >= 75 ? "A" : s.marks >= 60 ? "B" : "C"
}));
console.log("studentsWithGrade:", studentsWithGrade);


/* ============================
   3) filter - select subset (returns new array)
   ============================ */
console.log("\n3) filter - select subset (returns new array)");

const passed = students.filter(s => s.marks >= 60);
console.log("passed (>=60):", passed.map(s => s.name));


/* ============================
   4) reduce - accumulate to a single value
   ============================ */
console.log("\n4) reduce - accumulate (sum, max, grouping)");

/* 4a) sum of marks */
const totalMarks = students.reduce((acc, s) => acc + s.marks, 0);
console.log("totalMarks:", totalMarks);

/* 4b) max marks */
const maxMarks = students.reduce((acc, s) => (s.marks > acc ? s.marks : acc), -Infinity);
console.log("maxMarks:", maxMarks);

/* 4c) grouping by grade (object result) */
const groupByGrade = students.reduce((acc, s) => {
  const grade = s.marks >= 75 ? "A" : s.marks >= 60 ? "B" : "C";
  if (!acc[grade]) acc[grade] = [];
  acc[grade].push(s.name);
  return acc;
}, {});
console.log("groupByGrade:", groupByGrade);

/* 4d) flattening arrays using reduce (manual) */
const nested = [[1, 2], [3, 4], [5]];
const flattened = nested.reduce((acc, arr) => acc.concat(arr), []);
console.log("flattened (reduce):", flattened);


/* ============================
   5) find / findIndex
   ============================ */
console.log("\n5) find / findIndex");

const firstLow = students.find(s => s.marks < 60); // first failing student
console.log("first failing student:", firstLow && firstLow.name);

const indexOfEve = students.findIndex(s => s.name === "Eve");
console.log("indexOfEve:", indexOfEve);


/* ============================
   6) some / every
   ============================ */
console.log("\n6) some / every");

console.log("some failed (<60)?", students.some(s => s.marks < 60)); // true
console.log("every passed (>=50)?", students.every(s => s.marks >= 50)); // true or false


/* ============================
   7) includes / indexOf (primitives only)
   ============================ */
console.log("\n7) includes / indexOf (for primitive arrays)");

const nums = [1, 2, 3, 4];
console.log("includes 3?", nums.includes(3));
console.log("indexOf 3:", nums.indexOf(3));


/* ============================
   8) slice (non-mutating) vs splice (mutating)
   ============================ */
console.log("\n8) slice vs splice");

const copySlice = students.slice(1, 3); // returns new shallow copy for indices 1,2
console.log("slice(1,3):", copySlice.map(s => s.name));

const arrForSplice = [10, 20, 30, 40];
const spliced = arrForSplice.splice(1, 2); // mutates original, removes elements 20 and 30
console.log("after splice, arrForSplice:", arrForSplice, "spliced returned:", spliced);

// Important: splice mutates the original array; slice doesn't.


/* ============================
   9) concat / spread (non-mutating merge)
   ============================ */
console.log("\n9) concat / spread");

const moreStudents = [{ id: 6, name: "Frank", marks: 72 }];
const combined = students.concat(moreStudents);
const combined2 = [...students, ...moreStudents]; // equivalent with spread
console.log("combined length:", combined.length, combined2.length);


/* ============================
   10) flat / flatMap (useful for nested arrays)
   ============================ */
console.log("\n10) flat / flatMap");

const studentsSubjects = students.map(s => s.subjects); // nested arrays
console.log("studentsSubjects:", studentsSubjects);

console.log("flat(1):", studentsSubjects.flat(1)); // flatten one level

// flatMap: map then flatten (one level)
const namesFromFlatMap = students.flatMap(s => s.subjects.map(sub => `${s.name}:${sub}`));
console.log("flatMap result:", namesFromFlatMap);


/* ============================
   11) sort (mutating) - be careful with numbers vs strings
   ============================ */
console.log("\n11) sort (mutating)");

// Copy before sort to avoid changing original
const byMarksAsc = [...students].sort((a, b) => a.marks - b.marks);
console.log("sorted by marks asc:", byMarksAsc.map(s => `${s.name}:${s.marks}`));

// Lexicographic sort example (strings)
const words = ["banana", "Apple", "cherry"];
console.log("words sort (case sensitive):", [...words].sort()); // default sorts lexicographically (case-sensitive)
console.log("words sort (case-insensitive):", [...words].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()) ));

/* ============================
   12) reverse (mutating)
   ============================ */
console.log("\n12) reverse (mutating)");

const arrRev = [1, 2, 3];
arrRev.reverse(); // modifies arrRev
console.log("reversed arrRev:", arrRev);


/* ============================
   13) join / toString
   ============================ */
console.log("\n13) join / toString");

console.log("[1,2,3].join('-'):", [1,2,3].join('-'));
console.log("students.map(name).toString():", students.map(s => s.name).toString());


/* ============================
   14) reduceRight
   ============================ */
console.log("\n14) reduceRight");

const rr = ["a", "b", "c"].reduceRight((acc, ch) => acc + ch, "");
console.log("reduceRight concat:", rr); // "cba"


/* ============================
   15) Mutation vs Immutability (shallow copy)
   ============================ */
console.log("\n15) mutation vs immutability (shallow)");

const original = [{n:1}, {n:2}];
const shallowCopy = original.slice(); // shallow copy of array (items still same references)
shallowCopy[0].n = 100;
console.log("original after changing shallowCopy[0]:", original); // shows change because objects are same reference

// To deep-clone simple data you might JSON methods (not ideal for functions/dates)
// const deep = JSON.parse(JSON.stringify(original));


/* ============================
   16) Common patterns / practical examples
   ============================ */
console.log("\n16) common patterns");

/* 16a) Sum of marks (map + reduce vs reduce directly) */
// map + reduce
const sumMarksViaMapReduce = students.map(s => s.marks).reduce((a, b) => a + b, 0);
console.log("sumMarksViaMapReduce:", sumMarksViaMapReduce);

// reduce directly (faster, single pass)
const sumMarksDirect = students.reduce((acc, s) => acc + s.marks, 0);
console.log("sumMarksDirect:", sumMarksDirect);

/* 16b) Chain: filter -> map -> join (get names of passed students) */
const passedNamesStr = students
  .filter(s => s.marks >= 60)
  .map(s => s.name)
  .join(", ");
console.log("passedNamesStr:", passedNamesStr);

/* 16c) Group by a property (generic groupBy) */
function groupBy(array, keyFn) {
  return array.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

const groupedByGrade = groupBy(students, s => (s.marks >= 75 ? "A" : s.marks >= 60 ? "B" : "C"));
console.log("groupedByGrade (generic):", groupedByGrade);


/* ============================
   17) Performance note
   ============================
   - Methods like map/filter create new arrays (extra memory); chaining many may create intermediate arrays.
   - Single-pass reduce can be more efficient for heavy operations (avoid multiple passes).
   - But for readability and maintainability prefer clear code; optimize only when needed.
   ============================ */


/* ============================
   18) Exercises (try these)
   ============================ */
console.log("\n18) Exercises (try uncommenting / implementing)");

// 1) Create an array of top 3 students (by marks) using sort + slice
// 2) Use reduce to build an object: { id: student } mapping
// 3) Using flatMap, get a list of all subjects (unique) taught by students
// 4) Implement a function to paginate array -> page(array, pageSize, pageNumber)

// Example starter for exercise 2:
const idMap = students.reduce((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {});
console.log("idMap (exercise starter):", idMap);

/* ============================
   19) Quick Cheat-sheet (console-friendly)
   ============================
   - forEach(fn)        -> iterate, returns undefined
   - map(fn)            -> transform, returns new array
   - filter(fn)         -> filter, returns new array
   - reduce(fn, init)   -> accumulate to single value
   - find(fn)           -> first matching element or undefined
   - findIndex(fn)      -> index of first matching or -1
   - some(fn)           -> true if any match
   - every(fn)          -> true if all match
   - includes(val)      -> true if primitive exists
   - slice(start,end)   -> non-mutating copy subarray
   - splice(i, n, ...)  -> mutating remove/insert
   - concat(...)        -> non-mutating merge
   - flat(depth)        -> flatten nested arrays
   - flatMap(fn)        -> map then flatten one level
   - sort(fn)           -> mutating sort (copy first if needed)
   - reverse()          -> mutating reverse
   - join(sep)          -> string join
   - reduceRight(fn)    -> reduce from right-to-left
   ============================ */

console.log("\nEnd of arrays-demo.js — modify and re-run to experiment!");
