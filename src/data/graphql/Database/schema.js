import { merge } from 'lodash';

/** * Queries ** */
import {
  schema as LoginUserTypes,
  queries as LoginUserQueries,
  resolvers as LoginUserResolver,
} from './users/login';

import {
  queries as LoggedInUserQueries,
  resolvers as LoggedInUserResolver,
} from './users/me';

/** * Mutations ** */
import {
  schema as SignupUserTypes,
  mutation as SignupUserMutations,
  resolvers as SignupUserResolver,
} from './users/signup';

export const schema = [...LoginUserTypes, ...SignupUserTypes];

export const queries = [...LoginUserQueries, ...LoggedInUserQueries];

export const mutations = [...SignupUserMutations];

export const resolvers = merge(
  LoginUserResolver,
  LoggedInUserResolver,
  SignupUserResolver,
);
