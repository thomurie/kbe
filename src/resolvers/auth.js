// EXTERNAL IMPORTS
const { ForbiddenError } = require("apollo-server");
const { skip, combineResolvers } = require("graphql-resolvers");

// HELPER RESOLVERS
// identifies if a user is authenticated
const isAuth = (_, __, { user }) => {
  return user
    ? skip
    : new ForbiddenError(
        "Not authenicated as a User, Please sign in and try again."
      );
};

// identifies if a user is the authenticated owner
const isBikeUser = combineResolvers(
  isAuth,
  async (_, { bike_id }, { models, user }) => {
    const bike = await models.Bikes.findOne({
      where: {
        bike_id: bike_id,
        user_id: user?.email,
      },
    });

    if (!bike) throw new ForbiddenError("Not Authorized as owner");

    return skip;
  }
);

// identifies if a user is the authenticated owner of the user profile
const isAuthUser = combineResolvers(
  isAuth,
  async ({ email }, _, { models, user }) => {
    const userInfo = await models.Users.findOne({
      where: {
        email: email,
      },
    });

    const userId = userInfo.dataValues.email;

    if (userId !== user?.email)
      throw new ForbiddenError("Not Authorized as User");

    return skip;
  }
);

// identifies if a user is the authenticated owner of the user profile
const isAuthUserArg = combineResolvers(
  isAuth,
  async (_, { email }, { models, user }) => {
    const userInfo = await models.Users.findOne({
      where: {
        email: email,
      },
    });

    const userId = userInfo.dataValues.email;

    if (userId !== user.email)
      throw new ForbiddenError("Not Authorized as User");

    return skip;
  }
);

module.exports = { isAuth, isAuthUser, isAuthUserArg, isBikeUser };
