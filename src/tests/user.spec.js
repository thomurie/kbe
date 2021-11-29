const { expect } = require("chai");

const { user } = require("./api");
describe("users", () => {
  describe("user(id: String!): User", () => {
    it("returns a user", async () => {
      const expectedResult = {
        data: {
          user: {
            email: "test0user@aol.com",
            first_name: "Test0",
            last_name: "User",
            country: "USA",
            region: "OR",
            phone: "5551112222",
            sms: true,
          },
        },
      };

      const result = await user({ email: "test0user@aol.com" });
      console.log(result);
      expect(result.data).to.eql(expectedResult);
    });
  });
});
