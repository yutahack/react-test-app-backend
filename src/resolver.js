const { getTestUserName } = require("./test/test");
const { login } = require("./login/login");
// const { getUserInfo } = require("./login/login-utils");
const { products } = require("./products/products");

const resolvers = {
    Hello: async () => {
        return "Hello world";
    },
    Product: async () => {
        // getProducts();
        // return { id: 1, name: "abcd" };
        console.log("okfadfsa");
        return [{ id: 1, name: "abcd" }];
    },
    TestUser: async (args) => {
        var res = null;
        if (args.user_id) {
            let arg = args.user_id;
            res = await getTestUserName(arg);
        } else {
            return null;
        }

        if (res.rows.length > 0) {
            return res.rows[0].user_name;
        } else {
            return null;
        }
    },

    Login: async (args) => {
        // var t = { error: null, result: { user_id: "none" } };

        var res = null;
        let arg = { user_id: args.user_id, user_pw: args.user_pw };
        res = await login(arg);

        console.log("res", res);
        return res;
    },

    GetProductList: async (args) => {
        var res = null;
        let arg = { field: "getProductList", offset: args.offset, limit: args.limit, conditions: args.conditions };
        res = await products(arg);

        console.log("res", res);
        return res;
    },
};

module.exports = resolvers;
