const { Client, pg } = require("pg");
const Query = require("pg").Query;
const config = require("../config/consts");

var connectionPromise;
var rejectFunc;
var recovering = false;

var dbConfig = {
    user: config.PG_SERVER_USERNAME,
    host: config.PG_SERVER_HOST,
    database: config.PG_SERVER_DB,
    password: config.PG_SERVER_PW,
    port: config.PG_SERVER_PORT,
};
var client = new Client(dbConfig);

const onConnectionError = (err) => {
    console.error("Database error: ", err);
    if (!recovering) {
        recoverConnection();
    }
};

client.on("error", onConnectionError);

// var client = new Client({
//     user: config.PG_SERVER_USERNAME,
//     host: config.PG_SERVER_HOST,
//     database: config.PG_SERVER_DB,
//     password: config.PG_SERVER_PW,
//     port: config.PG_SERVER_PORT,
// });

// client.connect((err) => {
//     if (err) {
//         console.error("PSQL Connection Error: ", err.stack);
//     } else {
//         console.log("Success connect to PostgreSQL Server!");
//     }
// });

const tryConnect = () => {
    return new Promise(async (resolve, reject) => {
        rejectFunc = reject;
        try {
            await client.connect();
            console.debug("Database connected successfully");
            resolve(client);
        } catch (e) {
            console.error("Database connectiong failed... error: ", JSON.stringify(e));
            reject(e);
        } finally {
            recovering = false;
        }
    });
};

const recoverConnection = () => {
    recovering = true;
    console.debug("Trying to recover connection...");
    try {
        client.end();
        rejectFunc(new Error("Recovering Connection"));
    } catch (e) {
        console.error(e);
    }
    client = new Client(config);
    client.on("error", onConnectionError);
    setTimeout(() => {
        console.log("Try connect db...");
        connectionPromise = tryConnect().catch(onConnectionError);
    }, 5000);
};

const getConnection = () => {
    if (!connectionPromise && !recovering) {
        connectionPromise = tryConnect().catch(onConnectionError);
    }
    if (recovering) {
        return Promise.reject(new Error("DB connection recovering"));
    } else {
        return connectionPromise;
    }
};

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

const IsolationLevel = Object.freeze({
    ReadUncomitted: 1,
    ReadComitted: 2,
    RepeatableRead: 3,
    Serializable: 4,
});
const beginTransaction = async (isolationLevel = IsolationLevel.ReadComitted) => {
    console.log("Begin transaction isolationLevel: ", isolationLevel);
    const client = await getConnection();
    switch (isolationLevel) {
        case IsolationLevel.ReadUncomitted:
            return client.query("begin transaction isolation level read uncomitted");
        case IsolationLevel.ReadComitted:
            return client.query("begin transaction isolation level read comitted");
        case IsolationLevel.RepeatableRead:
            return client.query("begin transaction isolation level repeatable read");
        case IsolationLevel.Serializable:
            return client.query("begin transaction isolation level serializable");
        default:
            throw Error("Unknown isolation level");
    }
};

const sendQuery = async (query, param) => {
    console.log("Psql query: ", query);
    const client = await getConnection();

    var res = {};
    try {
        if (null === param) {
            res = await client.query(query);
        } else {
            res = await client.query(query, param);
        }
    } catch (e) {
        console.error("DB query failed... error: ", JSON.stringify(e));
        // throw e;
        return { result: 500, error: err };
    }
    return res;
};

const commit = async () => {
    console.log("Commit transaction");
    const client = await getConnection();
    return client.query("COMMIT");
};

const rollback = async () => {
    console.log("Rollback transaction");
    const client = await getConnection();
    return client.query("ROLLBACK");
};

module.exports = {
    pgquery,
    tryConnect,
    recoverConnection,
    onConnectionError,
    getConnection,
    beginTransaction,
    sendQuery,
    commit,
    rollback,
};
