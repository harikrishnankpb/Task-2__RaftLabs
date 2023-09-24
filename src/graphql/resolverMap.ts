import { merge } from "lodash"

import UserResolver from "./resolvers/UserResolver";
import ChatResolver from "./resolvers/chatResolver";

const resolverMap = merge(
    UserResolver,
    ChatResolver
);

export default resolverMap;