require("../config/dotenv.config");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;



function createToken(data = {}) {
  return jwt.sign(data, SECRET_KEY, { expiresIn: "1day" });
}


async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(404).send({
      message: "No se encontró la autorización"
    });

  const isTokenValid = await isValidToken(authorization);

  if (!isTokenValid) return res.status(404).send({ message: "Token inválido" });
  next();
}


function isValidToken(token) {
  return new Promise(resolve => {
    jwt.verify(token, SECRET_KEY, err => resolve(!err));
  });
}

module.exports = {
  validateToken,
  createToken
};