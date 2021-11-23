const { gql } = require("apollo-server");

const photoSchema = gql`
  extend type Query {
    photo(url: String!): Photo!
    photos(bike_id: ID!): [Photo!]
  }

  extend type Mutation {
    createPhoto(url: String!, bike_id: ID!): Photo!
    deletePhoto(bike_id: ID!, url: String!, confirmation: Boolean!): Error!
  }

  type Photo {
    url: String!
    bike_id: ID!
  }
`;

module.exports = photoSchema;

// TODO update photos
