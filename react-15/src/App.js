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
import { Route, Switch } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <DataProvider>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/post" component={NewPost} />
          <Route path="/edit/:id" component={EditPost} />
          <Route exact path="/post/:id" component={PostPage} />
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
