/****************************************************************************************
 * objects-destructuring-demo.js
 *
 * Purpose:
 *  - Teach JavaScript objects creation & manipulation
 *  - Demonstrate object and array destructuring patterns (with defaults, nesting,
 *    renaming, rest/spread)
 *  - Show practical patterns (cloning, merging, function param destructuring)
 *
 * Run:
 *  node objects-destructuring-demo.js
 *
 * Tip:
 *  - Read comments, run the file.
 *  - Uncomment the ❌ lines to see errors or alternate behavior.
 ****************************************************************************************/

console.log("\n==================== 1) OBJECT CREATION ====================\n");

// 1.1 Object literal (most common)
const personLiteral = {
  id: 1,
  name: "Alice",
  age: 25,
  contact: {
    email: "alice@example.com",
    phone: "555-0101"
  },
  hobbies: ["reading", "hiking"]
};
console.log("personLiteral:", personLiteral);

// 1.2 Constructor function (older style)
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const p2 = new Person("Bob", 30);
console.log("Person instance:", p2);

// 1.3 Object.create (set prototype explicitly)
const proto = { greet() { return `hi ${this.name}`; } };
const p3 = Object.create(proto);
p3.name = "Charlie";
console.log("Object.create proto greeting:", p3.greet());

// 1.4 Dynamic / computed property names
const dynamicKey = "score_2025";
const stats = {
  [dynamicKey]: 98,  // computed property name
  level: "A"
};
console.log("computed property:", stats);

// 1.5 Property shorthand (when variable name equals property name)
const name = "Diana", age = 22;
const shorthand = { name, age }; // same as { name: name, age: age }
console.log("property shorthand:", shorthand);

console.log("\n==================== 2) READ / UPDATE / DELETE ====================\n");

const obj = { a: 10, b: 20 };
console.log("initial obj:", obj);

// read
console.log("obj.a:", obj.a);
console.log("obj['b']:", obj['b']);

// update
obj.a = 100;
obj.c = 300; // add new property
console.log("after update:", obj);

// delete
delete obj.b;
console.log("after delete b:", obj);

// Note: deleting changes the shape of the object (affects performance in V8 if done frequently)

console.log("\n==================== 3) SHALLOW COPY vs DEEP COPY ====================\n");

/*
  - Spread (...) and Object.assign create shallow copies.
  - Nested objects/arrays remain shared references.
  - For simple data you can use JSON.parse(JSON.stringify(obj)) for deep clone,
    but it fails for functions, undefined, dates, regex, Maps, Sets, circular refs.
*/

// shallow copy via spread
const original = { x: 1, nested: { y: 2 } };
const shallow = { ...original };
shallow.x = 10;
shallow.nested.y = 20;
console.log("original after shallow changes:", original);
// original.nested.y changed -> demonstrates shallow copy

// deep clone (simple cases) - JSON method
const deepOriginal = { a: 1, nested: { b: 2 } };
const deepClone = JSON.parse(JSON.stringify(deepOriginal));
deepClone.nested.b = 99;
console.log("deepOriginal after deepClone change:", deepOriginal); // unaffected

// For robust deep clone use libraries like lodash.cloneDeep (not shown here)

console.log("\n==================== 4) MERGING OBJECTS ====================\n");

const defaults = { theme: "light", notifications: true };
const userSettings = { notifications: false, compactMode: true };

// Object.assign (mutates first object)
const mergedAssign = Object.assign({}, defaults, userSettings); // non-mutating since first arg is {}
console.log("merged (assign):", mergedAssign);

// Spread merge (preferred, concise)
const mergedSpread = { ...defaults, ...userSettings };
console.log("merged (spread):", mergedSpread);

// Note: later props overwrite earlier ones

console.log("\n==================== 5) OBJECT DESTRUCTURING (BASICS) ====================\n");

/*
  Syntax:
    const { prop1, prop2 } = obj;
    const { nested: { a, b } } = obj;
    const { prop: alias = defaultValue } = obj;
    const { ...rest } = obj;   // rest collects remaining properties
*/

const student = {
  id: 101,
  name: "Eve",
  marks: { math: 85, sci: 92 },
  class: "10A",
  address: { city: "Hyderabad", pin: 500001 }
};

// basic extraction
const { id: studId, name: studName } = student; // rename id->studId, name->studName
console.log("id and name via destructuring:", studId, studName);

// nested destructuring + defaults
const {
  marks: { math: mathMarks, eng = 0 }, // eng default 0 if not present
  address: { city },
  age: studentAge = 16 // default if age not present
} = student;
console.log("mathMarks, eng(default), city, age(default):", mathMarks, eng, city, studentAge);

// rest pattern for objects
const { class: className, ...studentRest } = student;
console.log("className:", className);
console.log("studentRest (remaining props):", studentRest);

