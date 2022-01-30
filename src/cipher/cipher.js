const bcrypt = require("bcrypt");
const saltRounds = 10;

// ハッシュを返す
const createHash = async (password) => {
    let salt = await bcrypt.genSalt(saltRounds);
    let hashed = await bcrypt.hash(password, salt);
    return hashed;
};

// ハッシュの比較
const verifyPass = async (passA, passB) => {
    let res = await bcrypt.compare(passA, passB);
    return res;
};

let y = "yutaka3931";
createHash(y).then(console.log);

module.exports = {
    createHash,
    verifyPass,
};
