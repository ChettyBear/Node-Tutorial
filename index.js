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
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const tempOverview = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(
  `${__dirname}/1-node-farm/starter/dev-data/data.json`,
  "utf-8"
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  //OVerview
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);
    res.end(output);

    //Product
  } else if (pathName === "/product") {
    res.end("his is the PRODUCT!");

    //API
  } else if (pathName === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);

    //Not found
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
