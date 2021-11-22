const { Sequelize } = require("sequelize");
const Users = require("./users");
const Bikes = require("./bikes");
const Favorites = require("./favorites");
const Photos = require("./photos");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

// // one-to-many for Bikes
// Users.hasMany(Bikes, {
//   foreignKey: "user_id",
// });
// Bikes.belongsTo(Users);

// // one-to-many for Photos
// Bikes.hasMany(Photos, {
//   foreignKey: "bike_id",
// });

// // many-to-many for Favorites
// Users.belongsToMany(Bikes, { through: "Favorites" });
// Bikes.belongsToMany(Users, { through: "Favorites" });

const models = {
  Users,
  Bikes,
  Favorites,
  Photos,
};

module.exports = { sequelize, models };
