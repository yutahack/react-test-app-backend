//
// Const setting values from dotenv
//
require("dotenv").config({ path: `${__dirname}/../.env` });

let path;
switch (process.env.NODE_ENV) {
    case "prod":
        path = `${__dirname}/../../.env.prod`;
        break;
    case "dev":
        path = `${__dirname}/../.env.dev`;
        break;
    default:
        path = `${__dirname}/../.env.dev`;
}
console.log("### PATH: ", path);
const dotenv = require("dotenv").config({ path: path });

const GQL_API_BOOKS_NAME = process.env.GQL_API_BOOKS_NAME;
const GQL_API_BOOKS_PORT = process.env.GQL_API_BOOKS_PORT;

const PG_SERVER_HOST = process.env.PG_SERVER_HOST;
const PG_SERVER_PORT = process.env.PG_SERVER_PORT;
const PG_SERVER_DB = process.env.PG_SERVER_DB;
const PG_SERVER_USERNAME = process.env.PG_SERVER_USERNAME;
const PG_SERVER_PW = process.env.PG_SERVER_PW;

const JWT_SECRET_KEY = process.env.REACT_APP_JWT_KEY;

module.exports = {
    GQL_API_BOOKS_NAME,
    GQL_API_BOOKS_PORT,

    PG_SERVER_HOST,
    PG_SERVER_PORT,
    PG_SERVER_DB,
    PG_SERVER_USERNAME,
    PG_SERVER_PW,

    JWT_SECRET_KEY,
};
