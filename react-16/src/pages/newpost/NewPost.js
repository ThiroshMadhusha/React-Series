import React from "react";
import "./newpost.css";
import { useContext, useState } from "react";
import DataContext from "../../context/DataContext";
import { useHistory } from "react-router-dom";
import api from "../../api/posts";
import { format } from "date-fns";


const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM ddd,yyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      history.push("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <main className="NewPost">
      <h1>New Post</h1>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button className="editButton" type="submit">
          Add New Post
        </button>
      </form>
    </main>
  );
};

export default NewPost;
