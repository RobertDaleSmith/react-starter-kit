import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import { User } from '../../../models';
import { auth } from '../../../../config';

export const schema = [
  `
  # LoginResult
  type LoginResult {
    data: LoginResultData
    errors: [ErrorType]
  }

  # LoginResultData
  type LoginResultData {
    user: User
    token: String
  }
`,
];

export const queries = [
  `
  # user authentication
  login(
    # The user's username or email address
    usernameOrEmail: String!
    # The user's password
    password: String!
  ): LoginResult
`,
];

export const resolvers = {
  RootQuery: {
    async login(obj, { usernameOrEmail, password }) {
      let token = null;
      const errors = [];

      const usernameOrEmailLC = usernameOrEmail.toLowerCase();

      const user = await User.findOne({
        where: {
          [Op.or]: [
            { username: usernameOrEmailLC },
            { email: usernameOrEmailLC },
          ],
        },
      });

      if (user && user.comparePassword(password)) {
        token = jwt.sign({ id: user.id }, auth.jwt.secret, {
          expiresIn: auth.jwt.expires,
        });
      } else {
        errors.push({ key: 'general', message: 'Invalid credentials' });
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
