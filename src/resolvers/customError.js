class UserNotFoundError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "UserNotFoundError"; // (2)
  }
}

module.exports = { UserNotFoundError };
