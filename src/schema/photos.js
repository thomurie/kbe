const { gql } = require("apollo-server");

const photoSchema = gql`
  extend type Query {
    photo(photo_id: ID!): Photo!
  }

  extend type Mutation {
    createPhoto(bike_id: ID!, url: String!): Photo!
    deletePhoto(photo_id: ID!, confirmation: Boolean!): Error!
  }

  type Photo {
    photo_id: ID!
    bike_id: ID!
    url: String!
  }
`;

module.exports = photoSchema;
