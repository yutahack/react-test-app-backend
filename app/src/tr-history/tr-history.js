const trhUtils = require("./tr-history-utils");

const tr_history = async (args) => {
    r = {
        error: "",
        result: { count: 0, rows: "" },
    };

    switch (args.field) {
        case "getTrHistory":
            const trHistory = await trhUtils.getTrHistory(args.offset, args.limit, args.conditions);
            if ("0" === trHistory.result) {
                r.error = "600";
                r.result.count = trHistory.count;
                r.result.rows = trHistory.values;
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

        case "insertTrHistory":
            const res = await trhUtils.insertTrHistory(args.input);
            if ("0" === res.result) {
                r.error = "600";
                r.result = "success";
            } else if ("1" === res.result) {
                r.error = "601";
                r.result = null;
                return r;
            } else {
                r.error = "602";
                r.result = null;
                return r;
            }
            break;
    }

    return r;
};

module.exports = {
    tr_history,
};
