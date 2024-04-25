const fs = require('fs'); 

const textIn = fs.readFileSync('./1-node-farm/starter/txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `this is waht we know about the avocado ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./1-node-farm/starter/txt/output.txt', textOut);
console.log('File wirtten');