// destructure with alias and default
const { nonExisting = "N/A" } = student;
console.log("nonExisting with default:", nonExisting);

console.log("\n==================== 6) ARRAY DESTRUCTURING ====================\n");

/*
  Syntax:
    const [a, b] = arr;
    const [first, , third] = arr; // skip elements
    const [head, ...tail] = arr;  // rest for arrays
    swapping: [a, b] = [b, a];
*/

const arr = [10, 20, 30, 40];

// basic
const [first, second] = arr;
console.log("first, second:", first, second);

// skip
const [fst, , third] = arr;
console.log("fst, third:", fst, third);

// rest
const [head, ...tail] = arr;
console.log("head:", head, "tail:", tail);

// swap
let A = 1, B = 2;
console.log("before swap A,B:", A, B);
[A, B] = [B, A];
console.log("after swap A,B:", A, B);

// destructure arrays inside objects
const data = { scores: [100, 95, 80] };
const { scores: [topScore, secondScore] } = data;
console.log("topScore, secondScore (from nested array):", topScore, secondScore);

console.log("\n==================== 7) DESTRUCTURING IN FUNCTION PARAMETERS ====================\n");

/* Useful for:
   - pulling specific options from a options object
   - giving default values
*/

function createUser({ id, name, role = "student", active = true }) {
  return { id, name, role, active };
}

console.log("createUser:", createUser({ id: 200, name: "Frank" }));

// destructure arrays in params
function sumTopTwo([a = 0, b = 0]) {
  return a + b;
}
console.log("sumTopTwo:", sumTopTwo([5, 7]));

// safe destructuring with default param to avoid error when undefined passed
function printCoords({ x = 0, y = 0 } = {}) {
  console.log("coords:", x, y);
}
printCoords({ x: 10, y: 20 });
printCoords(); // safe, because default param {} used

console.log("\n==================== 8) COMMON GOTCHAS & NOTES ====================\n");

// 8.1 Destructuring from undefined/null throws
// const {foo} = undefined; // ❌ TypeError: Cannot destructure property 'foo' of 'undefined' as it is undefined
// Use default param or check before destructuring.

// 8.2 Order matters for arrays (position-based); object uses property names (order doesn't matter)
const fooObj = { a: 1, b: 2 };
const { b, a } = fooObj; // fine: b gets 2, a gets 1

// 8.3 Rest in destructuring copies shallowly (references kept)
// Correct shallow copy demonstration
const deepExample = { p: { q: 1 }, r: 2 };
const shallowCopy = { ...deepExample }; // copies top-level, nested still references
shallowCopy.p.q = 99; // mutates original nested object
console.log("deepExample after shallowCopy.p.q = 99:", deepExample);


// 8.4 Default values are used only when the value is `undefined` (not null or falsey)
const objWithNull = { x: null };
const { x = 5 } = objWithNull;
console.log("x when property is null (default not applied):", x); // null

console.log("\n==================== 9) PRACTICAL EXAMPLES ====================\n");

// Example A: pick specific props from object (pick utility)
function pick(obj, keys) {
  return keys.reduce((acc, k) => {
    if (k in obj) acc[k] = obj[k];
    return acc;
  }, {});
}
console.log("pick example:", pick(student, ["id", "name", "address"]));

// Example B: flatten nested structure using destructuring + map
const users = [
  { id: 1, profile: { name: "Gina" } },
  { id: 2, profile: { name: "Hank" } }
];
const namesFromUsers = users.map(u => u.profile.name); // easily pull nested props
console.log("namesFromUsers:", namesFromUsers);

// Example C: swapping key names while extracting
const source = { a: 10, b: 20 };
const { a: alpha, b: beta } = source;
console.log("alpha, beta (renamed):", alpha, beta);

console.log("\n==================== 10) EXERCISES FOR STUDENTS ====================\n");

/*
  1) Write a function `omit(obj, keys)` that returns a new object without the specified keys.
  2) Given array of products: [{id, name, price, tag: {category}}], use destructuring to
     produce array of {id, name, category}.
  3) Deep clone an object that contains Date objects and functions — research and explain why
     JSON clone fails, and show a solution (hint: structuredClone in modern Node or use a library).
  4) Write a function `safeGet(obj, path, defaultVal)` that safely retrieves nested prop using destructuring or optional chaining.
*/

// starter for exercise 1:
function omit(obj, keys = []) {
  const result = { ...obj };
  keys.forEach(k => delete result[k]);
  return result;
}
console.log("omit example:", omit({ a: 1, b: 2, c: 3 }, ["b", "c"]));

console.log("\nEnd of objects-destructuring-demo.js — modify and re-run to explore behaviors!\n");
