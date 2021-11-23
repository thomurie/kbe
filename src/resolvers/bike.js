const { combineResolvers } = require("graphql-resolvers");
const { AuthenticationError, INTERNAL_SERVER_ERROR } = require("apollo-server");
const { isAuth, isAuthUser } = require("./auth");
const { BikeNotFoundError, PhotoNotFoundError } = require("./customError");

/**
 * TODO:
 * WRITE TESTS
 */

const bikeResolvers = {
  Query: {
    bikes: async (_, { offset = 0, limit = 3 }, { models }) => {
      try {
        const allBikes = await models.Bikes.findAll({
          offset,
          limit,
        });

        return allBikes.map((b) => b.dataValues);
      } catch (error) {
        throw new INTERNAL_SERVER_ERROR(
          "An unknown error occured, please try your request again"
        );
      }
    },

    bike: async (_, { bike_id }, { models }) => {
      try {
        const { dataValues } = await models.Bikes.findOne({
          where: {
            bike_id: bike_id,
          },
        });
        return dataValues;
      } catch (error) {
        throw new BikeNotFoundError(
          "The user could not be found. We apologize for the inconvienence"
        );
      }
    },
  },

  Bike: {
    user_id: async ({ user_id }, _, { models }) => {
      try {
        const { dataValues } = await models.Users.findOne({
          where: {
            email: user_id,
          },
        });

        return dataValues;
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

        return bikePhotos.map((l) => l.dataValues);
      } catch (error) {
        throw new PhotoNotFoundError(
          "The photo could not be found. We apologize for the inconvienence"
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

          return bike;
        } catch (error) {
          throw new INTERNAL_SERVER_ERROR(
            "An unknown error occured, please try your request again"
          );
        }
      }
    ),

    updateListing: combineResolvers(
      isAuthUser,
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

          const { dataValues } = await models.Bikes.findOne({
            where: {
              bike_id: bike_id,
            },
          });

          return dataValues;
        } catch (error) {
          throw new INTERNAL_SERVER_ERROR(
            "An unknown error occured, please try your request again"
          );
        }
      }
    ),

    deleteListing: combineResolvers(
      isAuthUser,
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
