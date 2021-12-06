const fs = require("fs");

const suspension = ["full", "front", "none"];

const wheel_size = ["26", "27.5", "29"];

const size = ["S", "M", "L", "XL"];

const countries = ["USA", "CAN"];

const states = [
  "AL",
  "AR",
  "AZ",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MS",
  "MT",
  "NC",
  "ND",
  "NE",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const colors = [
  "black",
  "blue",
  "brown",
  "green",
  "grey",
  "orange",
  "purple",
  "red",
  "silver",
  "white",
  "yellow",
  "other",
];

// provinces CAN
const provinces = [
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NT",
  "NS",
  "NU",
  "ON",
  "PE",
  "QC",
  "SK",
  "YT",
];

const bike = {
  suspension,
  wheel_size,
  size,
  colors,
  countries,
  states,
  provinces,
};

const data = JSON.stringify(bike);

fs.writeFile("static_data.json", data, (err) => {
  if (err) {
    throw err;
  }
});
