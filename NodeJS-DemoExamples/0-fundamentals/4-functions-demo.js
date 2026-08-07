/***************************************************************************************
 * functions-demo.js
 *
 * Purpose:
 *  - Show differences and importance of:
 *      1) Function Declarations
 *      2) Function Expressions
 *      3) Arrow Functions (ES6)
 *
 *  - Use the same logic in each style:
 *      * Filter students who passed
 *      * Map to simple results (names)
 *      * Compute average marks
 *
 * Run:
 *  node functions-demo.js
 *
 * Teaching notes:
 *  - Read comments; run the file. Uncomment the ❌ lines to see errors / different behavior.
 *  - Pay special attention to hoisting, `this`, `arguments`, and constructor behavior.
 ***************************************************************************************/

/* ---------------------------
   Sample data (shared logic)
   --------------------------- */
const students = [
  { name: "Mouni", marks: 85 },
  { name: "Mahi", marks: 52 },
  { name: "Nisha", marks: 78 },
  { name: "Hema", marks: 95 }
];

const PASS_MARK = 60;

/* ============================================================
   1) Function Declaration
   - Hoisted: you can call it before it's declared
   - Has its own `this` when used as a method (dynamic)
   - Has access to `arguments` object
   ============================================================ */

// Calling before declaration (works because of hoisting)
console.log("1) Function Declaration — calling before declaration (hoisted):");
try {
  const top = getTopStudentsDeclaration(students, PASS_MARK);
  console.log("Top students (declaration):", top);
} catch (err) {
  console.log("Error calling hoisted function:", err.message);
}

// Function declaration (clearly named)
function getTopStudentsDeclaration(list, passMark) {
  // `arguments` exists here (function declarations and expressions)
  // console.log('arguments in declaration:', arguments);

  // Filter -> Map -> Return names of students above passMark
  const passed = list.filter(function (s) {
    return s.marks >= passMark;
  });

  return passed.map(function (s) {
    return s.name;
  });
}

// Another declaration: compute average
function computeAverageDeclaration(list) {
  //reduce() is a built-in array method used to accumulate array values into a single result
  //array.reduce(callback, initialValue)
  const total = list.reduce(function (acc, s) {
    return acc + s.marks;
  }, 0);
  return total / list.length;
}

console.log("Average (declaration):", computeAverageDeclaration(students).toFixed(2));
console.log("-----------------------------------------------------------\n");


/* ============================================================
   2) Function Expression
   - Not hoisted in the same way: variable is hoisted but assignment isn't.
     Calling before assignment will throw (or be undefined).
   - Can be named or anonymous
   - Has its own `this` when used as a method (dynamic)
   - Has access to `arguments`
   ============================================================ */

console.log("2) Function Expression — calling before assignment (shows error but captured):");
try {
  // ❌ This will throw because computeAverageExpression is not assigned yet.
  // Uncomment to see the actual error (ReferenceError or TypeError).
  // computeAverageExpression(students);
  console.log("Calling before assignment is commented out to avoid crash.");
} catch (err) {
  console.log("Error:", err.message);
}

// Function expression assigned to a const
const getTopStudentsExpression = function (list, passMark) {
  // functions expressions can have a name for debugging:
  // const getTopStudentsExpression = function innerName(list) { ... }
  const passed = list.filter(function (s) {
    return s.marks >= passMark;
  });
  return passed.map(function (s) {
    return s.name;
  });
};

const computeAverageExpression = function (list) {
  const total = list.reduce(function (acc, s) {
    return acc + s.marks;
  }, 0);
  return total / list.length;
};

console.log("Top students (expression):", getTopStudentsExpression(students, PASS_MARK));
console.log("Average (expression):", computeAverageExpression(students).toFixed(2));
console.log("-----------------------------------------------------------\n");


/* ============================================================
   3) Arrow Functions (ES6)
   - Shorter syntax (concise body with implicit return OR block body)
   - Arrow functions do NOT have their own `this` (lexical `this`)
   - Arrow functions do NOT have `arguments` object
   - Arrow functions cannot be used as constructors (`new` with arrow -> error)
   ============================================================ */

console.log("3) Arrow Functions — concise & block bodies:");

/* --- same logic with arrows --- */

// Using arrow with explicit return (block body)
const getTopStudentsArrow = (list, passMark) => {
  const passed = list.filter(s => s.marks >= passMark); // arrow in callback for filter
  return passed.map(s => s.name); // arrow in callback for map
};

// Using concise arrow with implicit return for computeAverage
const computeAverageArrow = list =>
  list.reduce((acc, s) => acc + s.marks, 0) / list.length;

// Demonstrate arrow in map/filter callbacks and concise return usage
console.log("Top students (arrow):", getTopStudentsArrow(students, PASS_MARK));
console.log("Average (arrow):", computeAverageArrow(students).toFixed(2));

