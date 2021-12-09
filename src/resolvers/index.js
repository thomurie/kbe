// LOCAL IMPORTS
const userResolvers = require("./users");
const bikeResolvers = require("./bike");
const photosResolvers = require("./photos");
// RESOLVER AGGREGATE

module.exports = [userResolvers, bikeResolvers, photosResolvers];
