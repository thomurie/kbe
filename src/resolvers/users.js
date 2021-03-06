// EXTERNAL IMPORTS
const jwt = require("jsonwebtoken");
const { AuthenticationError, UserInputError } = require("apollo-server");
const { combineResolvers } = require("graphql-resolvers");
const bcrypt = require("bcrypt");

// LOCAL IMPORTS
const { isAuth, isAuthUserArg } = require("./auth");
const { UserNotFoundError } = require("./customError");

// CONFIG
const saltRounds = 10;

// HELPER FUNCTIONS
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

// RESOLVERS
const userResolvers = {
  Query: {
    user: async (_, { email }, { models, user }) => {
      try {
        let owner = false;
        let message = null;
        const results = await models.Users.findOne({
          where: {
            email: email,
          },
        });

        if (!results)
          throw new UserNotFoundError(
            "The user could not be found. We apologize for the inconvienence"
          );

        if (user) {
          if (user.email === email) {
            owner = true;
          } else {
            message = "auth";
          }
        }

        return {
          error: false,
          owner,
          message,
          user: results.dataValues,
        };
      } catch (err) {
        return {
          error: true,
          message: err.message,
        };
      }
    },

    authUser: async (_, __, { models, user }) => {
      try {
        if (!user) throw new AuthenticationError();

        const results = await models.Users.findOne({
          where: {
            email: user.email,
          },
        });

        if (!results) throw new Error("User Not Found!");

        return {
          error: false,
          owner: true,
          user: results.dataValues,
        };
      } catch (err) {
        return {
          error: true,
          message: err.message,
        };
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

        if (!user) {
          await models.Users.destroy({
            where: {
              email: email,
            },
          });
          throw new UserInputError("Invalid Data Entered");
        }

        return {
          error: false,
          user,
          token: createToken(user, secret, "30m"),
        };
      } catch (err) {
        return {
          error: true,
          message: err.message,
        };
      }
    },

    loginUser: async (_, { email, password }, { models, secret }) => {
      try {
        const results = await models.Users.findOne({
          where: {
            email: email,
          },
        });

        if (!results) throw new UserInputError("Invalid Username");

        const validUser = await validateUser(
          password,
          results.dataValues.password
        );

        if (!validUser) throw new AuthenticationError("Invalid Password");

        return {
          error: false,
          user: results.dataValues,
          token: createToken(results.dataValues, secret, "30m"),
        };
      } catch (error) {
        return {
          error: true,
          message: error.message,
        };
      }
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
          const results = await models.Users.findOne({
            where: {
              email: user.email,
            },
          });

          if (!results) throw new UserInputError("Invalid Username");

          const updateData = {
            first_name,
            last_name,
            country,
            region,
            phone,
            sms,
            bio,
          };

          const validUser = await validateUser(
            password,
            results.dataValues.password
          );

          if (!validUser) throw new AuthenticationError("Invalid Password");

          if (new_password)
            updateData.password = await hashPassword(new_password);

          await models.Users.update(updateData, {
            where: {
              email: user.email,
            },
          });

          return {
            error: false,
            user: results.dataValues,
            token: createToken(results.dataValues, secret, "30m"),
          };
        } catch (error) {
          return {
            error: true,
            message: error.message,
          };
        }
      }
    ),

    deleteUser: combineResolvers(
      isAuthUserArg,
      async (_, { email, confirmation }, { models }) => {
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
            message:
              error.message ||
              "An unknown error occured, please try your request again",
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
        } catch (err) {
          return {
            error: true,
            message:
              err.message ||
              "An unknown error occured, please try your request again",
          };
        }
      }
    ),

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
        } catch (err) {
          return {
            error: true,
            message:
              err.message ||
              "An unknown error occured, please try your request again",
          };
        }
      }
    ),
  },
};

module.exports = userResolvers;
