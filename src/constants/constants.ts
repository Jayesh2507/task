//base urk
export const BASE_URL = "http://localhost:3000";

export const USER_ROLES = ["Admin", "User", "Viewer"];

//http methods
export const GET = "get";
export const POST = "post";
export const PUT = "put";
export const DELETE = "delete";

export const VALIDATION_MSGS = {
  nameRequired: "Name is required",
  emailRequired: "Email is required",
  ageRequired: "Age is required",
  roleRequired: "Role is required",
  invalidName: "Name must be at least 3 characters",
  invaliEmail: "Enter a valid email",
  minAge: "Must be at least 18",
  maxAge: "Must be 65 or younger",
};
