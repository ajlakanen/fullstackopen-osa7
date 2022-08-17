/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React from "react";

// entinen: export const Notification = (props) => {
export const Notification = React.forwardRef((props, ref) => {
  if (props.message === "") {
    return null;
  }
  return <div className={props.style}>{props.message}</div>;
});

//};
Notification.displayName = "Notification";

Notification.propTypes = { message: PropTypes.string.isRequired };
