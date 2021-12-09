// EXTERNAL IMPORTS
const { gql } = require("apollo-server-express");
// LOCAL IMPORTS
const userSchema = require("./users");
const bikeSchema = require("./bike");
const photoSchema = require("./photos");
// GRAPHQL AGGREGATE SCHEMA
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
