import React from "react";
import "./postpage.css";
import { useParams, Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import api from "../../api/posts";

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  const history = useHistory();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      history.push("/");
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }
  };
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit Post</button>
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found ..!!</h2>
            <p>Well, That is Disappointing..</p>
            <p>
              <Link to="/">Visit Home Page</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
