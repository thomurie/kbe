const { combineResolvers } = require("graphql-resolvers");
const { isAuth, isAuthUser } = require("./auth");

// add error handling
const photosResolvers = {
  Query: {
    photo: async (_, { photo_id }, { models }) => {
      const photoInfo = await models.Photo.findAll({
        where: {
          photo_id: photo_id,
        },
      });
      return photoInfo[0].dataValues;
    },
  },

  Mutation: {
    createPhoto: combineResolvers(
      isAuth,
      async (_, { bike_id, url }, { models }) => {
        const addPhoto = {
          bike_id,
          url,
        };

        console.log(addPhoto);
        const photo = await models.Photos.create(addPhoto);

        console.log(photo);

        return photo;
      }
    ),
    // TODO add authentication
    deletePhoto: combineResolvers(
      isAuthUser,
      async (_, { photo_id, confirmation }, { models }) => {
        await models.Photos.destroy({
          where: {
            photo_id: photo_id,
          },
        });

        return {
          error: false,
          message: "successfully removed",
        };
      }
    ),
  },
};

module.exports = photosResolvers;
