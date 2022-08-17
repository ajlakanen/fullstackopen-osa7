import { useState } from "react";

export const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await addBlog({ newTitle, newAuthor, newUrl });
    if (success) {
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
      setFormVisible(false);
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormVisible(false);
  };

  if (formVisible) {
    return (
      <>
        <h2>Add new blog</h2>

        <form onSubmit={handleSubmit}>
          <div>
            title:{" "}
            <input
              id="title"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="title"
            />
          </div>
          <div>
            author:{" "}
            <input
              id="author"
              value={newAuthor}
              onChange={(event) => setNewAuthor(event.target.value)}
              placeholder="author"
            />
          </div>
          <div>
            url:{" "}
            <input
              id="url"
              value={newUrl}
              onChange={(event) => setNewUrl(event.target.value)}
              placeholder="url"
            />
          </div>
          <div>
            <button name="save" aria-labelledby="save new blog" type="submit">
              save
            </button>
            <button onClick={handleCancel}>cancel</button>
          </div>
        </form>
      </>
    );
  } else {
    return (
      <button
        onClick={() => setFormVisible(true)}
        name="add new blog"
        aria-labelledby="add blog"
      >
        add new blog
      </button>
    );
  }
};
