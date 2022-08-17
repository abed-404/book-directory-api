const Joi = require('joi');

const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().min(3),
    author: Joi.string().min(5),
    edition: Joi.number(),
  });
  return schema.validate(book);
};

const validateBookPromisified = (book) => new Promise((resolve, reject) => {
  const { error } = validateBook(book);
  if (error) reject(error);
  resolve(null);
});
module.exports = { validateBook, validateBookPromisified };
