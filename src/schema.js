const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`


  type Query {
    Hello (val: String): String
    Product (id: String): [Product]
    
    TestUser (user_id: String!): String


    Login (user_id: String, user_pw: String): LoginResponse
  },

  type Product {
    name: String,
    id: Int
  },



  interface BaseResponse {
    error: String
  },

  type LoginResponse implements BaseResponse {
    error: String,
    result: UserInfo
  },

  type UserInfo {
    user_id: String!,
    token: String
  }






`);

module.exports = schema;
