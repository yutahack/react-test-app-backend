const { getTestUserName } = require("./test/test");

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
};

module.exports = resolvers;
