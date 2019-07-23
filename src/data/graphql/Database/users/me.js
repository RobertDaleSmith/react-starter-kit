import { User } from '../../../models';

export const queries = [
  `
  # Retrieves information about the currently logged-in user
  me: User
`,
];

export const resolvers = {
  RootQuery: {
    async me(obj) {
      const { user } = obj.request;

      // Throw error if user is not authenticated
      if (!user) {
        return null;
      }

      // Find logged in user from database
      const dbUser = await User.findOne({
        where: { id: user.id },
      });

      return dbUser;
    },
  },
};
