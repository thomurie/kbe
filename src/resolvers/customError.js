class UserNotFoundError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "USER_NOT_FOUND"; // (2)
  }
}

class BikeNotFoundError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "BIKE_NOT_FOUND"; // (2)
  }
}

class PhotoNotFoundError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "PHOTO_NOT_FOUND"; // (2)
  }
}

module.exports = { BikeNotFoundError, PhotoNotFoundError, UserNotFoundError };
