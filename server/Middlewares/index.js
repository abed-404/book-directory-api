const Joi = require('joi');

const validateBook = (book) => {
  const schema = Joi.object({
    title: Joi.string().min(3),
    author: Joi.string().min(5),
    edition: Joi.number(),
  });
  return schema.validate(book);
};

module.exports = { validateBook };