/* --- arguments behavior demonstration --- */
function showArgumentsDeclaration() {
  console.log("arguments (declaration):", arguments.length, arguments[0]);
}
const showArgumentsExpression = function () {
  console.log("arguments (expression):", arguments.length, arguments[0]);
};
const showArgumentsArrow = () => {
  // Arrow functions DO NOT have 'arguments'
  // console.log(arguments); // ❌ ReferenceError in arrow
  console.log("arguments (arrow):", "no arguments object in arrow functions");
};

showArgumentsDeclaration(1, 2, 3);
showArgumentsExpression(1, 2, 3);
showArgumentsArrow(1, 2, 3);

console.log("-----------------------------------------------------------\n");


/* ============================================================
   4) `this` behavior demo
   - Declarations/expressions: `this` depends on how function is called (dynamic)
   - Arrow: `this` is lexically captured from surrounding scope
   ============================================================ */

console.log("4) `this` behavior demo:");

const counterDeclaration = {
  count: 0,
  // method using function declaration (as property)
  inc: function () {
    // here `this` will refer to the object if called as counterDeclaration.inc()
    this.count++;
    console.log("declaration inc this.count:", this.count);
  },
  // method using arrow — lexical `this` (not bound to the object)
  incArrow: () => {
    // `this` here is inherited from outer scope (module/global), NOT the object
    // In Node modules top-level `this` is {}, so this.count is likely undefined
    // This is why arrow functions are not suitable for object methods that use `this`.
    try {
      this.count++; // likely NaN or error depending on environment
      console.log("arrow inc this.count:", this.count);
    } catch (err) {
      console.log("arrow inc error (this is not object):", err.message);
    }
  }
};

// Call methods
counterDeclaration.inc();      // increments object count
counterDeclaration.incArrow(); // does NOT increment object's count (bad method)

// Correct pattern: use arrow for inner callbacks where you want lexical this
const counterWithTimeout = {
  count: 0,
  incLater: function () {
    // `this` refers to object here. Use arrow inside to capture same `this`.
    setTimeout(() => {
      // lexical `this` refers to counterWithTimeout object
      this.count++;
      console.log("incLater (arrow callback) this.count:", this.count);
    }, 100);
  }
};
counterWithTimeout.incLater();

// Wait a bit so setTimeout logs before next section (in Node it's fine)
setTimeout(() => {
  console.log("-----------------------------------------------------------\n");

  /* ============================================================
     5) Constructor behavior
     - Function Declarations and Expressions (regular functions) can be used with `new`
     - Arrow functions CANNOT be used as constructors (they throw)
     ============================================================ */

  console.log("5) Constructor behavior:");

  // Declaration as constructor
  function StudentDeclaration(name, marks) {
    this.name = name;
    this.marks = marks;
  }
  const s1 = new StudentDeclaration("Eve", 88);
  console.log("Student via declaration (new):", s1);

  // Expression as constructor
  const StudentExpression = function (name, marks) {
    this.name = name;
    this.marks = marks;
  };
  const s2 = new StudentExpression("Frank", 73);
  console.log("Student via expression (new):", s2);

  // Arrow function as constructor (commented out because it throws)
  const StudentArrow = (name, marks) => {
    this.name = name;
    this.marks = marks;
  };
  // ❌ The below would throw: "StudentArrow is not a constructor"
  // const s3 = new StudentArrow("Gina", 66);

  console.log("StudentArrow cannot be used with `new` — arrows have no [[Construct]] internal slot.");
  console.log("-----------------------------------------------------------\n");


  /* ============================================================
     6) Summary and best practices (for students)
     ============================================================ */

  console.log("6) Summary & Best Practices:");
  console.log(`
  - Use Function Declarations when you want hoisting and named functions:
    * Good for top-level, utility functions.
  - Use Function Expressions when you want to assign functions to variables,
    or create named expressions for debugging.
  - Use Arrow Functions for short callbacks and when you want lexical 'this'.
    * Avoid arrow functions as object methods that rely on 'this'.
    * Arrow functions have no 'arguments' and cannot be used with 'new'.
  - Prefer const for function expression bindings: const f = () => {};
  - Keep callbacks small; use named functions for complex logic (improves stack traces).
  `);

  /* =========================
     7) Exercises (for students)
     =========================
     - Uncomment the commented lines to experiment.
     - Try calling functions before/after declaration/assignment.
     - Try using arrow as object method and observe `this`.
     - Convert a function declaration to an arrow and fix any broken `this` usages.
  */

  console.log("\n7) Exercises:");
  console.log(`
  1) Uncomment the call to computeAverageExpression before its assignment and see the error.
  2) Try creating an object method using an arrow function and explain why 'this' is wrong.
  3) Replace computeAverageDeclaration with an arrow and ensure it still works.
  4) Try to access 'arguments' inside an arrow and see what happens.
  `);

  console.log("\nEnd of demo file. Rerun after making changes to explore behaviors.");
}, 300);
