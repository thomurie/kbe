const dotenv = require("dotenv");
const { Sequelize, DataTypes, Model } = require("sequelize");

dotenv.config();
const dbUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize("postgresql:///knobby", {
  dialect: "postgres",
});

class Bikes extends Model {}

Bikes.init(
  {
    bike_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    make: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    size: DataTypes.STRING,
    color: DataTypes.STRING,
    wheel_size: DataTypes.STRING,
    suspension: DataTypes.STRING,
    front: DataTypes.INTEGER,
    rear: DataTypes.INTEGER,
    about: DataTypes.STRING,
    upgrades: DataTypes.STRING,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "bikes",
    freezeTableName: true,
    underscored: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

module.exports = Bikes;
