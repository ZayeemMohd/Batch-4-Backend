const fs = require("fs");
const path = require("path");

// /Users/zayeemmohd/Desktop/Batch-4 Backend/Day 0 ../ /apple.txt


const filePath = path.join(__dirname, "fruits.txt")
console.log(filePath)

// const filePath = __dirname + "../" + "fruits.txt";
// console.log(filePath);

// const data = fs.readFileSync(filePath, "utf8");

const oldData = fs.readFileSync(filePath, "utf8")

fs.writeFileSync(filePath, oldData + "hello world", 'utf8')


const data = fs.readFileSync(filePath, "utf8");
console.log(data)


fs.readFile
fs.writeFile
fs.readFileSync
fs.writeFileSync