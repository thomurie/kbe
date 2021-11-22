const dotenv = require("dotenv");
const { Sequelize, DataTypes, Model } = require("sequelize");
const Bikes = require("./bikes");
const Users = require("./users");
dotenv.config();
const dbUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize("postgresql:///knobby", {
  dialect: "postgres",
});

class Favorites extends Model {}

Favorites.init(
  {
    favorite_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bike_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bikes,
        key: "bike_id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Users,
        key: "user_id",
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
