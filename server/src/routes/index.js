const express = require('express');
const routes = express.Router({ caseSensitive: true });
const fs = require('fs');
const path = require('path');
const { Logger } = require('../utils');
const { sendResponse } = require('../utils/response');
const basename = path.basename(__filename);

const getAllFiles = (dirPath, filesArray) => {
  const files = fs.readdirSync(dirPath);
  let arrayOfFiles = filesArray || [];
  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (!fs.statSync(dirPath + '/' + file).isDirectory()) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  return arrayOfFiles;
};

getAllFiles(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file.split(__dirname + '/').pop() !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const filePath = file.split(__dirname + '/').pop() || '';
    const fileName = filePath.slice(0, -3);
    const routePath = path.join('/', fileName).replace(/\\/g, '/');
    try {
      const defRoute = require(`./${filePath}`);
      routes.use(`${routePath}`, defRoute);
    } catch (error) {
      Logger.log(error);
    }
  });

module.exports = routes;
