const axios = require("axios");

const API_URL = "http://localhost:8000/graphql";

const user = async (variables) => {
  console.log("here");
  const results = await axios.post(API_URL, {
    query: ` query Query($email: String!) {
            user(email: $email) {
              email
              first_name
              last_name
              country
              region
              phone
              sms
            }`,
    variables,
  });
  console.log(results);
  return results;
};

module.exports = { user };
