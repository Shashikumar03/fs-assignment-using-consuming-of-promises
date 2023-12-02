const fs = require("fs").promises;
function fsProblem(dirPath, n) {
  if (n === 0) {
    return;
  }
  createDirectory(dirPath)
    .then((existingDirPath) => createFiles(`${existingDirPath}/${n}.json`))
    .then((filePath) => deleteFiles(filePath))
    .then(() => fsProblem(dirPath, --n))
    .catch((err) => console.error(`Error in fsProblem: ${err.message}`));
}

function createDirectory(dirPath) {
  return fs
    .mkdir(dirPath, { recursive: true })
    .then(() => dirPath)
    .catch((err) => {
      throw new Error(`Error creating directory: ${err.message}`);
    });
}
function createFiles(filePath) {
  return fs
    .writeFile(filePath, "hello")
    .then(() => filePath)
    .catch((err) => {
      throw new Error(`Error creating file: ${err.message}`);
    });
}

function deleteFiles(filePath) {
  setTimeout(() => {
    return fs
      .unlink(filePath)
      .then(() => {
        console.log(`file ${filePath} is deleted`);
        return;
      })
      .catch((err) => {
        throw new Error(`Error delete file:${err.message}`);
      });
  }, 5000);
}
module.exports = fsProblem;
