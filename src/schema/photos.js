const { gql } = require("apollo-server");

const photoSchema = gql`
  extend type Query {
    photo(photo_id: String!): Photo!
  }

  extend type Mutation {
    createPhoto(bike_id: String!, user_id: String!, url: String!): Photo!
    deletePhoto(
      photo_id: String!
      user_id: String!
      confirmation: Boolean!
    ): Error!
  }

  type Photo {
    photo_id: ID!
    bike_id: ID!
    url: String!
  }
`;

module.exports = photoSchema;

//     photos: [Photo!]
