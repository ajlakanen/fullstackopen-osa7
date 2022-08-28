import { createSlice } from "@reduxjs/toolkit";
import { AuthStatuses } from "../utils/authStatus";

export const logoutStarted = () => {
  return async (dispatch) => {
    dispatch(setAuthState(AuthStatuses.LOGGING_OUT));
  };
};

export const loggedOut = () => {
  return async (dispatch) => {
    dispatch(setAuthState(AuthStatuses.NOT_LOGGED_IN));
  };
};

export const loggedIn = () => {
  return async (dispatch) => {
    dispatch(setAuthState(AuthStatuses.LOGGED_IN));
  };
};

export const getAuthStatus = () => {
  return async (dispatch) => {
    dispatch(getAuthState());
  };
};

const authSlice = createSlice({
  name: "authStatus",
  initialState: AuthStatuses.NOT_LOGGED_IN,
  reducers: {
    getAuthState(state) {
      return state;
    },

    setAuthState(state, action) {
      return action.payload;
    },
  },
});

export const { getAuthState, setAuthState } = authSlice.actions;
export default authSlice.reducer;
