const fs = require("fs");

const filePath = process.argv[3];

const data = fs.readFileSync(filePath, "utf8");

function letterCount() {
  console.log("The number of letter in this file: ", data.length);
}

function wordCount() {
  const linesArr = data.split("\n");
  let words = 0;
  linesArr.forEach((line) => {
    words = words + line.split(" ").length;
  });

  console.log("The number of words in this files: ", words);
}

function lineCount() {
  console.log("The number of lines in this files: ", data.split("\n").length);
}

if (process.argv[2] == "letter") {
  letterCount();
} else if (process.argv[2] == "words") {
  wordCount();
} else if (process.argv[2] == "lines") {
  lineCount();
} else if (process.argv[2] == "all") {
  letterCount();
  wordCount();
  lineCount();
}
