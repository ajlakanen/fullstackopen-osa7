/* eslint-disable no-unused-vars */
import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { addComment } from "../reducers/blogReducer";
import { TextField, Button } from "@mui/material";

export const AddComment = ({ blog, hideCommentForm }) => {
  const content = useField("text");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addComment({
        blog,
        content: content.input.value,
      })
    );
    dispatch(
      showNotification(
        `Comment was added: ${content.input.value}`,
        "success",
        5
      )
    );
    hideCommentForm();
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    content.reset();
    hideCommentForm();
  };

  return (
    <div>
      <p>Add a comment</p>
      <form onSubmit={handleSubmit}>
        <TextField {...content.input} />
        <Button type="submit">Save</Button>
        <Button onClick={handleCancelClick}>cancel</Button>
      </form>
    </div>
  );
};
