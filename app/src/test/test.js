const { pgquery } = require("../pg/pg");

const getTestUserName = async (user_id) => {
    console.log("testusername");
    //
    const q = `select user_id, user_name    
        from tb_test_table 
        where user_id = $1;`;

    const v = {
        text: q,
        values: [user_id],
    };

    const result = await pgquery(v);

    return result;
};

module.exports = {
    getTestUserName,
};
