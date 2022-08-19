import { createSlice } from "@reduxjs/toolkit";

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser_(user));
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser_(state, action) {
      return action.payload;
    },
  },
});

export const { setUser_ } = userSlice.actions;
export default userSlice.reducer;
