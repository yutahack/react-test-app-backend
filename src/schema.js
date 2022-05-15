const { buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`


  type Query {
    Hello (val: String): String
    Product (id: String): [Product]
    
    TestUser (user_id: String!): String


    Login (user_id: String, user_pw: String): LoginResponse

    GetProductList (offset: Int, limit: Int, conditions: GetProductListConditions!): GetProductListResponse

    GetTrHistory (offset: Int, limit: Int, conditions: GetTrHistoryConditions!): GetTrHistoryResponse
    
  },

  type Product {
    name: String,
    id: Int
  },



  interface BaseMessage {
    error: String
  },
  type BaseResponse implements BaseMessage {
    error: String,
    result: String
  }

  
  type LoginResponse implements BaseMessage {
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
  type GetProductListResponse implements BaseMessage {
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


  input GetTrHistoryConditions {
    tr_no: String,
    pay_method: String,
    del_yn: String
  }
  type GetTrHistoryResponse implements BaseMessage {
    error: String,
    result: TrHistoryResult
  }
  type TrHistoryResult {
    count: Int,
    rows: [TrHistory]
  }
  type TrHistory {
    seq: String!,
    tr_no: String,
    tr_date: String,
    amount: String,
    pay_method: String,
    del_yn: String
  }
  




  type Mutation {
    InsertTrHistory (input: InsertTrHistoryRequest!): BaseResponse
  }


  input InsertTrHistoryRequest {
    tr_no: String!,
    amount: String,
    pay_method: String,
  }


`);

module.exports = schema;
