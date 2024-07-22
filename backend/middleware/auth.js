const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  try {
    if (!req.get("Authorization")?.split(" ")[1]) {
      throw err;
    }
    const header = req.get("Authorization").split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(header, "somesupersecretsecret");
    if (!decodedToken) {
      throw err;
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    return next();
  } catch (err) {
    req.isAuth = false;
    return next();
  }
};
