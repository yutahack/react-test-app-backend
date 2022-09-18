const assert = require("assert");
const vs = require("value-schema");

const addTrHistoryVadliator = (data) => {
    /*
        001. tr_no: 거래 번호
        002. tr_date: 거래 날짜
        003. amount: 가격
        004. pay_method: 결제 수단
        005. del_yn: 삭제 여부
     */
    const schemaObject = {
        // 入力スキーマ
        tr_no: vs.string({
            // 文字列型 / 最大16文字（超えた分は切り捨てる）
            maxLength: {
                length: 4,
                trims: false,
            },
        }),

        // tr_date: vs.string({
        //     // 文字列型 / 最大16文字（超えた分は切り捨てる）
        //     maxLength: {
        //         length: 16,
        //         trims: false,
        //     },
        // }),

        amount: vs.string({
            // 文字列型
        }),

        pay_method: vs.string({
            // 文字列型
            only: ["card", "pay"],
        }),
    };

    // 入力スキーマを適用してみる
    const actual = vs.applySchemaObject(schemaObject, data);
    return actual;
};

module.exports = {
    addTrHistoryVadliator,
};
