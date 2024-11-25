const { errorResponse } = require("../../utils/responseHandler");
const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    // const token = req.cookies.token; // uncomment this line to use cookies 

    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const decode =jwt.verify(token, jwt_secret);
    console.log(decode);
    if (!decode.userId) {
      return res.status(403).send({ message: "User not found in token" });
    }

    req.userId = decode.userId;
    req.role = decode.role;
    next();

  } catch (error) {
    errorResponse(res, 500, "Error during token verification", error);
  }
};

module.exports = { verifyToken };
