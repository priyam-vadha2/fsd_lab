/****************************************************************************************
 * 2-data-types-coercion-demo.js
 *
 * Purpose:
 *  - Demonstrate JavaScript data types (primitives + objects)
 *  - Show how implicit (automatic) and explicit coercion work
 *  - Highlight common gotchas for beginners
 *
 * Run:
 *  node data-types-coercion-demo.js
 *
 * Tip for students:
 *  - Read comments, run the file, then try uncommenting the ❌ lines to see errors or
 *    different outputs. Play with small changes.
 ****************************************************************************************/

/* =========================
   1) Primitive data types
   ========================= */
// JS primitives: number, string, boolean, null, undefined, symbol, bigint
console.log("\n---- 1) Primitive types ----");

const n = 42;                      // number (floating point in JS)
const s = "Hello";                 // string
const b = true;                    // boolean
const nothing = null;              // null (explicit empty)
let notAssigned;                   // undefined (declared, not initialized)
const sym = Symbol("id");          // symbol (unique)
const big = 9007199254740991n;     // BigInt (note the `n` suffix)

console.log("typeof n:", typeof n);            // "number"
console.log("typeof s:", typeof s);            // "string"
console.log("typeof b:", typeof b);            // "boolean"
console.log("typeof nothing:", typeof nothing); // "object" <-- legacy quirk
console.log("typeof notAssigned:", typeof notAssigned); // "undefined"
console.log("typeof sym:", typeof sym);        // "symbol"
console.log("typeof big:", typeof big);        // "bigint"

/* =========================
   2) Object types
   ========================= */
console.log("\n---- 2) Objects, arrays, functions ----");

const obj = { name: "Alice" };
const arr = [1, 2, 3];
function fn() { return "I am a function"; }

console.log("typeof obj:", typeof obj);      // "object"
console.log("Array.isArray(arr):", Array.isArray(arr)); // true
console.log("typeof fn:", typeof fn);        // "function"

/* =========================
   3) Special numeric values
   ========================= */
console.log("\n---- 3) NaN, Infinity, -0 ----");

console.log("0/0 =>", 0/0);                // NaN
console.log("typeof NaN =>", typeof NaN);  // "number"
console.log("1/0 =>", 1/0);                // Infinity
console.log("-1/0 =>", -1/0);              // -Infinity

// NaN is the only value not equal to itself
console.log("NaN === NaN :", NaN === NaN); // false
console.log("Number.isNaN(NaN):", Number.isNaN(NaN)); // true
console.log("isNaN('foo'):", isNaN('foo')); // true  (coerces first) — surprising
console.log("Number.isNaN('foo'):", Number.isNaN('foo')); // false (no coercion)

// -0 vs +0
console.log("0 === -0:", 0 === -0);             // true
console.log("Object.is(0, -0):", Object.is(0, -0)); // false (Object.is distinguishes)

/* =========================
   4) Implicit (automatic) coercion examples
   ========================= */
console.log("\n---- 4) Implicit coercion (automatic) ----");

// String concatenation when using +
console.log("'5' + 3 =", '5' + 3); // "53"  (number coerced to string)

// Numeric coercion for -, *, /, %, unary +
console.log("'5' - 2 =", '5' - 2); // 3 (string coerced to number)
console.log("'6' * '7' =", '6' * '7'); // 42
console.log("'10' / '2' =", '10' / '2'); // 5
console.log("+'123' =", +'123'); // 123 (unary + coerces to number)
console.log("+'  123  ' =", +'  123  '); // 123 (whitespace OK)
console.log("Number('') =", Number('')); // 0
console.log("Number(' ') =", Number(' ')); // 0

// Weird results: empty array, empty object
console.log("[] + [] =", [] + []);   // "" (both arrays coerced to empty strings)
console.log("[] + {} =", [] + {});   // "[object Object]" (array -> "" then + object->"[object Object]")
console.log("{} + [] =", {} + []);   // 0 or "[object Object]" depending on parsing (be careful when testing in REPL vs script)

// Boolean coercion in conditionals (truthy / falsy)
console.log("Boolean(0) =>", Boolean(0)); // false
console.log("Boolean('') =>", Boolean('')); // false
console.log("Boolean(null) =>", Boolean(null)); // false
console.log("Boolean([]) =>", Boolean([])); // true
console.log("Boolean({}) =>", Boolean({})); // true

/* =========================
   5) Explicit coercion (recommended)
   ========================= */
console.log("\n---- 5) Explicit coercion ----");

console.log("String(123) =>", String(123));      // "123"
console.log("Number('123') =>", Number('123'));  // 123
console.log("parseInt('123px') =>", parseInt('123px', 10)); // 123 (radix specified)
console.log("parseFloat('3.14m') =>", parseFloat('3.14m')); // 3.14

