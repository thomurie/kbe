const { combineResolvers } = require("graphql-resolvers");
const { isBikeUser } = require("./auth");
const { PhotoNotFoundError } = require("./customError");

/**
 * TODO:
 * WRITE TESTS
 */

const photosResolvers = {
  Query: {
    photo: async (_, { url }, { models }) => {
      try {
        const { dataValues } = await models.Photos.findAll({
          where: {
            url: url,
          },
        });

        return dataValues;
      } catch (error) {
        throw new PhotoNotFoundError(
          "The photo could not be found. We apologize for the inconvienence"
        );
      }
    },

    photos: async (_, { bike_id }, { models }) => {
      try {
        const bikePhotos = await models.Photos.findAll({
          where: {
            bike_id: bike_id,
          },
        });

        return bikePhotos.map((l) => l.dataValues);
      } catch (error) {
        throw new PhotoNotFoundError(
          "The photos could not be found. We apologize for the inconvienence"
        );
      }
    },
  },

  Mutation: {
    createPhoto: combineResolvers(
      isBikeUser,
      async (_, { bike_id, url }, { models }) => {
        try {
          const addPhoto = {
            bike_id,
            url,
          };

          const photo = await models.Photos.create(addPhoto);

          return photo;
        } catch (error) {
          throw new INTERNAL_SERVER_ERROR(
            "An unknown error occured, please try your request again"
          );
        }
      }
    ),
    deletePhoto: combineResolvers(
      isBikeUser,
      async (_, { url, confirmation }, { models }) => {
        try {
          if (!confirmation) AuthenticationError("Unconfirmed Photo Removal");

          await models.Photos.destroy({
            where: {
              url: url,
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

module.exports = photosResolvers;
