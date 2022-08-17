const path = require('path');
const fs = require('fs').promises;

const filePath = path.join(__dirname, 'books.json');

function readJson() {
  return fs.readFile(filePath, 'utf8');
}

function updateJson(books) {
  return fs.writeFile(filePath, JSON.stringify(books));
}

module.exports = {
  readJson,
  updateJson,
};
