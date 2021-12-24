const { Client } = require("pg");
const Query = require("pg").Query;

var client = new Client({
    user: "user",
    host: "localhost",
    database: "postgres",
    password: "password",
    port: 5432,
});
