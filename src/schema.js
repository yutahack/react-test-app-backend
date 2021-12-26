const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`


  type Query {
    Hello(val: String): String
    Product(id: String): [Product]
    
    TestUser(user_id: String!): String
  },


  type Product {
    name: String,
    id: Int
  },



`);

module.exports = schema;
