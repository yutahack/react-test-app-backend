const { pgquery, sendQuery, beginTransaction, rollback, commit } = require("../pg/pg");
const strConverter = require("../converter/str-converter");
const validator = require("./tr-history-validator");

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
        order by seq desc
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
    const v = validator.addTrHistoryVadliator(data);

    // Get current Tr number
    var tr_no = 0;
    const dataQ = `
        select tr_no from tb_tr_history tth order by seq desc limit 1;
    `;
    const dQres = await sendQuery({ text: dataQ });
    if (dQres.rows.length > 0) {
        console.log("Current tr_no:", dQres.rows[0].tr_no);
        var tmp = Number(dQres.rows[0].tr_no) + 1;
        if (NaN === tmp) {
            tr_no = 0000;
        } else {
            tr_no = ("0000" + tmp).slice(-4);
        }
        console.log("Next tr_no: ", tr_no);
    } else {
        console.log("Not found tr no");
        tr_no = 0000;
    }

    // Make condition
    try {
        await beginTransaction();
        const mainQuery = `INSERT INTO tb_tr_history
            (
                seq,
                tr_no,
                tr_date,
                amount,
                pay_method
            )
                VALUES(nextval('seq_tb_tr_history'), $1, now(), $2, $3);
        `;
        const param = [tr_no, v.amount, v.pay_method];
        console.log("insert query= ", mainQuery, param);
        sendQuery(mainQuery, param);
        await commit();
        return { result: "0", values: "Success" };
    } catch (err) {
        console.log("Insert Error: ", err);
        await rollback();
        return { result: "1", values: "Error" };
    }
};

module.exports = {
    getTrHistory,
    insertTrHistory,
};
