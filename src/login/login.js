const { pgquery } = require("../pg/pg");
const { getUserInfo, findByUserId, verifyPassword, generateToken } = require("./login-utils");
const auth = require("../auth/auth");

const login = async (args) => {
    r = { error: "", result: { user_id: "", token: null } };

    try {
        // 정보 입력 확인
        if (!args.user_id || !args.user_pw || "" == args.user_id || "" == args.user_pw) {
            r.error = "601";
            r.result.user_id = "Invalid parameters";
            return r;
        }

        // ID가 존재하는지 확인
        const user = await findByUserId(args.user_id);
        if ("0" == user.result) {
            r.error = "600";
            r.result.user_id = args.user_id;
        } else {
            r.error = "602";
            r.result.user_id = "User not found";
            return r;
        }

        // PW 매칭 확인
        const verify = await verifyPassword(args.user_id, args.user_pw);
        if ("0" == verify.result) {
            r.error = "600";
            r.result.user_id = args.user_id;
            console.log("Password matched!");
        } else if ("1" == verify.result) {
            r.error = "603";
            r.result.user_id = "Password does not match";
            console.log("Does not match");
            return r;
        } else if ("2" == verify.result) {
            r.error = "604";
            r.result.user_id = "Invalid password";
            console.log("Invalid password");
            return r;
        }

        // JWT 발급
        const token = await generateToken(args.user_id);
        r.result.token = token;

        const tres = await auth.auth({ token: token });
        if ("600" != tres.error) {
            r.error = tres.error;
            return r;
        } else {
        }

        // JWT를 DB에 기록
    } catch (err) {
        console.debug("Login error: ", err);
        r.error = "605";
        r.result.user_id = "Unknown error";
    }

    return r;

    //
    //
};

const check = async (args) => {
    // 상태 확인
};

const logout = async (args) => {
    // 로그아웃
};

module.exports = {
    login,
    check,
    logout,
};
