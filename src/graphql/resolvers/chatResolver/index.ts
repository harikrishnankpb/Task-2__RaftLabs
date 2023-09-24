import { IResolvers } from '@graphql-tools/utils';
import Query from './chatQuery';
import Mutation from './chatMutation';

const RegisterResolver: IResolvers = {
    Query,
    Mutation
}

export default RegisterResolver;

