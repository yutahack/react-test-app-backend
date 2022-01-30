const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`


  type Query {
    Hello (val: String): String
    Product (id: String): [Product]
    
    TestUser (user_id: String!): String


    Login (user_id: String, user_pw: String): LoginResponse

    GetProductList (offset: Int, limit: Int, conditions: GetProductListConditions!): GetProductListResponse
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


  input GetProductListConditions {
    prd_type: String
  }


  type GetProductListResponse implements BaseResponse {
    error: String,
    result: [ProductInfo]
  }
  
  type ProductInfo {
    prd_code: String!,
    prd_name: String,
    prd_price: String,
    prd_type: String,
    insert_date: String,
    insert_user: String
  }





`);

module.exports = schema;
