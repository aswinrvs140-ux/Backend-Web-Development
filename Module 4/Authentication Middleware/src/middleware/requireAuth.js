const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  // Step 1: Read the Authorization header
  const authorization = req.headers.authorization ?? '';

  // Step 2: Extract the Bearer token
  const match = authorization.match(/^Bearer ([^\s]+)$/i);
  const token = match ? match[1] : null;

  // Step 3: Return 401 if token is missing
  if (!token) {
    return res.status(401).json({
      error: {
        code: 'AUTH_REQUIRED',
        message: 'Authentication required',
      },
    });
  }

  // Step 4: Verify the token
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ['HS256'] }
    );

    // Step 5: Attach user information
    req.user = payload;

    // Step 6: Continue to the route
    next();
  } catch (error) {
    // Step 7: Return the same error for every verification failure
    return res.status(401).json({
      error: {
        code: 'AUTH_REQUIRED',
        message: 'Authentication required',
      },
    });
  }
};