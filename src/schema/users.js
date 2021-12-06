const { gql } = require("apollo-server");

const userShcema = gql`
  extend type Query {
    user(email: String!): Pkg!
    authUser: Pkg!
  }

  extend type Mutation {
    authToken(token: String!): Pkg!

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
    ): Pkg!

    loginUser(email: String!, password: String!): Pkg!

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
    ): Pkg!

    deleteUser(email: String!, confirmation: Boolean!): Pkg!

    createFavorite(bike_id: String!): Pkg!

    deleteFavorite(bike_id: String!): Pkg!
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
  }

  type Pkg {
    error: Boolean!
    message: String
    token: String
    owner: Boolean
    bike: Bike
    user: User
    photo: Photo
  }
`;

module.exports = userShcema;
