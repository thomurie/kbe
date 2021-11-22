const jwt = require("jsonwebtoken");
const { AuthenticationError, UserInputError } = require("apollo-server");
const { combineResolvers } = require("graphql-resolvers");
const { isAuth, isAuthUser } = require("./auth");

const createToken = async (user, secret, expiresIn) => {
  const { email, first_name, last_name } = user;

  return await jwt.sign(
    {
      email,
      first_name,
      last_name,
    },
    secret,
    { expiresIn }
  );
};

// add error handling
const userResolvers = {
  Query: {
    user: async (_, { email }, { models }) => {
      const basicUserInfo = await models.Users.findAll({
        where: {
          email: email,
        },
      });
      return basicUserInfo[0].dataValues;
    },
  },

  User: {
    listings: async ({ email }, _, { models }) => {
      const listings = await models.Bikes.findAll({
        where: {
          user_id: email,
        },
      });

      return listings.map((l) => l.dataValues);
    },
    favorites: combineResolvers(
      isAuthUser,
      async ({ email }, __, { models }) => {
        const userFavorites = await models.Favorites.findAll({
          where: {
            user_id: email,
          },
        });

        const results = userFavorites.map((l) => l.dataValues.bike_id);

        const newResults = async () => {
          return Promise.all(
            results.map(async (b) => {
              const bike = await models.Bikes.findAll({
                where: {
                  bike_id: b,
                },
              });
              return bike[0].dataValues;
            })
          );
        };

        return newResults().then((data) => data);
      }
    ),
  },

  Mutation: {
    createUser: async (
      _,
      { first_name, last_name, email, password, state, phone_number, text },
      { models, secret }
    ) => {
      const addUser = {
        email,
        password,
        first_name,
        last_name,
        phone_number,
        text,
        state,
      };

      const user = await models.Users.create(addUser);

      return { token: createToken(user, secret, "30m") };
    },
    loginUser: async (_, { email, password }, { models, secret }) => {
      const basicUserInfo = await models.Users.findAll({
        where: {
          email: email,
        },
      });
      const user = basicUserInfo[0];

      console.log(user);

      if (!user) throw new UserInputError("Invalid Username");

      const validUser = await user.validatePassword(password, user.password);

      if (!validUser) throw new AuthenticationError("Invalid Password");

      return { token: createToken(user, secret, "30m") };
    },

    // TODO ADD AUTHENTICATION
    // TODO FIX THIS
    updateUser: combineResolvers(
      isAuthUser,
      async (
        _,
        { first_name, last_name, email, password, state, phone_number, text },
        { models }
      ) => {
        await models.Users.update(
          { first_name, last_name, password, state, phone_number, text },
          {
            where: {
              email: email,
            },
          }
        );

        const updatedUser = await models.Users.findAll({
          where: {
            email: email,
          },
        });

        return updatedUser[0].dataValues;
      }
    ),
    // TODO Remove token from system.
    deleteUser: combineResolvers(
      isAuthUser,
      async (_, { email, confirmation }, { models }) => {
        await models.Users.destroy({
          where: {
            email: email,
          },
        });

        return {
          error: false,
          message: "successfully removed",
        };
      }
    ),
    createFavorite: combineResolvers(
      isAuth,
      async (_, { bike_id }, { models, user }) => {
        const user_id = user.email;
        const addFav = await models.Favorites.create({ bike_id, user_id });
        return {
          error: false,
          message: "Successfully added to Favorites",
        };
      }
    ),
    deleteFavorite: combineResolvers(
      isAuth,
      async (_, { favorite_id }, { models }) => {
        const addFav = await models.Favorites.destroy({
          where: {
            favorite_id: favorite_id,
          },
        });
        return {
          error: false,
          message: "Successfully removed from Favorites",
        };
      }
    ),
  },
};

module.exports = userResolvers;
