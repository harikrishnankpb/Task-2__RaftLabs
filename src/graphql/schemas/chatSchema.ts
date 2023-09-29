import { gql } from "apollo-server-express";

const typeDefs = gql`  
  type Mutation {
    sendMessage(
      message:String!
    ): Status
    sendMessageToRoom_Room1(
        message:String!
      ): Status
  }  
`
export default typeDefs