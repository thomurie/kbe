// EXTERNAL IMPORTS
const { Sequelize } = require("sequelize");
// LOCAL IMPORTS
const Users = require("./users");
const Bikes = require("./bikes");
const Favorites = require("./favorites");
const Photos = require("./photos");
// CONFIG
const sequelize = new Sequelize(
  process.env.TEST_DATABASE || process.env.DATABASE_URL,
  {
    dialect: "postgres",
  }
);
// MODEL AGGREGATE
const models = {
  Users,
  Bikes,
  Favorites,
  Photos,
};

module.exports = { sequelize, models };
