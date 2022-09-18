const prdUtils = require("./products-utils");

const products = async (args) => {
    r = {
        error: "",
        result: null,
    };

    switch (args.field) {
        case "getProductList":
            const products = await prdUtils.getProductList(args.offset, args.limit, args.conditions);

            if ("0" == products.result) {
                r.error = "600";
                r.result = products.values;
            } else {
                r.error = "601";
                r.result = null;
                return r;
            }
            break;
    }

    return r;
};

module.exports = {
    products,
};
