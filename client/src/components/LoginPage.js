import React from 'react'
import {Button} from 'react-materialize'


const LoginPage = props => {
    return (
        <div className="inputContainer">
            <h1>Login Page</h1>

            <form action="onSubmit">
            <input 
            placeholder="enter username"
            type="text"
            name="username"
            onChange={props.inputHandler}
            value={props.username}
            className="input"
            />
            <input 
            type="password"
            placeholder="enter password"
            name="password"
            onChange={props.inputHandler}
            value={props.password}
            className="input"
            />
            <Button className="red" wave="light" onClick={props.loginEvent}>Login</Button>
            </form>
        </div>
    )
}

export default LoginPage;