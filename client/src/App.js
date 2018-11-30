import React, { Component } from "react";
import "./App.css";
import { Route, withRouter, Switch, NavLink, Redirect } from "react-router-dom";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import LandingPage from "./components/LandingPage.js";
import JokeListPage from "./components/JokeListPage.js";
import axios from "axios";

const token = localStorage.getItem("login_token");
const options = {
  headers: {
    authorization: token
  }
};



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      loggedIn: false,
      credentials: {
        username: "",
        password: "",
      }
    };
  }



  inputHandler = ev => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [ev.target.name]: ev.target.value
      }
    });
  };

  loginEvent = ev => {
    ev.preventDefault();
    if (
      this.state.credentials.username === "" ||
      this.state.credentials.password === ""
    ) {
      return alert("Please enter a username and password.");
    }
    axios
      .post("http://localhost:3300/api/login", this.state.credentials)
      .then(res => {
        if (res.status === 200 && res.data.token) {
          localStorage.setItem("login_token", res.data.token);
        }
        axios.get("http://localhost:3300/api/jokes", options).then(res => {
          this.setState({ jokes: res.data, loggedIn: true });
          this.props.history.push("/jokelist");
          if(this.state.loggedIn === true) {
            alert('Log In Successful.')
          }
        });
      })
      .catch(err => console.log(`There was an error: ${err}`));
  };

  registerEvent = ev => {
    ev.preventDefault();
    if (
      this.state.credentials.username === "" ||
      this.state.credentials.password === ""
    ) {
      return alert("Please enter a username, password and department.");
    }
    axios
      .post("http://localhost:3300/api/register", this.state.credentials)
      .then(res => {
        this.setState({
          credentials: {
            username: "",
            password: "",
          }
        })
        if(res.status === 201) {
          alert('New user has been successfully registered.')
        }
        this.props.history.push('/')
      })
      .catch(err => console.log(`There was an error: ${err}`));
  };

  logOut = ev => {
    ev.preventDefault();
    localStorage.removeItem("login_token");
    this.setState({ loggedIn: false, jokes: [] });
    this.props.history.push("/");
  };

  render() {
    const loggedIn = this.state.loggedIn
    return (
      <div className="App">
        <nav className="navBar">
          <NavLink to="/">Home</NavLink>
          {loggedIn === false ? <NavLink to="/sign-in">Log In</NavLink> : null }
          {loggedIn === false ? <NavLink to="/sign-up">Register</NavLink> : null }
          {loggedIn === false ? null : <NavLink to="/jokelist">Jokelist</NavLink>}
          
          {loggedIn === false ? (
            undefined
          ) : (
            <button className="logoutButton" onClick={this.logOut}>
              Logout
            </button>
          )}
        </nav>

        <Switch>
          <Route
            path="/sign-in"
            render={props =>
                <LoginPage
                  {...props}
                  inputHandler={this.inputHandler}
                  loginEvent={this.loginEvent}
                  loggedIn={loggedIn}
                />
            
            }
          />
          <Route
            path="/sign-up"
            render={props => (
              <RegisterPage
                {...props}
                inputHandler={this.inputHandler}
                registerEvent={this.registerEvent}
                loggedIn={loggedIn}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={props => (
              <LandingPage 
              {...props} 
              loggedIn={loggedIn} 
              />
            )}
          />
          <Route
            path="/jokelist"
            render={props => (
              <JokeListPage
                {...props}
                jokes={this.state.jokes}
                loggedIn={loggedIn}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App);