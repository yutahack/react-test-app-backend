import assert from "assert/strict";
import vs from "value-schema";

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
            // 数値型 / 1以上
            maxLength: {
                length: 4,
                trims: false,
            },
        }),
        tr_date: vs.string({
            // 数値型 / 1以上
            maxLength: {
                length: 4,
                trims: false,
            },
        }),
    };
};

module.exports = {
    addTrHistoryVadliator,
};

console.trace("a");
