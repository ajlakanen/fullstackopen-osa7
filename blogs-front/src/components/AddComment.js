import { useField } from "../hooks";
import { useDispatch } from "react-redux";
import { showNotification } from "../reducers/notificationReducer";
import { addComment } from "../reducers/blogReducer";

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
    dispatch(showNotification(`Comment was added: ${content.input.value}`, 5));
    hideCommentForm();
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    content.reset();
    hideCommentForm();
  };

  return (
    <div>
      <h2>Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <button>Save</button>
        <button onClick={handleCancelClick}>cancel</button>
      </form>
    </div>
  );
};
