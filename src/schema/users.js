const { gql } = require("apollo-server");

const userShcema = gql`
  extend type Query {
    user(email: String!): User
  }

  extend type Mutation {
    createUser(
      email: String!
      password: String!
      first_name: String!
      last_name: String!
      area: Int
      phone: Int
      text: Boolean
      state: String!
    ): Token!
    loginUser(email: String!, password: String!): Token!
    updateUser(
      email: String!
      password: String!
      first_name: String
      last_name: String
      area: Int
      phone: Int
      text: Boolean
      state: String
    ): User!
    deleteUser(
      email: String!
      password: String!
      confirmation: Boolean!
    ): Error!
    createFavorite(bike_id: String!, user_id: String!): Error!
    deleteFavorite(favorite_id: String!): Error!
  }

  type User {
    email: String!
    password: String!
    first_name: String!
    last_name: String!
    area: Int
    phone: Int
    text: Boolean
    state: State!
    listings: [Bike!]
    favorites: [Bike!]
    error: Boolean!
  }

  type Token {
    token: String!
  }

  type Error {
    error: Boolean!
    message: String!
  }
`;

module.exports = userShcema;
