/* eslint-disable no-unused-vars */
const CostumError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const errorHandler = (err, req, res, next) => {
  //   if (err.code === 'ENOENT') return res.status(500).send(err.message);
  console.log(err.status);
  if (err.status === 400) return res.status(err.status).send(err.message);
  if (err.status === 404) return res.status(err.status).send(err.message);
  return res.status(500).send(err.message);
};

module.exports = { CostumError, errorHandler };
