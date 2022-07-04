// Import component in index file.
// SWITCH statement using for the react router dom in changing separate pages.
// In This Project, install react router dom 5 using -->> npm install react-router-dom@5.3.0
// latest react router dom is changing index and app js both files.
// install date time package in using -- >>  npm i date-fns -S
// import all the component we create in this project
import Footer from "./pages/footer/Footer";
import Header from "./pages/header/Header";
import Nav from "./pages/navbar/Nav";
import Home from "./pages/home/Home";
import Missing from "./pages/missing/Missing";
import About from "./pages/about/About";
import NewPost from "./pages/newpost/NewPost";
import PostPage from "./pages/postpage/PostPage";
import EditPost from "./pages/edit/EditPost";

import { Route, Switch, useHistory } from "react-router-dom";
import { format } from "date-fns";
import api from "./api/posts";

import { useState, useEffect } from "react";
import useWindowSize from "./hooks/useWindowSize";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const history = useHistory("");
  const { width } = useWindowSize();

  // using useAxiosFetch
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

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

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      history.push("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

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

  useEffect(() => {
    const filterResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filterResults.reverse());
  }, [posts, search]);


  // axios use karana nisa me useEffect option eka one wenne ne.

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");

  //       setPosts(response.data);
  //     } catch (error) {
  
  //       // not in the 200 response range
  
  //       if (error.response) {
  //         console.log(error.response.data);
  //         console.log(error.response.status);

  //         console.log(error.response.headers);
  //       } else {
  //         console.log(`Error:${error.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  return (
    <div className="App">
      <Header title="React JS Blog" width={width} />
      <Nav search={search} setSearch={setSearch} />
      <Switch>
        <Route exact path="/">
          <Home posts={searchResults} />
        </Route>
        <Route exact path="/post">
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />
        </Route>
        <Route path="/edit/:id">
          <EditPost
            posts={posts}
            handleEdit={handleEdit}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editBody={editBody}
            setEditBody={setEditBody}
          />
        </Route>
        <Route exact path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
