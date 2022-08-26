export const Comments = ({ blog }) => {
  if (blog.comments.length === 0) {
    return <p>No comments added.</p>;
  } else {
    return (
      <>
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      </>
    );
  }
};
