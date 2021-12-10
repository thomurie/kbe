// EXTERNAL IMPORTS
const { Sequelize, DataTypes, Model } = require("sequelize");

// CONFIG
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});
// TEXT CONNECTION TO SQL DATABASE
async function tc() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
tc();

// MODEL
class Users extends Model {}

Users.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    first_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    last_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: "USA",
      validate: {
        notEmpty: true,
      },
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: DataTypes.STRING,
    sms: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    bio: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "users",
    freezeTableName: true,
    underscored: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
  }
);

module.exports = Users;
