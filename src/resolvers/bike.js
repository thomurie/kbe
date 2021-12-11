// EXTERNAL IMPORTS
const { combineResolvers } = require("graphql-resolvers");
const { AuthenticationError } = require("apollo-server");

// LOCAL IMPORTS
const { isAuth, isBikeUser } = require("./auth");
const {
  BikeNotFoundError,
  PhotoNotFoundError,
  UserNotFoundError,
} = require("./customError");

// CONFIG
const { Op } = require("sequelize");

// RESOLVERS
const bikeResolvers = {
  Query: {
    bikes: async (_, { offset, limit, search }, { models }) => {
      try {
        const allBikes = search
          ? await models.Bikes.findAll({
              offset,
              limit,
              where: {
                [Op.or]: [
                  {
                    make: {
                      [Op.iLike]: `%${search}%`,
                    },
                  },
                  {
                    model: {
                      [Op.iLike]: `%${search}%`,
                    },
                  },
                ],
              },
            })
          : await models.Bikes.findAll({
              offset,
              limit,
            });

        if (!allBikes || allBikes.length === 0)
          throw new BikeNotFoundError(
            "The bike could not be found. We apologize for the inconvienence"
          );

        return allBikes.map((b) => b.dataValues);
      } catch (error) {
        throw new BikeNotFoundError(
          "The bike could not be found. We apologize for the inconvienence"
        );
      }
    },

    bike: async (_, { bike_id }, { models, user }) => {
      try {
        let owner = false;
        let message = null;
        const results = await models.Bikes.findOne({
          where: {
            bike_id: bike_id,
          },
        });

        if (!results)
          throw new BikeNotFoundError(
            "The bike could not be found. We apologize for the inconvienence"
          );

        if (user) {
          if (user.email === results.dataValues.user_id) {
            owner = true;
          } else {
            const userFavorite = await models.Favorites.findOne({
              where: {
                user_id: user.email,
                bike_id: bike_id,
              },
            });

            if (userFavorite) {
              message = "fav";
            } else {
              message = "auth";
            }
          }
        }

        return {
          error: false,
          owner,
          message,
          bike: results.dataValues,
        };
      } catch (err) {
        return {
          error: true,
          message: err.message,
        };
      }
    },
    count: async (_, __, { models }) => {
      try {
        const bikesCount = await models.Bikes.count();
        if (!bikesCount)
          throw new BikeNotFoundError(
            "No bikes were found. We apologize for the inconvienence"
          );

        return bikesCount;
      } catch (error) {
        throw new BikeNotFoundError(
          "The bike could not be found. We apologize for the inconvienence"
        );
      }
    },
  },

  Bike: {
    user_id: async ({ user_id }, _, { models }) => {
      try {
        const results = await models.Users.findOne({
          where: {
            email: user_id,
          },
        });

        if (!results)
          throw new UserNotFoundError(
            "The user could not be found. We apologize for the inconvienence"
          );

        return results.dataValues;
      } catch (err) {
        throw new UserNotFoundError(
          "The user could not be found. We apologize for the inconvienence"
        );
      }
    },

    photos: async ({ bike_id }, __, { models }) => {
      try {
        const bikePhotos = await models.Photos.findAll({
          where: {
            bike_id: bike_id,
          },
        });

        if (!bikePhotos)
          throw new PhotoNotFoundError(
            "The photos could not be found. We apologize for the inconvienence"
          );

        return bikePhotos.map((l) => l.dataValues);
      } catch (error) {
        throw new PhotoNotFoundError(
          "The photos could not be found. We apologize for the inconvienence"
        );
      }
    },
  },

  Mutation: {
    createListing: combineResolvers(
      isAuth,
      async (
        _,
        {
          make,
          model,
          year,
          price,
          country,
          region,
          size,
          color,
          wheel_size,
          suspension,
          front,
          rear,
          about,
          upgrades,
        },
        { models, user }
      ) => {
        try {
          const addBike = {
            user_id: user.email,
            make,
            model,
            year,
            price,
            country,
            region,
            size,
            color,
            wheel_size,
            suspension,
            front,
            rear,
            about,
            upgrades,
          };

          const bike = await models.Bikes.create(addBike);

          if (!bike)
            throw new BikeNotFoundError(
              "The bike could not be found. We apologize for the inconvienence"
            );

          return {
            error: false,
            message: "bike created successfully",
            bike,
            owner: true,
          };
        } catch (err) {
          console.log(err);
          return {
            error: true,
            message: err.message,
          };
        }
      }
    ),

    updateListing: combineResolvers(
      isBikeUser,
      async (
        _,
        {
          bike_id,
          make,
          model,
          year,
          price,
          country,
          region,
          size,
          color,
          wheel_size,
          suspension,
          front,
          rear,
          about,
          upgrades,
        },
        { models }
      ) => {
        try {
          await models.Bikes.update(
            {
              make,
              model,
              year,
              price,
              country,
              region,
              size,
              color,
              wheel_size,
              suspension,
              front,
              rear,
              about,
              upgrades,
            },
            {
              where: {
                bike_id: bike_id,
              },
            }
          );

          return {
            error: false,
            message: " Bike updated successfully.",
          };
        } catch (err) {
          return {
            error: true,
            message: err.message,
          };
        }
      }
    ),

    deleteListing: combineResolvers(
      isBikeUser,
      async (_, { bike_id, confirmation }, { models }) => {
        try {
          if (!confirmation) AuthenticationError("Unconfirmed Account Removal");
          await models.Bikes.destroy({
            where: {
              bike_id: bike_id,
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
  },
};

module.exports = bikeResolvers;
