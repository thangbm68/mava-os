const ok = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const created = (res, data, message = 'Created') => ok(res, data, message, 201);

const error = (res, message = 'Error', statusCode = 400, errors = null) => {
  return res.status(statusCode).json({ success: false, message, errors });
};

const notFound = (res, message = 'Not found') => error(res, message, 404);
const forbidden = (res, message = 'Forbidden') => error(res, message, 403);
const unauthorized = (res, message = 'Unauthorized') => error(res, message, 401);
const serverError = (res, err) => {
  console.error(err);
  return error(res, 'Internal server error', 500);
};

module.exports = { ok, created, error, notFound, forbidden, unauthorized, serverError };
