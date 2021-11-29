const { gql } = require("apollo-server");

const userShcema = gql`
  extend type Query {
    user(email: String!): User!
    authUser: User!
  }

  extend type Mutation {
    createUser(
      email: String!
      password: String!
      first_name: String!
      last_name: String!
      country: String!
      region: String!
      phone: String
      sms: Boolean
      bio: String
    ): Token!

    loginUser(email: String!, password: String!): Token!

    updateUser(
      email: String!
      password: String!
      new_password: String
      first_name: String
      last_name: String
      country: String
      region: String
      phone: String
      sms: Boolean
      bio: String
    ): Token!

    deleteUser(email: String!, confirmation: Boolean!): Error!

    createFavorite(bike_id: String!): Error!

    deleteFavorite(bike_id: String!): Error!
  }

  type User {
    email: String!
    first_name: String!
    last_name: String!
    country: Country!
    region: Region!
    phone: String
    sms: Boolean
    bio: String
    listings: [Bike!]
    favorites: [Bike!]
  }

  type Token {
    token: String!
    user: User!
  }

  type Error {
    error: Boolean!
    message: String!
  }
`;

module.exports = userShcema;
