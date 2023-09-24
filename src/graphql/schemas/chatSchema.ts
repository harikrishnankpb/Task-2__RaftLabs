import { gql } from "apollo-server-express";

const typeDefs = gql`  
  type Mutation {
    sendMessage(
      message:String!
    ): Status
    sendMessageToRoom(
        message:String!,
        room:String!
      ): Status
  }  
`
export default typeDefs