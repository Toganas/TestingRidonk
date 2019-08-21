
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import NavigationBar from "./components/layout/NavigationBar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./pages/Home";

import ShareStories from "./pages/ShareStories";
import StoriesOfTheDay from "./pages/StoriesOfTheDay";
import Categories from "./pages/Categories"


import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());

        // Redirect to login
        window.location.href = "./login";
    }
}
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <NavigationBar />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/Home" component={Home} />
                            <Route exact path="/ViewStories" component={StoriesOfTheDay} />
                            <Route exact path="/ShareStories" component={ShareStories} />
                            <Route exact path="/StoriesOfTheDay" component={StoriesOfTheDay} />
                            <Route exact path="/ViewStories/:cat" component={Categories} />

                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;

