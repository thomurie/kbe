// EXTERNAL IMPORTS
const { Sequelize, DataTypes, Model } = require("sequelize");

// CONFIG
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

// MODEL
class Photos extends Model {}

Photos.init(
  {
    url: {
      type: DataTypes.TEXT,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    bike_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "photos",
    underscored: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

module.exports = Photos;
