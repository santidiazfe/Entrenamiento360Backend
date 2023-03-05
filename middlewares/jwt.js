// const jwt = require ('jsonwebtoken');
// const TOKEN_SECRET = 'claveParaValidarToken';


// //middleware to validate token
// const verifyToken = (req, res, next) => {
//     const token = req.header('auth-token')
//     if(!token) {
//         return res.status(401).json({error: 'Acceso denegado'})
//     } try {
//         const verified = jwt.verify(token, TOKEN_SECRET)
//             req.user = verified
//             next()
//     } catch (error) {
//             res.status(400).json({error: 'Token no válido'})
//     }
// }

// module.exports = {
//     verifyToken,
//     TOKEN_SECRET
// };

const jwt = require('jsonwebtoken');
const TOKEN_SECRET = 'your-token-secret-here';

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ message: 'Invalid Token' });
  }
}

module.exports = { verifyToken, TOKEN_SECRET };
