const { gql } = require("apollo-server");

const userShcema = gql`
  extend type Query {
    user(email: String!): User!
  }

  extend type Mutation {
    createUser(
      email: String!
      password: String!
      first_name: String!
      last_name: String!
      state: String!
      area: Int
      phone: Int
      text: Boolean
    ): Token!

    loginUser(email: String!, password: String!): Token!

    updateUser(
      email: String!
      password: String!
      first_name: String
      last_name: String
      state: String
      area: Int
      phone: Int
      text: Boolean
    ): User!

    deleteUser(
      email: String!
      password: String!
      confirmation: Boolean!
    ): Error!

    createFavorite(user_id: String!, bike_id: String!): Error!

    deleteFavorite(favorite_id: String!): Error!
  }

  type User {
    email: String!
    password: String!
    first_name: String!
    last_name: String!
    state: State!
    area: Int
    phone: Int
    text: Boolean
    listings: [Bike!]
    favorites: [Bike!]
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
