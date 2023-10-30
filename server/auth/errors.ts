export class AuthenticationError extends Error {
  constructor() {
    super();
    this.name = "AuthenticationError";
    this.message = "Email or Password combination mismatch";
  }
}
