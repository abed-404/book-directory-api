const Joi = require('joi');

const validateBook = (book) => new Promise((resolve, reject) => {
  const schema = Joi.object({
    title: Joi.string().min(3),
    author: Joi.string().min(5),
    edition: Joi.number(),
  });
  const { error } = schema.validate(book);
  if (error) reject(error);
  resolve(null);
});
module.exports = { validateBook };
