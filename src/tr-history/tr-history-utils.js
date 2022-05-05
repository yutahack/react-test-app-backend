const { pgquery, sendQuery, beginTransaction, rollback } = require("../pg/pg");
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

    // Get Count
    const countQ = `
        select count(*) as cnt 
            from tb_tr_history tth ;
    `;
    const cQres = await sendQuery({ text: countQ });
    var count = 0;
    if ("0" !== cQres.rows[0].cnt) {
        count = parseInt(cQres.rows[0].cnt);
    }

    // Get Data
    const dataQ = `
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
    // const v = {
    //     text: dataQ,
    // };

    const dQres = await sendQuery({ text: dataQ });
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

    if (0 === dQres.rows.length) {
        return { result: "1", values: "Transaction History not found" };
    } else {
        // Convert TIMESTAMP to String
        dQres.rows.map((v, i) => {
            var str = "";
            str = strConverter.getStringFromDateWithoutSecond(v.tr_date);
            v.tr_date = str;
        });

        return { result: "0", count: count, values: dQres.rows };
    }
};

const insertTrHistory = async (data) => {
    // Validation

    // Make condition
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

    try {
        await beginTransaction();

        const mainQuery = `INSERT INTO tb_user_info
            (
                seq,
                tr_no, 
                tr_date, 
                amount, 
                pay_method
            )
                VALUES(nextval('seq_tb_tr_history'), $1, now(), $2, $3);
        `;

        const param = [data.tr_no, data.amount, data.pay_method];
        console.trace("insert query= ", mainQuery, param);
        // sendQuery(mainQuery, param);
    } catch (err) {
        await rollback();
        throw err;
    }
};

module.exports = {
    getTrHistory,
    insertTrHistory,
};
