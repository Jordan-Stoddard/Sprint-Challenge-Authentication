import React from "react";
import { Redirect } from "react-router-dom";
import { Card, CardTitle } from "react-materialize";
import img from './img/keep-calm-you-are-not-authorized.png'

const JokesListPage = props => {
  // if (!props.loggedIn) {
  //   return <Redirect to="/" />;
  // }
  return (
    <div>
      <h1>Please see your Joke List Below</h1>

      <div className="userListContainer">
        {props.jokes.map(joke => {
          return (
            <Card
              key={joke.id}
              className="small"
              header={
                <CardTitle image={img}>
                  Dad Joke #: {joke.id} <br /> Joke Type: {joke.type}
                </CardTitle>
              }
            >
            <div className="jokeBody">
              <p><strong>Set up:</strong> {joke.setup} <br /></p>
              <p><strong>Punchline:</strong> {joke.punchline}</p>
            </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default JokesListPage;
