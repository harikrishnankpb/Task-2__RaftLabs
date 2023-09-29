import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdmin?: Maybe<Status>;
  registerUserWithEmail?: Maybe<Status>;
  sendMessage?: Maybe<Status>;
  sendMessageToRoom_Room1?: Maybe<Status>;
  updateUser?: Maybe<ShowUserResponse>;
};


export type MutationCreateAdminArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  secretKey: Scalars['String']['input'];
};


export type MutationRegisterUserWithEmailArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  message: Scalars['String']['input'];
};


export type MutationSendMessageToRoom_Room1Args = {
  message: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  name: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  loginUserWithEmail?: Maybe<TokenResponse>;
  showUser?: Maybe<ShowUserResponse>;
};


export type QueryLoginUserWithEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryShowUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type ShowUserResponse = {
  __typename?: 'ShowUserResponse';
  status?: Maybe<Status>;
  userData?: Maybe<UserData>;
};

export type Status = {
  __typename?: 'Status';
  msg?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  msg?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['Int']['output']>;
};

export type UserData = {
  __typename?: 'UserData';
  _id?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['Int']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ShowUserResponse: ResolverTypeWrapper<ShowUserResponse>;
  Status: ResolverTypeWrapper<Status>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TokenResponse: ResolverTypeWrapper<TokenResponse>;
  User: ResolverTypeWrapper<User>;
  UserData: ResolverTypeWrapper<UserData>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  ShowUserResponse: ShowUserResponse;
  Status: Status;
  String: Scalars['String']['output'];
  TokenResponse: TokenResponse;
  User: User;
  UserData: UserData;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAdmin?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType, RequireFields<MutationCreateAdminArgs, 'email' | 'name' | 'password' | 'secretKey'>>;
  registerUserWithEmail?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType, RequireFields<MutationRegisterUserWithEmailArgs, 'email' | 'name' | 'password'>>;
  sendMessage?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'message'>>;
  sendMessageToRoom_Room1?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType, RequireFields<MutationSendMessageToRoom_Room1Args, 'message'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['ShowUserResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'name' | 'userId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  loginUserWithEmail?: Resolver<Maybe<ResolversTypes['TokenResponse']>, ParentType, ContextType, RequireFields<QueryLoginUserWithEmailArgs, 'email' | 'password'>>;
  showUser?: Resolver<Maybe<ResolversTypes['ShowUserResponse']>, ParentType, ContextType, Partial<QueryShowUserArgs>>;
};

export type ShowUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShowUserResponse'] = ResolversParentTypes['ShowUserResponse']> = {
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  userData?: Resolver<Maybe<ResolversTypes['UserData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = {
  msg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenResponse'] = ResolversParentTypes['TokenResponse']> = {
  msg?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserData'] = ResolversParentTypes['UserData']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShowUserResponse?: ShowUserResponseResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  TokenResponse?: TokenResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserData?: UserDataResolvers<ContextType>;
};