// parseInt gotcha: always specify radix
console.log("parseInt('08') =>", parseInt('08', 10)); // 8 (explicit radix is safe)
// If you omit radix, older JS engines might treat '08' as octal — avoid the risk

/* =========================
   6) == vs === (equality) differences
   ========================= */
console.log("\n---- 6) == (loose) vs === (strict) ----");

console.log("0 == '0' =>", 0 == '0');      // true (coerces)
console.log("0 === '0' =>", 0 === '0');    // false (different types)

console.log("false == 0 =>", false == 0);  // true
console.log("false === 0 =>", false === 0); // false

console.log("null == undefined =>", null == undefined); // true
console.log("null === undefined =>", null === undefined); // false

// Surprising coercions
console.log("'' == 0 =>", '' == 0);        // true ('' -> 0)
console.log("' ' == 0 =>", ' ' == 0);      // true (' ' -> 0)

// Best practice: use === unless you have a specific reason to allow coercion

/* =========================
   7) ToPrimitive and object coercion rules
   ========================= */
console.log("\n---- 7) Object -> primitive coercion (toString/valueOf) ----");

const o1 = {
  valueOf() { return 10; },      // used for numeric coercion
  toString() { return "obj10"; } // used for string coercion
};

console.log("o1 + 5 =>", o1 + 5);        // 15 -> valueOf used for numeric + operator
console.log("String(o1) =>", String(o1)); // "obj10" -> toString used

// Arrays: join to string
console.log("[1,2] + [3,4] =>", [1,2] + [3,4]); // "1,23,4" (arrays -> "1,2" and "3,4")

/* =========================
   8) Template literals -- explicit, readable coercion
   ========================= */
console.log("\n---- 8) Template literals ----");

const people = 3;
console.log(`We have ${people} people.`); // "We have 3 people."

/* =========================
   9) BigInt + Number caution
   ========================= */
console.log("\n---- 9) BigInt interactions ----");

const big1 = 10n;
const num1 = 5;
// console.log(big1 + num1); // ❌ TypeError: Cannot mix BigInt and other types
console.log("BigInt + BigInt =>", big1 + 20n); // 30n
console.log("Convert BigInt to Number explicitly:", Number(big1) + num1); // 15

/* =========================
   10) Common beginner pitfalls
   ========================= */
console.log("\n---- 10) Pitfalls ----");

// 1) Using == accidentally:
console.log("[''] == false =>", [''] == false); // true (array->'' -> 0 -> false)

// 2) isNaN vs Number.isNaN
console.log("isNaN('foo') =>", isNaN('foo')); // true (coerces 'foo' -> NaN -> true)
console.log("Number.isNaN('foo') =>", Number.isNaN('foo')); // false (no coercion)

// 3) parseInt without radix -> unexpected values on some engines. Always pass radix.
console.log("parseInt('0x10') =>", parseInt('0x10', 16)); // 16 (explicit radix)

// 4) Accidental string concatenation with +
console.log("'1' + 2 + 3 =>", '1' + 2 + 3); // "123" (left-to-right)
console.log("1 + 2 + '3' =>", 1 + 2 + '3'); // "33"

// 5) Empty values & Boolean tests
if (0) { console.log("won't run"); } else { console.log("0 is falsy"); }
if ('') { console.log("won't run"); } else { console.log("empty string is falsy"); }
if ([]) { console.log("array is truthy"); } // arrays are truthy even if empty

/* =========================
   11) Quick exercises for students (uncomment and try)
   ========================= */
console.log("\n---- 11) Exercises (uncomment lines to try) ----");

// 1) What is the result and why?
// console.log("'5' - '2' + 'px'");

// 2) How to convert "  123abc" -> 123 (number)?
// console.log(Number("  123abc"));   // NaN
// console.log(parseInt("  123abc", 10)); // 123

// 3) Why is this true: [] == ![] ?
// console.log([] == ![]);

// 4) What will this print and why? (Object.is vs ===)
// console.log(Object.is(NaN, NaN), NaN === NaN);

/* =========================
   12) Teaching summary (short)
   ========================= */
console.log("\n---- 12) Teaching summary ----");
console.log(`
- JavaScript has primitives + objects. typeof is helpful but has quirks (typeof null === "object").
- Coercion can be implicit (automatic) or explicit (use Number(), String(), Boolean()).
- Use === for equality to avoid surprising coercions from ==.
- Prefer explicit conversions and template literals for readability.
- Watch out for NaN, -0, and mixing BigInt with Number.
`);

/* =========================
   13) Final note
   =========================
   Encourage students to:
    - Experiment: change values and re-run
    - Use console.log to inspect types with typeof and Object.is
    - Read MDN pages for Number, String, Object, BigInt, Symbol, and coercion rules
*/
