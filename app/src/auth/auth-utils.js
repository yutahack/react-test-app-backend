const jwt = require("jsonwebtoken");
const config = require("../config/consts");

const tokenVerify = async (token) => {
    const result = await jwt.verify(token, config.JWT_SECRET_KEY);
    return result;
};

module.exports = {
    tokenVerify,
};
