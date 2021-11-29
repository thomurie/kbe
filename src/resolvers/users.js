const jwt = require("jsonwebtoken");
const {
  AuthenticationError,
  UserInputError,
  INTERNAL_SERVER_ERROR,
} = require("apollo-server");
const { combineResolvers } = require("graphql-resolvers");
const { isAuth, isAuthUser, isAuthUserArg, isFavUser } = require("./auth");
const { UserNotFoundError } = require("./customError");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (plainTextPwd) => {
  return await bcrypt.hash(plainTextPwd, saltRounds);
};

const validateUser = async (recievedPwd, ExistingPwd) => {
  return await bcrypt.compare(recievedPwd, ExistingPwd);
};

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

/**
 * TODO:
 * WRITE TESTS
 */

const userResolvers = {
  Query: {
    user: async (_, { email }, { models }) => {
      try {
        const { dataValues } = await models.Users.findOne({
          where: {
            email: email,
          },
        });

        return dataValues;
      } catch (err) {
        console.error(error);
      }
    },
    authUser: async (_, __, { models, user }) => {
      try {
        const { dataValues } = await models.Users.findOne({
          where: {
            email: user.email,
          },
        });

        return dataValues;
      } catch (err) {
        console.error(error);
      }
    },
  },

  User: {
    listings: async ({ email }, _, { models }) => {
      try {
        const listings = await models.Bikes.findAll({
          where: {
            user_id: email,
          },
        });

        return listings.map((l) => l.dataValues);
      } catch (err) {
        throw new UserNotFoundError(
          "The user could not be found. We apologize for the inconvienence"
        );
      }
    },
    favorites: combineResolvers(async (_, __, { models, user }) => {
      try {
        const userFavorites = await models.Favorites.findAll({
          where: {
            user_id: user.email,
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
      } catch (error) {
        console.error(error);
      }
    }),
  },

  Mutation: {
    createUser: async (
      _,
      {
        email,
        password,
        first_name,
        last_name,
        country,
        region,
        phone,
        sms,
        bio,
      },
      { models, secret }
    ) => {
      try {
        const addUser = {
          email,
          password: await hashPassword(password),
          first_name,
          last_name,
          country,
          region,
          phone,
          sms,
          bio,
        };

        const user = await models.Users.create(addUser);

        return {
          user,
          token: createToken(user, secret, "1h"),
        };
      } catch (error) {
        UserInputError("Invalid Data Entered");
      }
    },

    loginUser: async (_, { email, password }, { models, secret }) => {
      const { dataValues } = await models.Users.findOne({
        where: {
          email: email,
        },
      });

      if (!dataValues) throw new UserInputError("Invalid Username");

      const validUser = await validateUser(password, dataValues.password);

      if (!validUser) throw new AuthenticationError("Invalid Password");

      return {
        user: dataValues,
        token: createToken(dataValues, secret, "30m"),
      };
    },

    updateUser: combineResolvers(
      isAuthUserArg,
      async (
        _,
        {
          password,
          new_password,
          first_name,
          last_name,
          country,
          region,
          phone,
          sms,
          bio,
        },
        { models, secret, user }
      ) => {
        try {
          const { dataValues } = await models.Users.findOne({
            where: {
              email: user.email,
            },
          });

          if (!dataValues) throw new UserInputError("Invalid Username");

          const updateData = {
            first_name,
            last_name,
            country,
            region,
            phone,
            sms,
            bio,
          };

          const validUser = await validateUser(password, dataValues.password);

          if (!validUser) throw new AuthenticationError("Invalid Password");

          if (new_password)
            updateData.password = await hashPassword(new_password);

          await models.Users.update(updateData, {
            where: {
              email: user.email,
            },
          });

          return {
            user: dataValues,
            token: createToken(updateData, secret, "30m"),
          };
        } catch (error) {
          console.error(error);
          new UserInputError("Invalid Data Entered");
        }
      }
    ),

    deleteUser: combineResolvers(
      isAuthUserArg,
      async (_, { email, confirmation }, { models, user }) => {
        try {
          if (!confirmation) AuthenticationError("Unconfirmed Account Removal");

          await models.Users.destroy({
            where: {
              email: email,
            },
          });

          return {
            error: false,
            message: "successfully removed",
          };
        } catch (error) {
          return {
            error: true,
            message: "An unknown error occured, please try your request again",
          };
        }
      }
    ),
    // TODO TEST
    createFavorite: combineResolvers(
      isAuth,
      async (_, { bike_id }, { models, user }) => {
        try {
          const user_id = user.email;
          await models.Favorites.create({ bike_id, user_id });
          return {
            error: false,
            message: "Successfully added to Favorites",
          };
        } catch (error) {
          console.error(error);
        }
      }
    ),
    // TODO TEST
    deleteFavorite: combineResolvers(
      isAuth,
      async (_, { bike_id }, { models, user }) => {
        try {
          const user_id = user.email;
          await models.Favorites.destroy({
            where: {
              bike_id: bike_id,
              user_id: user_id,
            },
          });
          return {
            error: false,
            message: "Successfully removed from Favorites",
          };
        } catch (error) {
          console.error(error);
        }
      }
    ),
  },
};

module.exports = userResolvers;
