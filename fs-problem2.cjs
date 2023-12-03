const fs = require("fs").promises;
const UPPER_TXT_PATH = "upper.txt";
const LOWER_TXT_PATH = "lower.txt";
const SORT_TXT_PATH = "sorted.txt";

function fsProblem2(LIPSUN_FILE_PATH) {
  readLipsumFile(LIPSUN_FILE_PATH)
    .then((data) => convertingToUpperCase(data))
    .then((upperTxtPath) => readAndConvertToLowerCase(upperTxtPath))
    .then((lowerFilePath) => readAndSort(lowerFilePath))
    .then((filnamePath) => fileToBeDeleted(filnamePath))
    .catch((err) => {
      throw new Error(`Error in ${err.message}`);
    });
}

function readLipsumFile(lipsumFile) {
  return fs.readFile(lipsumFile, "utf-8").catch((err) => {
    throw new Error(`error redLipsumFile : ${err.message}`);
  });
}
function convertingToUpperCase(data) {
  const upperText = data.toUpperCase();
  return fs
    .writeFile(UPPER_TXT_PATH, upperText)
    .then(() => fs.writeFile("./filename.txt", UPPER_TXT_PATH))
    .then(() => UPPER_TXT_PATH)
    .catch((err) => {
      throw new Error(`error in convertingToUpperCase- ${err.message}`);
    });
}
function readAndConvertToLowerCase(upperTxtPath) {
  return fs
    .readFile(upperTxtPath, "utf-8")
    .then((data) => {
      const lowerTxt = data.toLowerCase();
      const sentence = lowerTxt.split(".").join("\n");
      return fs.writeFile(LOWER_TXT_PATH, sentence);
    })
    .then(() => fs.appendFile("./filename.txt", `\n${LOWER_TXT_PATH}`))
    .then(() => LOWER_TXT_PATH)
    .catch((err) => {
      throw new Error(`Error in readAndConvertToLowerCase: ${err.message}`);
    });
}

function readAndSort(filePath) {
  return fs
    .readFile(filePath, "utf-8")
    .then((data) => {
      const sortedText = data.split("\n").sort().join("\n");
      return fs.writeFile(SORT_TXT_PATH, sortedText);
    })
    .then(() => fs.appendFile("./filename.txt", `\n${SORT_TXT_PATH}`))
    .then(() => "./filename.txt")
    .catch((err) => {
      throw new Error(`Error in readAndSort: ${err.message}`);
    });
}

function fileToBeDeleted(filePath) {
  return fs
    .readFile(filePath, "utf-8")
    .then((data) => {
      const fileToDelete = data.split("\n");
      const filesdeletd = fileToDelete.map((filename) => {
        fs.unlink(filename);
        console.log(`${filename} is deleted`);
      });
      return "succesfull completed all opration";
    })
    .then((ss) => ss)
    .catch((err) => {
      throw new Error(`Error in fileToBeDeleted: ${err.message}`);
    });
}

module.exports = fsProblem2;
