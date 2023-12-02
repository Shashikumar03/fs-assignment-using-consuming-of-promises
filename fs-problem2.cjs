const fs = require("fs").promises;
function fsProblem2() {
  readLipsumFile("./lipsum.txt")
    .then((data) => convertingToUpperCase(data))
    .then((upperTxtPath) => readAndConvertToLowerCase(upperTxtPath))
    .then((lowerFilePath) => readAndSort(lowerFilePath))
    .then((filnamePath) => fileToBeDeleted(filnamePath))
    .then((message) => console.log(message));
}

function readLipsumFile(lipsumFile) {
  return fs
    .readFile(lipsumFile, "utf-8")
    .then((data) => data)
    .catch((err) => {
      throw new Error(`error redLipsumFile : ${err.message}`);
    });
}
function convertingToUpperCase(data) {
  const upperText = data.toUpperCase();
  return fs
    .writeFile("./upper.txt", upperText)
    .then(() => fs.writeFile("./filename.txt", "upper.txt"))
    .then(() => "./upper.txt")
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
      return fs
        .writeFile("./lower.txt", sentence)
        .then(() => {
          return fs
            .appendFile("./filename.txt", "\nlower.txt")
            .then(() => "lower.txt")
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function readAndSort(filePath) {
  return fs
    .readFile(filePath, "utf-8")
    .then((data) => {
      const sortedText = data.split("\n").sort().join("\n");
      return fs
        .writeFile("./sorted.txt", sortedText)
        .then(() => {
          return fs
            .appendFile("./filename.txt", "\nsorted.txt")
            .then(() => "./filename.txt")
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}
function fileToBeDeleted(filePath) {
  return fs
    .readFile(filePath, "utf-8")
    .then((data) => {
      const fileToDelete = data.split("\n");
      fileToDelete.forEach((filename) => {
        return fs
          .unlink(filename)
          .then(() => "complted")
          .catch((err) => console.log(err));
      });
      return "completed";
    })
    .catch((err) => console.log(err));
}

module.exports = fsProblem2;
