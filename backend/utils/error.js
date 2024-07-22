const errTemplate = (
  msg = "An error occured!",
  statusCode = 500,
  data = []
) => {
  const err = new Error(msg);
  err.statusCode = statusCode;
  err.data = data;
  throw err;
};

module.exports = {
  errTemplate,
};
