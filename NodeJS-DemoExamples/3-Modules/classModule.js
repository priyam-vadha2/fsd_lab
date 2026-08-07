// classModule.js
// -------------------------
// Demonstrates exporting a constructor/class using module.exports
// (commonly used when a module "is" a single class or single function)
// -------------------------

class Greeter {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}

// Export the class as the module's single export (default-like behavior)
module.exports = Greeter;

// In importing code: const Greeter = require('./classModule');
// Then: const g = new Greeter('Pradeep');
