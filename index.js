const fs = require("fs");
const path = require("path");

const copyDir = (dirPath, targetPath) => {
  // Target directory name
  const targetDirName = targetPath.split("\\");

  // make the target directory
  makeDir(targetPath, targetDirName[targetDirName.length - 1]);

  // File or Folder
  const contents = readDir(dirPath);

  contents.forEach((content) => {
    const checkContent = content.split(".");
    if (checkContent[1]) {
      copyFile(dirPath + "\\" + content, targetPath + "\\" + content, content);
    } else {
      copyDir(dirPath + "\\" + content, targetPath + "\\" + content);
    }
  });
};

// Make a Directory
const makeDir = (targetPath, content) => {
  try {
    fs.mkdirSync(targetPath);
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(content + " is already exists");
    } else {
      console.log(error);
    }
  }
};

// Copy files
const copyFile = (dirPath, targetPath, content) => {
  try {
    fs.copyFileSync(dirPath, targetPath);
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(content + " is already exists");
    } else {
      console.log(error);
    }
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
