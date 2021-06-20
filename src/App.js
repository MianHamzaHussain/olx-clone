import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdDetails from "./pages/AdDetails";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Category from "./pages/Category";
import MyAds from "./pages/MyAds";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/register" component={Register} exact></Route>
            <Route path="/ad/:id" component={AdDetails}></Route>
            <Route path="/myads" component={MyAds} exact></Route>
            <Route path="/category/:cat" component={Category} exact></Route>
            <Route path="/search/:keyword" component={Search} exact />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
