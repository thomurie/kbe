const jwt = require("jsonwebtoken");
const { AuthenticationError, UserInputError } = require("apollo-server");
const { combineResolvers } = require("graphql-resolvers");
const { isAuth, isAuthUser, isAuthUserArg } = require("./auth");
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
        throw new UserNotFoundError(
          "The user could not be found. We apologize for the inconvienence"
        );
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
    favorites: combineResolvers(
      isAuthUser,
      async ({ email }, __, { models }) => {
        try {
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
        } catch (error) {
          throw new INTERNAL_SERVER_ERROR(
            "An unknown error occured, please try your request again"
          );
        }
      }
    ),
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

        return { token: createToken(user, secret, "1h") };
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

      return { token: createToken(dataValues, secret, "30m") };
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

          return { token: createToken(updateData, secret, "30m") };
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
          throw new INTERNAL_SERVER_ERROR(
            "An unknown error occured, please try your request again"
          );
        }
      }
    ),
    deleteFavorite: combineResolvers(
      isAuth,
      async (_, { favorite_id }, { models }) => {
        try {
          await models.Favorites.destroy({
            where: {
              favorite_id: favorite_id,
            },
          });
          return {
            error: false,
            message: "Successfully removed from Favorites",
          };
        } catch (error) {
          throw new INTERNAL_SERVER_ERROR(
            "An unknown error occured, please try your request again"
          );
        }
      }
    ),
  },
};

module.exports = userResolvers;
