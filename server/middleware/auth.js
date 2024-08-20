const jwt = require('jsonwebtoken');
const JWT_SECRET = 'cantseeme'
const auth = (req, res, next) => {
  const token = req.cookies.token;
     console.log(token)
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)
    req.userId = decoded.id;
  
    res.locals.userId = req.userId
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized: Invalid token');
  }
};

module.exports = auth;