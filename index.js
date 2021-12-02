const fs = require("fs");
const path = require("path");

const copyDir = (dirPath, targetPath) => {
  // make the target directory
  makeDir(targetPath);

  // File or Folder
  const contents = readDir(dirPath);

  contents.forEach((content) => {
    const checkContent = content.split(".");
    if (checkContent[1]) {
      copyFile(dirPath + "\\" + content, targetPath + "\\" + content);
    } else {
      copyDir(dirPath + "\\" + content, targetPath + "\\" + content);
    }
  });
};

// Make a Directory
const makeDir = (targetPath) => {
  try {
    fs.mkdirSync(targetPath);
  } catch (error) {
    console.log(error);
  }
};

// Copy files
const copyFile = (dirPath, targetPath) => {
  try {
    fs.copyFileSync(dirPath, targetPath);
  } catch (error) {
    console.log(error);
  }
};

const readDir = (path) => {
  let dirContents = [];
  try {
    const contents = fs.readdirSync(path);
    dirContents = contents;
  } catch (error) {
    console.log(error);
  }

  return dirContents;
};

module.exports = copyDir;
