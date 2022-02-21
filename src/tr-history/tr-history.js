const trhUtils = require("./tr-history-utils");

const tr_history = async (args) => {
    r = {
        error: "",
        result: null,
    };

    switch (args.field) {
        case "getTrHistory":
            const trHistory = await trhUtils.getTrHistory(args.offset, args.limit, args.conditions);

            if ("0" === trHistory.result) {
                r.error = "600";
                r.result = trHistory.values;
            } else if ("1" === trHistory.result) {
                r.error = "601";
                r.result = null;
                return r;
            } else {
                r.error = "602";
                r.result = null;
                return r;
            }
            break;

        case "addTrHistory":
            break;
    }

    return r;
};

module.exports = {
    tr_history,
};
