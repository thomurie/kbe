const { gql } = require("apollo-server");

const bikeSchema = gql`
  extend type Query {
    bikes(offset: Int, limit: Int): [Bike!]
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
    country: Country!
    region: Region!
    size: Size
    about: String
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
