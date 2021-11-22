const { gql } = require("apollo-server");

const bikeSchema = gql`
  extend type Query {
    bikes: [Bike!]
    bike(id: ID!): Bike
  }

  extend type Mutation {
    createListing(
      user_id: ID!
      make: String!
      model: String!
      year: Int!
      price: Int!
      state: String!
      size: String
      about: String
      color: String
      wheel_size: String
      suspension: String
      front: Int
      rear: Int
      upgrades: String
    ): Bike!
    updateListing(
      bike_id: ID!
      make: String
      model: String
      year: Int
      price: Int
      state: String
      size: String
      about: String
      color: String
      wheel_size: String
      suspension: String
      front: Int
      rear: Int
      upgrades: String
    ): Bike!
    deleteListing(bike_id: ID!, confirmation: Boolean!): Error!
  }

  type Bike {
    bike_id: ID!
    user_id: User!
    make: String!
    model: String!
    year: Int!
    price: Int!
    state: State!
    size: Size
    color: Color
    wheel_size: String
    suspension: Suspension
    front: Int
    rear: Int
    about: String
    upgrades: String
    is_active: Boolean!
    createdat: String!
    photos: [Photo!]
    error: Boolean!
  }

  enum State {
    AL
    AZ
    AR
    CA
    CO
    CT
    DE
    FL
    GA
    ID
    IL
    IN
    IA
    KS
    KY
    LA
    ME
    MD
    MA
    MI
    MN
    MS
    MO
    MT
    NE
    NV
    NH
    NJ
    NM
    NY
    NC
    ND
    OH
    OK
    OR
    PA
    RI
    SC
    SD
    TN
    TX
    UT
    VT
    VA
    WA
    WV
    WI
    WY
  }

  enum Size {
    S
    M
    L
    XL
  }

  enum Color {
    Black
    Blue
    Brown
    Green
    Grey
    Orange
    Purple
    Red
    Silver
    White
    Yellow
    Other
  }

  enum Suspension {
    None
    Front
    Full
  }
`;

module.exports = bikeSchema;
