// EXTERNAL IMPORTS
const { gql } = require("apollo-server");
// GRAPHQL PHOTOS SCHEMA
const photoSchema = gql`
  extend type Query {
    photo(bike_id: String!): Photo!
    photos(bike_id: ID!): [Photo!]
  }

  extend type Mutation {
    createPhoto(url: String!, bike_id: ID!): Photo!
    deletePhoto(bike_id: ID!, url: String!, confirmation: Boolean!): Pkg!
  }

  type Photo {
    url: String!
    bike_id: ID!
  }
`;

module.exports = photoSchema;

// TODO update photos
