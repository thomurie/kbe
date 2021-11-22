const { ForbiddenError } = require("apollo-server");
const { skip, combineResolvers } = require("graphql-resolvers");

const isAuth = (_, __, { user }) => {
  user
    ? skip
    : new ForbiddenError(
        "Not authenicated as a User, Please sign in and try again."
      );
};

const isBikeUser = combineResolvers(
  isAuth,
  async (_, { bike_id }, { user }) => {
    const bike = await models.Bikes.findAll({
      where: {
        bike_id: bike_id,
      },
    });
    const bikeUserId = bike[0].dataValues.user_id;

    if (bikeUserId !== user.email)
      throw new ForbiddenError("Not Authorized as owner");

    return skip;
  }
);

const isAuthUser = combineResolvers(
  isAuth,
  async (_, { user_id }, { user }) => {
    const user = await models.Users.findAll({
      where: {
        email: user_id,
      },
    });
    const userId = user[0].dataValues.email;

    if (userId !== user.email)
      throw new ForbiddenError("Not Authorized as User");

    return skip;
  }
);

module.exports = { isAuth, isBikeUser, isAuthUser };
