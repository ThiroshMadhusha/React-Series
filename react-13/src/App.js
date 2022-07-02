// Import component in index file.
// SWITCH statement using for the react router dom in changing separate pages.
// In This Project, install react router dom 5 using -->> npm install react-router-dom@5.3.0
// latest react router dom is changing index and app js both files.

// import all the component we create in this project
import Footer from "./pages/Footer";
import Header from "./pages/Header";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import About from "./pages/About";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";

import { Route, Switch, useHistory } from "react-router-dom";

import { useState, useEffect } from "react";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/post">
          <NewPost />
        </Route>
        <Route exact path="/post/:id">
          <PostPage />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
