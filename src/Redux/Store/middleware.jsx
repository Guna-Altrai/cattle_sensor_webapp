import { isRejectedWithValue } from "@reduxjs/toolkit";

export class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export const authenticationMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 401) {
        // dispatch(onLogout());
        // localStorage.clear();
        console.error("Api fetch 401 err");
      }
    }
    return next(action);
  };
