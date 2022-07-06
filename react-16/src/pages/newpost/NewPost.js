import React from "react";
import "./newpost.css";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

const NewPost = () => {
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

  const history = useHistory();

  const handleSubmit =  (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM ddd,yyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    history.push("/");
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
