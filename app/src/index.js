const app = require("express")();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");
const config = require("./config/consts");
const schema = require("./schema");
const resolver = require("./resolver");
const pg = require("./pg/pg");

const port = 4000;

app.use(cors());
app.use(
    "/gql",
    graphqlHTTP({
        schema: schema,
        rootValue: resolver,
        graphiql: true,
    })
);

app.listen(port, () => console.log("GraphQL Server is running on localhost:" + port));
