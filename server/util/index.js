const Joi = require('joi');

const validateBook = (book, method) => new Promise((resolve, reject) => {
  const postSchema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().min(5).required(),
    edition: Joi.number().required(),
  });
  const putSchema = Joi.object({
    title: Joi.string().min(3),
    author: Joi.string().min(5),
    edition: Joi.number(),
  });
  let error;
  if (method === 'POST') {
    console.log('post error');
    error = postSchema.validate(book).error;
  } else { error = putSchema.validate(book).error; }
  if (error) {
    error.status = 400;
    reject(error);
  }
  resolve(null);
});
module.exports = { validateBook };
