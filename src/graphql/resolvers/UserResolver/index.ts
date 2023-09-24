import { IResolvers } from '@graphql-tools/utils';
import Query from './userQuery';
import Mutation from './userMutation';

const RegisterResolver: IResolvers = {
    Query,
    Mutation
}

export default RegisterResolver;

