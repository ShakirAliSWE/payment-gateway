const returnResponse = (res, code, status, message, data = {}) => {
  return res.status(code).json({
    status,
    message,
    data,
  });
};

module.exports = { returnResponse };
