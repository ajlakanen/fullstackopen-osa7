import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log("show notification");
      return action.payload.text;
    },
    hideNotification(state, action) {
      if (nextNotificationId - action.payload.id > 1) return state;
      return initialState;
    },
  },
});

let nextNotificationId = 0;

export const setNotification = (text, duration = 2) => {
  return async (dispatch) => {
    const id = nextNotificationId++;
    dispatch(showNotification({ id, text }));
    setTimeout(() => {
      dispatch(hideNotification({ id }));
    }, duration * 1000);
  };
};

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
