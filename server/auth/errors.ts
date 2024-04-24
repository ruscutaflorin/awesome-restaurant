export class AuthenticationError extends Error {
  constructor() {
    super();
    this.name = "AuthenticationError";
    this.message = "Email or Password combination mismatch";
  }
}
export class AuthorizationError extends Error {
  constructor() {
    super();
    this.name = "TokenExpirationError";
    this.message = "Token expired. Please log in again.";
  }
}
