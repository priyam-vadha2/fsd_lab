"use strict";
// ---------- 1. Simple Types ----------
Object.defineProperty(exports, "__esModule", { value: true });
// number
let age = 20;
let marks = 95.5;
// string
let studentName = "Hema";
// boolean
let isPassed = true;
console.log("----- Simple Types -----");
console.log("Age:", age);
console.log("Marks:", marks);
console.log("Name:", studentName);
console.log("Passed:", isPassed);
// ---------- 2. Special Types ----------
// any
let value = 100;
console.log("\nAny Value:", value);
value = "Hello TypeScript";
console.log("Any Value Changed:", value);
// unknown
let data = "Welcome";
if (typeof data === "string") {
    console.log("Unknown Value:", data.toUpperCase());
}
// void
function greet() {
    console.log("Welcome to TypeScript!");
}
console.log("\nVoid Function:");
greet();
// ---------- 3. Compile and Run ----------
console.log("\nCompile Command:");
console.log("tsc lab1.ts");
console.log("Run Command:");
console.log("node lab1.js");
// ---------- 4. Simple Programs with Type Annotations ----------
// Program 1: Addition
let num1 = 10;
let num2 = 20;
let sum = num1 + num2;
console.log("\nAddition:");
console.log("Sum =", sum);
// Program 2: Greeting
let message = "Hello";
let user = "Student";
console.log("\nGreeting:");
console.log(message + " " + user);
// Program 3: Voting Eligibility
let personAge = 18;
let canVote = personAge >= 18;
console.log("\nVoting Eligibility:");
console.log("Can Vote:", canVote);
//# sourceMappingURL=lab1.js.map