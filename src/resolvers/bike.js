const { combineResolvers } = require("graphql-resolvers");
const { isAuth, isAuthUser } = require("./auth");

const bikeResolvers = {
  Query: {
    bikes: async (_, __, { models }) => {
      const allBikes = await models.Bikes.findAll();

      return allBikes.map((b) => b.dataValues);
    },

    bike: async (_, { id }, { models }) => {
      const bike = await models.Bikes.findAll({
        where: {
          bike_id: id,
        },
      });
      return bike[0].dataValues;
    },
  },

  Bike: {
    user_id: async ({ user_id }, _, { models }) => {
      const user = await models.Users.findAll({
        where: {
          email: user_id,
        },
      });

      return user[0].dataValues;
    },
    photos: async ({ bike_id }, __, { models }) => {
      const bikePhotos = await models.Photos.findAll({
        where: {
          bike_id: bike_id,
        },
      });

      return bikePhotos.map((l) => l.dataValues);
    },
  },

  Mutation: {
    // TODO HANDLE PHOTOS
    createListing: combineResolvers(
      isAuth,
      async (
        _,
        {
          user_id,
          make,
          model,
          year,
          price,
          state,
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
        const addBike = {
          user_id,
          make,
          model,
          year,
          price,
          state,
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
      }
    ),
    updateListing: combineResolvers(
      isAuthUser,
      async (
        _,
        {
          bike_id,
          user_id,
          make,
          model,
          year,
          price,
          state,
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
        const updatedBike = await models.Bikes.update(
          {
            bike_id,
            user_id,
            make,
            model,
            year,
            price,
            state,
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

        const bike = await models.Bikes.findAll({
          where: {
            bike_id: bike_id,
          },
        });

        return bike[0].dataValues;
      }
    ),
    deleteListing: combineResolvers(
      isAuthUser,
      async (_, { bike_id, confirmation }, { models, user }) => {
        await models.Bikes.destroy({
          where: {
            bike_id: bike_id,
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

module.exports = bikeResolvers;
