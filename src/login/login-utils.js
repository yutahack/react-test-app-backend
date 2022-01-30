const { pgquery } = require("../pg/pg");
const { createHash, verifyPass } = require("../cipher/cipher");
const { login } = require("./login");
const jwt = require("jsonwebtoken");
const config = require("../config/consts");

const getUserInfo = async (args) => {
    //
    const q = `
        select user_id, user_name    
        from tb_user_info 
        where user_id = $1 and user_pw = $2
        `;
    const v = {
        text: q,
        values: [args.user_id, args.user_pw],
    };
    console.log("!!!!!!!!pgquery: ", v);
    const result = await pgquery(v);
    console.log("!!!!!!!!result", result);

    return result;
};

const findByUserId = async (user_id) => {
    const r = { result: "", user_id: "" };
    const q = `
        select user_id 
        from tb_user_info 
        where user_id = $1
        `;
    const v = {
        text: q,
        values: [user_id],
    };

    const result = await pgquery(v);

    if (result.rows.length > 0 && user_id == result.rows[0].user_id) {
        return { result: "0", user_id: result.rows[0].user_id };
    } else {
        return { result: "1", user_id: "User not found" };
    }
};

const verifyPassword = async (user_id, user_pw) => {
    const r = { result: "" };
    const q = `
        select user_pw 
        from tb_user_info 
        where user_id = $1
        `;
    const v = {
        text: q,
        values: [user_id],
    };

    const result = await pgquery(v);
    if (result.rows.length > 0 && result.rows[0].user_pw) {
        const userPw = result.rows[0].user_pw;
        const verires = await verifyPass(user_pw, userPw);
        if (verires) {
            r.result = "0";
        } else {
            r.result = "1";
        }
        return r;
    } else {
        r.result = "2";
        return r;
    }

    // if (result.rows.length > 0 && verires) {
    //     return { result: "0", user_id: result.rows[0].user_id };
    // } else {
    //     return { result: "1", user_id: "User not found" };
    // }
};

const generateToken = async (user_id) => {
    const res = await jwt.sign(
        {
            user_id: user_id,
        },
        config.JWT_SECRET_KEY,
        {
            expiresIn: "5m",
        }
    );
    return res;
};

module.exports = {
    getUserInfo,
    findByUserId,
    verifyPassword,
    generateToken,
};
