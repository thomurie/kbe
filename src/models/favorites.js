// EXTERNAL IMPORTS
const { Sequelize, DataTypes, Model } = require("sequelize");
// LOCAL IMPORTS
const Bikes = require("./bikes");
const Users = require("./users");
// CONFIG
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});
// MODEL
class Favorites extends Model {}

Favorites.init(
  {
    favorite_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "user_id",
      },
    },
    bike_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bikes,
        key: "bike_id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "favorites",
    underscored: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

module.exports = Favorites;
