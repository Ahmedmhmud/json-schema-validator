const { validate } = require("./validation.js");
const { exampleSchema, validInstance, invalidInstance } = require("./test.js");

console.log(validate(exampleSchema, validInstance)? "Valid":"Invalid"); 
console.log(validate(exampleSchema, invalidInstance)? "Valid":"Invalid"); 