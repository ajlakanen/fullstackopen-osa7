/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";

// entinen: export const Notification = (props) => {
const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification !== "") {
    return <div style={style}> {notification}</div>;
  } else {
    return <></>;
  }
};

export default Notification;
