const fs = require("fs");
const http = require("http");
const { json } = require("stream/consumers");
const url = require("url");

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

const data = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/dev-data/data.json`,
  "utf-8"
);
const DataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW!");
  } else if (pathName === "/product") {
    res.end("his is the PRODUCT!");
  } else if (pathName === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "Hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
