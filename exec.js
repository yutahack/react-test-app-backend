const app = require("express")();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

const greetingSchema = buildSchema(`
  type Query {
    message: String
  }
`);

const gqlPageName = "/gql";
app.use(cors());
app.use(
    gqlPageName,
    graphqlHTTP({
        schema: greetingSchema,
        rootValue: { message: "Hello GraphQL!" },
        graphiql: true,
    })
);

app.listen(4000, () => console.log("GraphQL Server is running on localhost:4000" + gqlPageName));
