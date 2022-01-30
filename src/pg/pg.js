const { Client } = require("pg");
const Query = require("pg").Query;
const config = require("../config/consts");

var client = new Client({
    user: config.PG_SERVER_USERNAME,
    host: config.PG_SERVER_HOST,
    database: config.PG_SERVER_DB,
    password: config.PG_SERVER_PW,
    port: config.PG_SERVER_PORT,
});

client.connect((err) => {
    if (err) {
        console.error("PSQL Connection Error: ", err.stack);
    } else {
        console.log("Success connect to PostgreSQL Server!");
    }
});

// const test = async () => {
//     const res = await client.query("SELECT $1::text as message", ["Hello world!"]);
//     console.log(res.rows[0].message); // Hello world!
//     await client.end();
// };
// client.query("SELECT $1::text as message", ["Hello world!"], (err, res) => {
//     console.log(err ? err.stack : res.rows[0].message); // Hello World!
//     client.end();
// });

// const testquery = {
//     text: "select user_name from tb_test_table where user_id = ($1)",
//     values: ["id001"],
// };

// callback
// client.query(testquery, (err, res) => {
//     if (err) {
//         console.log(err.stack);
//     } else {
//         console.log(res.rows[0].user_name);
//     }
// });

// const pgquery = (text) => {
//     client.query(text, (err, res) => {
//         console.log("PSQL Query: ", text);
//         if (err) {
//             console.log("PSQL Error: ", err.stack);
//             return { result: 500, error: err };
//         } else {
//             console.log("pgquery res", res);
//             return res;
//         }
//     });
// };

const pgquery = async (text) => {
    console.log("PSQL Query: ", text);
    try {
        var result = await client.query(text);
        console.log("PSQL Result: ", result);
        return result;
    } catch (err) {
        console.log("PSQL Error: ", err.stack);
        return { result: 500, error: err };
    }
};

// // promise
// client
//     .query(testquery)
//     .then((res) => console.log(res.rows[0]))
//     .catch((e) => console.error(e.stack));

module.exports = {
    pgquery,
};
