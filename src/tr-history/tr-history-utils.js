const { pgquery, sendQuery } = require("../pg/pg");
const strConverter = require("../converter/str-converter");

const getTrHistory = async (offset, limit, conditions) => {
    console.log("!!", offset, limit, conditions);
    var params = [];

    var where = "1=1";
    if ("" !== conditions.tr_no && conditions.tr_no) {
        where += " and tr_no = " + `'${conditions.tr_no}'`;
        params.push({ tr_no: "" });
    }
    if ("" !== conditions.pay_method && conditions.pay_method) {
        where += " and pay_method = " + `'${conditions.pay_method}'`;
        params.push({ pay_method: "" });
    }
    if ("" !== conditions.del_yn && conditions.del_yn) {
        where += " and del_yn = " + `'${conditions.del_yn}'`;
        params.push({ del_yn: "" });
    }

    const q = `
        select seq,
            tr_no,
            tr_date,
            amount,
            pay_method,
            del_yn
        from tb_tr_history
        where ${where}
        order by seq asc
        offset ${offset} limit ${limit}
    `;
    const v = {
        text: q,
    };

    const result = await sendQuery(v);
    // if (result.rows.length > 0) {
    //     // Convert TIMESTAMP to String
    //     result.rows.map((v, i) => {
    //         var str = "";
    //         str = strConverter.getStringFromDate(v.tr_date);
    //         v.tr_date = str;
    //     });

    //     return { result: "0", values: result.rows };
    // } else {
    //     return { result: "1", values: "Transaction History not found" };
    // }

    if (0 === result.rows.length) {
        return { result: "1", values: "Transaction History not found" };
    } else {
        // Convert TIMESTAMP to String
        result.rows.map((v, i) => {
            var str = "";
            str = strConverter.getStringFromDateWithoutSecond(v.tr_date);
            v.tr_date = str;
        });

        return { result: "0", values: result.rows };
    }
};

// const addTrHistory = async (data) => {
//     try {

//     }
// };

module.exports = {
    getTrHistory,
};
