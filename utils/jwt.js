const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (data) => {
    const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "24h" });
    return token;
};

const verifyToken = (token) => {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    return data;
};

exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
