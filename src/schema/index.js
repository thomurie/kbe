const { gql } = require("apollo-server-express");

const userSchema = require("./users");
const bikeSchema = require("./bike");
const photoSchema = require("./photos");

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, bikeSchema, photoSchema];
