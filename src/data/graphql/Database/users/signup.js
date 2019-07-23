import jwt from 'jsonwebtoken';
import { User } from '../../../models';
import { auth } from '../../../../config';

export const schema = [
  `
  # SignupResult
  type SignupResult {
    data: SignupResultData
    errors: [ErrorType]
  }

  # SignupResultData
  type SignupResultData {
    user: User
    token: String
  }

  # A generic error type
  type ErrorType {
    key: String
    message: String
  }

  # A user stored in the local database
  type User {
    id: String
    username: String
    email: String
    password: String
  }
`,
];

export const mutation = [
  `
  # Creates a new user and profile in the local database
  signup(
    # The username of the new user, this username must be unique in the database
    username: String!

    # The email of the new user, this email must be unique in the database
    email: String!

    # The encrypted password of the new user
    password: String
  ): SignupResult
`,
];

export const resolvers = {
  Mutation: {
    async signup(obj, { username, email, password }) {
      let user = null;
      let token = null;
      const errors = [];

      if (password.length < 8) {
        errors.push({
          key: 'password',
          message: 'Password must be at least 8 characters long',
        });
      }
      // check to see if there's already a user with that email
      const count = await User.count({ where: { email } });

      if (count > 0) {
        errors.push({
          key: 'email',
          message: 'User with this email already exists',
        });
      }

      if (errors.length === 0) {
        user = await User.create({
          username,
          email: email.toLowerCase(),
          password: User.generateHash(password),
        });

        token = jwt.sign({ id: user.id }, auth.jwt.secret, {
          expiresIn: auth.jwt.expires,
        });

        user = await User.findOne({
          where: { email },
        });
      }

      const data = {
        user,
        token,
      };

      return {
        data,
        errors,
      };
    },
  },
};
