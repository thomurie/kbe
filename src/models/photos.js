const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
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
    bike_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
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
