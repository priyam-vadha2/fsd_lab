/****************************************************************************************
 *  VAR vs LET vs CONST in JavaScript
 *  --------------------------------
 *  Run this file using:
 *      node var-let-const-demo.js
 *
 *  This demo shows:
 *   1️⃣ Scope differences
 *   2️⃣ Re-declaration and re-assignment behavior
 *   3️⃣ Hoisting behavior
 *   4️⃣ Practical examples and gotchas
 ****************************************************************************************/


console.log("\n==================== 1️⃣ BASIC DECLARATION RULES ====================\n");

// ✅ var: can be re-declared and re-assigned
var x = 10;
var x = 20; // re-declaration allowed
x = 30;     // re-assignment allowed
console.log("var x =", x); // 👉 30

// ✅ let: cannot be re-declared in the same scope, but can be re-assigned
let y = 10;
// let y = 20; ❌ Error: Identifier 'y' has already been declared
y = 25; // ✅ allowed
console.log("let y =", y); // 👉 25

// ✅ const: cannot be re-declared OR re-assigned
const z = 50;
// const z = 60; ❌ Error
// z = 70; ❌ Error: Assignment to constant variable
console.log("const z =", z); // 👉 50



console.log("\n==================== 2️⃣ SCOPE DIFFERENCES ====================\n");
/*
    var  → function-scoped (or global if outside any function)
    let  → block-scoped
    const → block-scoped
*/

function testScope() {
  if (true) {
    var a = 1;   // function-scoped
    let b = 2;   // block-scoped
    const c = 3; // block-scoped
  }

  console.log("var a (inside function) =", a); // ✅ accessible
  // console.log(b); ❌ ReferenceError
  // console.log(c); ❌ ReferenceError
}
testScope();



console.log("\n==================== 3️⃣ HOISTING BEHAVIOR ====================\n");
/*
    Hoisting means: variable declarations are moved to the top of their scope.
    BUT only 'var' variables are initialized with 'undefined' before execution.
    'let' and 'const' are hoisted but remain uninitialized (in TDZ - Temporal Dead Zone)
*/

console.log("Access var before declaration:", myVar); // ✅ undefined (hoisted)
var myVar = 10;

// console.log(myLet); ❌ ReferenceError (temporal dead zone)
// let myLet = 20;

// console.log(myConst); ❌ ReferenceError (temporal dead zone)
// const myConst = 30;



console.log("\n==================== 4️⃣ LOOP SCOPING DEMO ====================\n");
/*
    var in loops -> NOT block-scoped, all iterations share same variable
    let in loops -> each iteration gets its own variable
*/

console.log("Using var in for loop:");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 100);
}
// output: 3, 3, 3 (after loop ends, 'i' becomes 3)

console.log("Using let in for loop:");
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j:", j), 100);
}
// output: 0, 1, 2 (each iteration keeps its own copy)



console.log("\n==================== 5️⃣ CONST WITH OBJECTS ====================\n");
/*
    const prevents re-assignment, but DOES NOT make object or array immutable.
    You can still modify object properties or array elements.
*/

const person = { name: "Alice", age: 25 };
person.age = 26; // ✅ allowed
// person = { name: "Bob" }; ❌ Error: can't reassign the variable
console.log("Modified const object:", person);

const numbers = [1, 2, 3];
numbers.push(4); // ✅ allowed
console.log("Modified const array:", numbers);



console.log("\n==================== 6️⃣ PRACTICAL SUMMARY ====================\n");
/*
    ✅ Use 'let' for variables that will change later.
    ✅ Use 'const' for values that should never be reassigned.
    ⚠️ Avoid 'var' in modern JavaScript — it’s legacy and confusing due to hoisting & scope.
*/

console.log(`
SUMMARY:
---------
var   → function-scoped, hoisted (undefined), re-declarable, re-assignable
let   → block-scoped, not hoisted (TDZ), re-assignable, not re-declarable
const → block-scoped, not hoisted (TDZ), not re-assignable, not re-declarable
`);
