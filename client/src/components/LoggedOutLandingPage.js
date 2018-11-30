import React from 'react'
import {Button} from 'react-materialize'


const LoggedOutLandingPage = props => {
    return (
        <div>
           <h1>Welcome!</h1>
           <p>Already a user? Click here to sign in:   </p><Button className="red" wave="light" onClick={ev => {ev.preventDefault(); props.props.history.push('/sign-in')}}>Sign In</Button>
           <br/>
           <br/>
           <p>Not a user? Click here to register:   </p><Button className="red" wave="light" onClick={ev => {ev.preventDefault(); props.props.history.push('/sign-up')}}>Register</Button>
        </div>
    )
}

export default LoggedOutLandingPage;