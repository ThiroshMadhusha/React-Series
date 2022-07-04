import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import posts from "../../api/posts";

const EditPost = ({
  posts,
  handleEdit,
  editBody,
  setEditBody,
  setEditTitle,
  editTitle,
}) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle]);

  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h1>Update Post</h1>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title</label>
            <input
              id="postTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor="postBody">Post</label>
            <textarea
              id="postBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button
              className="editButton"
              type="submit"
              onClick={() => handleEdit(post.id)}
            >
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Not D=Found Data</h2>
          <p>
            <Link to="/">Go To Main Page</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
