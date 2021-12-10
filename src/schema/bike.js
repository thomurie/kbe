// EXTERNAL IMPORTS
const { gql } = require("apollo-server");

// GRAPHQL BIKE SCHEMA
const bikeSchema = gql`
  extend type Query {
    bikes(offset: Int, limit: Int, search: String): [Bike!]
    bike(bike_id: ID!): Pkg!
    count: Int!
  }
  extend type Mutation {
    createListing(
      make: String!
      model: String!
      year: Int!
      price: Int!
      country: String!
      region: String!
      about: String
      size: String
      color: String
      wheel_size: String
      suspension: String
      front: Int
      rear: Int
      upgrades: String
    ): Pkg!
    updateListing(
      bike_id: ID!
      make: String
      model: String
      year: Int
      price: Int
      country: String
      region: String
      about: String
      size: String
      color: String
      wheel_size: String
      suspension: String
      front: Int
      rear: Int
      upgrades: String
    ): Pkg!

    deleteListing(bike_id: ID!, confirmation: Boolean!): Pkg!
  }

  type Bike {
    bike_id: ID!
    user_id: User!
    make: String!
    model: String!
    year: Int!
    price: Int!
    country: Country!
    region: Region!
    about: String
    size: Size
    color: Color
    wheel_size: String
    suspension: Suspension
    front: Int
    rear: Int
    upgrades: String
    is_active: Boolean!
    createdat: String!
    photos: [Photo!]
  }

  enum Country {
    CAN
    USA
  }

  enum Region {
    AB
    AL
    AR
    AZ
    BC
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
    MA
    MB
    MD
    ME
    MI
    MN
    MO
    MS
    MT
    NB
    NC
    ND
    NE
    NH
    NJ
    NL
    NM
    NS
    NT
    NU
    NV
    NY
    OH
    OK
    ON
    OR
    PA
    PE
    QC
    RI
    SC
    SD
    SK
    TN
    TX
    UT
    VT
    VA
    WA
    WV
    WI
    WY
    YT
  }

  enum Size {
    S
    M
    L
    XL
  }

  enum Color {
    black
    blue
    brown
    green
    grey
    orange
    purple
    red
    silver
    white
    yellow
    other
  }

  enum Suspension {
    none
    front
    full
  }
`;

module.exports = bikeSchema;
