const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize("postgresql:///knobby", {
  dialect: "postgres",
});

class Photos extends Model {}

Photos.init(
  {
    photo_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bike_id: {
      type: DataTypes.STRING,
      allowNull: false,
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
