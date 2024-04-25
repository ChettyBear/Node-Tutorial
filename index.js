const fs = require("fs");
const http = require("http");

//////////////////////////////////////////////////////////////////////////////////////
//FILES

// Block, synchronous way
//const textIn = fs.readFileSync("./1-node-farm/starter/txt/input.txt", "utf-8");
//console.log(textIn);

//const textOut = `this is waht we know about the avocado ${textIn}.\nCreated on ${Date.now()}`;
//fs.writeFileSync("./1-node-farm/starter/txt/output.txt", textOut);
//console.log("File wirtten");

// Non-blocking, asynchronous way.
// fs.readFile("./1-node-farm/starter/txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("ERROR!");
//   fs.readFile(
//     `./1-node-farm/starter/txt/${data1}.txt`,
//     "utf-8",
//     (err, data2) => {
//       fs.readFile(
//         "./1-node-farm/starter/txt/append.txt",
//         "utf-8",
//         (err, data3) => {
//           console.log(data3);

//           fs.writeFile(
//             "./1-node-farm/txt/final.txt",
//             `${data2}\n${data3}`,
//             "utf-8",
//             (err) => {
//               console.log("Your file ahs been written!");
//             }
//           );
//         }
//       );
//     }
//   );
// });
// console.log("Will read file!");

//////////////////////////////////////////////////////////////////////////////////////
//SERVER
const server = http.createServer((req, res) => {
  res.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
