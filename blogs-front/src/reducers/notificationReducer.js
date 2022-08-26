import { createSlice } from "@reduxjs/toolkit";

const initialState = { text: "", severity: "success" };
// const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return { text: action.payload.text, severity: action.payload.severity };
      // console.log(action);
    },
    hideNotification(state, action) {
      if (nextNotificationId - action.payload.id > 1) return state;
      return initialState;
    },
  },
});

let nextNotificationId = 0;

export const showNotification = (text, severity, duration = 2) => {
  return async (dispatch) => {
    const id = nextNotificationId++;
    dispatch(setNotification({ id, text, severity }));
    setTimeout(() => {
      dispatch(hideNotification({ id }));
    }, duration * 1000);
  };
};

export const { setNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
