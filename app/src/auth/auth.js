const { tokenVerify } = require("./auth-utils");

const auth = async (args) => {
    const r = { error: "", result: { message: "" } };
    if (!args.token) {
        r.error = "606";
        r.result.message = "Invalid token";
        return;
    }

    try {
        const res = await tokenVerify(args.token);
        r.result.messge = "Success verify token";
        r.error = "600";
    } catch (err) {
        console.log("Expired or Invalid token");
        r.result.message = "Expired or Invalid token";
        r.error = "607";
    }
    return r;
};

module.exports = {
    auth,
};
