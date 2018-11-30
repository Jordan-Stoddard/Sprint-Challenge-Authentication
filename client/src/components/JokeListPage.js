import React from "react";
import {Redirect} from 'react-router-dom'

const JokesListPage = props => {
    if (!localStorage.getItem('login_token')) {
        return <Redirect to='/'/>
    }
  return (
    <div>
      {props.loggedIn === true ? <h1>Please see your Joke List Below</h1> : <h1>Please log in to see your Joke List</h1>}

    { props.loggedIn === true ? <div className="userListContainer">
        <div className="dataColumn">
          <h2 className="columnHeader">ID</h2>
          {props.jokes.map(joke => {
            return <p className="columnCell" key={joke.id}>{joke.id}</p>;
          })}
        </div>

        <div className="dataColumn">
          <h2 className="columnHeader">Joke Type</h2>
          {props.jokes.map(joke => {
            return <p className="columnCell" key={joke.id}>{joke.type}</p>;
          })}
        </div>

        <div className="dataColumn">
          <h2 className="columnHeader">Set Up</h2>
          {props.jokes.map(joke => {
            return <p className="columnCell" key={joke.id}>{joke.setup}</p>;
          })}
        </div>

        <div className="dataColumn">
          <h2 className="columnHeader">Punch Line</h2>
          {props.jokes.map(joke => {
            return <p className="columnCell" key={joke.id}>{joke.punchline}</p>;
          })}
        </div>

      </div> : undefined }


    </div> 
  );
};

export default JokesListPage;