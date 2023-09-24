import { gql } from "apollo-server-express";

const typeDefs = gql`
    type Status{
        success:Boolean,
        msg:String
    }
`
export default typeDefs