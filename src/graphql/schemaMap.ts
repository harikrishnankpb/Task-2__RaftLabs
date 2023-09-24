import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema'

import CommonSchema from './schemas/commonSchema'
import UserSchema from './schemas/userSchema'
import ChatSchema from './schemas/chatSchema'


import resolvers from './resolverMap';


const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [
        CommonSchema,
        UserSchema,
        ChatSchema
    ],
    resolvers
});

export default schema;