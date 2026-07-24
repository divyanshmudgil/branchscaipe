// Centralized error handler — every route's thrown/next(err) errors land
// here so the response shape is consistent no matter which route or provider
// produced it. Must be registered last, after all routes.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err);

  if (res.headersSent) return; // streaming response already started, nothing to do

  const status = err.status || 500;
  // Only show the real message for errors explicitly marked safe to expose
  // (err.expose) or with a deliberately-set non-500 status — anything else
  // could be leaking an internal error's raw message/stack to a client.
  const message = err.expose || status !== 500 ? err.message : "Something went wrong.";
  res.status(status).json({ error: message });
}
