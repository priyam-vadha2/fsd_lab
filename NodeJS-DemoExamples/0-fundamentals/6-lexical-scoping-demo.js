/****************************************************************************************
 * lexical-scoping-demo.js
 *
 * Teaching goals:
 *  - Explain lexical scoping in JavaScript
 *  - Demonstrate nested functions and closures
 *  - Show how variable lookup works with var, let, and const
 *  - Demonstrate shadowing and scope chain
 *
 * Run:
 *  node lexical-scoping-demo.js
 *
 * Tip:
 *  - Read comments and uncomment lines to experiment
 ****************************************************************************************/

console.log("\n==================== 1) BASIC LEXICAL SCOPE ====================\n");

// Lexical scope: A function’s scope is determined by where it is **defined**, not where it is called

const globalVar = "I am global";

function outerFunction() {
  const outerVar = "I am outer";

  function innerFunction() {
    const innerVar = "I am inner";

    console.log(globalVar);  // Accessible (global)
    console.log(outerVar);   // Accessible (outer function variable)
    console.log(innerVar);   // Accessible (own variable)
  }

  innerFunction();

  // console.log(innerVar); // ❌ Error: innerVar is not defined here
}

outerFunction();

// console.log(outerVar); // ❌ Error: outerVar is not defined here

/****************************************************************************************
 * Key points:
 *  - innerFunction can access variables of outerFunction and global
 *  - outerFunction cannot access variables defined in innerFunction
 ****************************************************************************************/


console.log("\n==================== 2) LEXICAL SCOPE WITH VAR / LET / CONST ====================\n");

// var is function-scoped
function varScopeExample() {
  if (true) {
    var x = 10; // function-scoped
    let y = 20; // block-scoped
    const z = 30; // block-scoped
    console.log("inside if block:", x, y, z);
  }

  console.log("outside if block, x (var):", x); // accessible
  // console.log("outside if block, y (let):", y); // ❌ Error: y not defined
  // console.log("outside if block, z (const):", z); // ❌ Error: z not defined
}

varScopeExample();


console.log("\n==================== 3) CLOSURES ====================\n");

// Closure: a function remembers the variables in its lexical scope even after the outer function has finished execution

function makeCounter() {
  let count = 0; // variable in lexical scope

  return function () { // inner function forms closure over count
    count++;
    console.log("Current count:", count);
  };
}

const counter1 = makeCounter();
counter1(); // 1
counter1(); // 2

const counter2 = makeCounter(); // new lexical scope
counter2(); // 1
counter1(); // 3 (counter1 remembers its own lexical environment)


console.log("\n==================== 4) NESTED FUNCTION SCOPES ====================\n");

function level1(a) {
  const varL1 = "L1";

  return function level2(b) {
    const varL2 = "L2";

    return function level3(c) {
      const varL3 = "L3";

      console.log("level3 can access:", a, varL1, b, varL2, c, varL3);
    };
  };
}

const fn2 = level1("aVal");       // returns level2
const fn3 = fn2("bVal");          // returns level3
fn3("cVal");                      // logs all variables from 3 levels


console.log("\n==================== 5) VARIABLE SHADOWING ====================\n");

const shadowVar = "Global";

function shadowExample() {
  const shadowVar = "Outer"; // shadows global

  function innerShadow() {
    const shadowVar = "Inner"; // shadows outer
    console.log("innerShadow sees shadowVar:", shadowVar);
  }

  innerShadow();
  console.log("shadowExample sees shadowVar:", shadowVar);
}

shadowExample();
console.log("Global shadowVar:", shadowVar);


console.log("\n==================== 6) CLOSURE USE CASES ====================\n");

// 6a) Private variable pattern
function createBankAccount(initialBalance) {
  let balance = initialBalance; // private variable

  return {
    deposit(amount) {
      balance += amount;
      console.log(`Deposited ${amount}, new balance: ${balance}`);
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        console.log(`Withdrew ${amount}, remaining balance: ${balance}`);
      } else {
        console.log("Insufficient funds!");
      }
    },
    getBalance() {
      console.log("Current balance:", balance);
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);   // 150
account.withdraw(30);  // 120
account.getBalance();  // 120
// console.log(account.balance); // ❌ Cannot access private variable directly

// 6b) Partial application
function multiply(a) {
  return function(b) {
    return a * b; // remembers a from outer lexical scope
  };
}

const double = multiply(2);
const triple = multiply(3);
console.log("double 5:", double(5)); // 10
console.log("triple 5:", triple(5)); // 15

console.log("\n==================== 7) EXERCISES ====================\n");

/*
  1) Write a function that returns a greeting function for a given name
     const greetMunnni = makeGreeting("Munnni");
     greetMunnni(); // Hello Munnni
  2) Write a counter that allows increment and decrement methods using closure
  3) Modify makeCounter to accept a step parameter (how much to increase each time)
  4) Demonstrate shadowing with let inside nested blocks
*/

console.log("\nEnd of lexical-scoping-demo.js — run and modify to experiment with scoping!");
