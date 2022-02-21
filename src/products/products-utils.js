const { pgquery, sendQuery } = require("../pg/pg");
const strConverter = require("../converter/str-converter");

const getProductList = async (offset, limit, conditions) => {
    console.log("!!", offset, limit, conditions);
    var params = [];

    var where = "1=1";
    if ("" !== conditions.prd_type && conditions.prd_type) {
        where += " and prd_type = " + `'${conditions.prd_type}'`;
        params.push({ prd_type: "" });
    }

    const q = `
        select prd_code,
            prd_name,
            prd_price,
            prd_type,
            insert_date,
            insert_user
        from tb_product_info
        where ${where}
        order by prd_code asc
        offset ${offset} limit ${limit}
    `;
    const v = {
        text: q,
    };

    // const result = await pgquery(v);
    const result = await sendQuery(v);
    if (0 === result.rows.length) {
        return { result: "1", values: "Product not found" };
    } else {
        // Convert TIMESTAMP to String
        result.rows.map((v, i) => {
            var str = "";
            str = strConverter.getStringFromDate(v.insert_date);
            v.insert_date = str;
        });

        return { result: "0", values: result.rows };
    }
};

module.exports = {
    getProductList,
};
