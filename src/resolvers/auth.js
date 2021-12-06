const { ForbiddenError } = require("apollo-server");
const { use } = require("chai");
const { skip, combineResolvers } = require("graphql-resolvers");

/**
 * TODO:
 * WRITE TESTS
 */

const isAuth = (_, __, { user }) => {
  console.log(user);
  return user
    ? skip
    : new ForbiddenError(
        "Not authenicated as a User, Please sign in and try again."
      );
};

const isBikeUser = combineResolvers(
  isAuth,
  async (_, { bike_id, url }, { models, user }) => {
    const bike = await models.Bikes.findOne({
      where: {
        bike_id: bike_id,
        user_id: user.email,
      },
    });

    if (!bike) throw new ForbiddenError("Not Authorized as owner");

    return skip;
  }
);

const isFavUser = combineResolvers(
  isAuth,
  async (_, { favorite_id }, { models, user }) => {
    const { dataValues } = await models.Favorites.findOne({
      where: {
        favorite_id: favorite_id,
      },
    });

    if (dataValues.user_id !== user.email)
      throw new ForbiddenError("Not Authorized as owner");

    return skip;
  }
);

const isAuthUser = combineResolvers(
  isAuth,
  async ({ email }, _, { models, user }) => {
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

const isAuthUserArg = combineResolvers(
  isAuth,
  async (_, { email }, { models, user }) => {
    const userInfo = await models.Users.findOne({
      where: {
        email: email,
      },
    });

    console.log(userInfo);

    const userId = userInfo.dataValues.email;

    if (userId !== user.email)
      throw new ForbiddenError("Not Authorized as User");

    return skip;
  }
);

module.exports = { isAuth, isAuthUser, isAuthUserArg, isBikeUser, isFavUser };
