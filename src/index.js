// EXTERNAL IMPORTS
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// LOCAL IMPORTS
const typeDefs = require("./schema/index");
const resolvers = require("./resolvers/index");
const { sequelize, models } = require("./models/index");

// CONFIG
const app = express();
app.use(cors());

// HELPER FUNCTIONS
const validateUser = async (req) => {
  const token = req.headers["authorization"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (error) {
      return null;
    }
  }
};

// SERVER CONFIGURATION
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = await validateUser(req);
    return {
      models,
      secret: process.env.SECRET,
      user,
    };
  },
});

// INITALIZE SERVER ON NPM START
server.start().then(() => server.applyMiddleware({ app, path: "/graphql" }));
sequelize.sync({ alter: true }).then(async () => {
  await app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 8000`);
  });
});
