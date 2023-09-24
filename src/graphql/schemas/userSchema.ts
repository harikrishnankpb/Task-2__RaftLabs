import { gql } from "apollo-server-express";

const typeDefs = gql`
type User {
    _id: String
    email: String
    name: String
    role: Int
  }
  type TokenResponse {
    success: Boolean!
    msg: String
    token: String
  }
  type UserData {
    _id: String
    email: String
    name: String
    role: Int
    createdAt: String
  }
  type ShowUserResponse {
    status: Status
    userData: UserData
  }
  
  type Query {
    loginUserWithEmail(email: String!, password: String!): TokenResponse
    showUser(email: String): ShowUserResponse
  }
  
  type Mutation {
    registerUserWithEmail(
      email: String!
      password: String!
      name: String!
    ): Status
    createAdmin(
      email:String!
      password:String!
      name:String!
      secretKey:String!
    ):Status
    updateUser(userId: String!, name: String!): ShowUserResponse
  }  
`
export default typeDefs