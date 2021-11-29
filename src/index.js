const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const typeDefs = require("./schema/index");
const resolvers = require("./resolvers/index");
const { sequelize, models } = require("./models/index");

const app = express();
app.use(cors());

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

// opt in express as our middleware, specify path for graphql api endpoint
server.start().then(() => server.applyMiddleware({ app, path: "/graphql" }));
sequelize.sync({ alter: true }).then(async () => {
  await app.listen(8000, () => {
    console.log(`Server is running on port 8000`);
  });
});
