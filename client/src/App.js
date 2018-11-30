import React, { Component } from "react";
import "./App.css";
import { Route, withRouter, Switch} from "react-router-dom";
import LoginPage from "./components/LoginPage.js";
import RegisterPage from "./components/RegisterPage.js";
import LandingPage from "./components/LandingPage.js";
import JokeListPage from "./components/JokeListPage.js";
import NavMenu from './components/NavMenu.js'
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
        axios.get("http://localhost:3300/api/jokes", options)
        .then(res => {
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
      return alert("Please enter a username, password.");
    }
    axios
      .post("http://localhost:3300/api/register", this.state.credentials)
      .then(res => {
        console.log(res)
        if (res.data.token) {
          localStorage.setItem('login_token', res.data.token);
        } else {
          console.log('Error: Check whats coming back from the server: ', res.status, res.data)
        };
        this.setState({
          credentials: {
            username: "",
            password: "",
          }
        })
      
        axios.get("http://localhost:3300/api/jokes", options)
        .then(res => {
          this.setState({ jokes: res.data, loggedIn: true });
        if(this.state.loggedIn === true) {
          alert('New user has been successfully registered.')
        }
        this.props.history.push('/jokelist')
      })
      .catch(err => console.log(`There was an error: ${err}`));
      });
    }

  logOut = ev => {
    ev.preventDefault();
    localStorage.removeItem("login_token");
    this.setState({ loggedIn: false, jokes: [] });
  };

  render() {
    const loggedIn = this.state.loggedIn

    return (
      <div className="App">
       <NavMenu 
       loggedIn={this.state.loggedIn}
       logOut={this.logOut}
       history={this.props.history}
       />

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