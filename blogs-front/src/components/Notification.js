/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification.text !== "") {
    return <Alert severity={notification.severity}> {notification.text}</Alert>;
  } else {
    return <></>;
  }
};

export default Notification;
