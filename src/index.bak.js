const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const config = require("./config/consts");
const pg = require("./pg/pg");

const port = config.GQL_API_BOOKS_PORT;
const name = config.GQL_API_BOOKS_NAME;
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Provide resolver functions for your schema fields
const resolvers = {
    hello: () => "Hello world!",
};

const app = express();
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        rootValue: resolvers,
    })
);
app.listen(port);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
