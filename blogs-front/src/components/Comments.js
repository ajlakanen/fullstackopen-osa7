export const Comments = ({ blog }) => {
  if (blog.comments.length === 0) {
    return <p>No comments added.</p>;
  } else {
    return (
      <>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment}</li>
          ))}
        </ul>
      </>
    );
  }
};
