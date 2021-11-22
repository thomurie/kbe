const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const sequelize = new Sequelize("postgresql:///knobby", {
  dialect: "postgres",
});

async function tc() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

tc();

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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    area: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    text: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
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

Users.loginUser = async (email) => {
  const user = await Users.findOne({
    where: { email: email },
  });

  return user;
};

Users.beforeCreate(async (user) => {
  console.log(user);
  return (user.password = await bcrypt.hash(
    user.dataValues.password,
    saltRounds
  ));
});

Users.prototype.validatePassword = async (password, existingPassword) => {
  console.log(password, existingPassword);
  return await bcrypt.compare(password, existingPassword);
};

module.exports = Users;
