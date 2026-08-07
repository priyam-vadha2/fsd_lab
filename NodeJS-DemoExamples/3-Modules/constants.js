// constants.js
// -------------------------
// Demonstrates exporting simple constants / values using named exports
// (i.e., attaching properties to module.exports)
// -------------------------

// A few constants
const PI = 3.14159;
const APP_NAME = "Module Demo";
const VERSION = "1.0.0";

// Attach to module.exports as named properties
module.exports.PI = PI;
module.exports.APP_NAME = APP_NAME;
module.exports.VERSION = VERSION;

// Alternatively, the above could be written as:
// exports.PI = PI; exports.APP_NAME = APP_NAME; exports.VERSION = VERSION;
// (exports is a shorthand alias for module.exports)
