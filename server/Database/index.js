const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'books.json');

const updateJson = (books, res) => {
  fs.writeFile(filePath, JSON.stringify(books), (err) => {
    if (err) {
      res.status(500, { 'Content-Type': 'text/html' }).send("<h1>Sorry, we've had a problem on our end</h1>");
    }
  });
};
const openJson = (req, res, cb) => {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.status(500, { 'Content-Type': 'text/html' }).send("<h1>Sorry, we've had a problem on our end</h1>");
    } else {
      cb(req, res, data);
    }
  });
};

module.exports = {
  updateJson,
  openJson,
};
