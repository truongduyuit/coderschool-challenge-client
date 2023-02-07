// parse error code to message
export const ErrorMessages: { [key: string]: string } = {
  EMAIL_ALREADY_EXISTS: "Email already exist",
  INCORRECT_EMAIL_OR_PASSWORD: "Incorrect email or password",
  USER_NOT_FOUND: "User not found",

  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Not logged in or do not have access",
  INTERNAL_SERVER_ERROR:
    "The system encountered an error, please try again later",
};
