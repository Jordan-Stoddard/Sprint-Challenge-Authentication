import React from 'react'
import {Button} from 'react-materialize'


const RegisterPage = props => {
    return (
        <div className="inputContainer">
            <h1>Register</h1>
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
            <Button waves="light" className="red" onClick={props.registerEvent}>Register</Button>
            </form>
        </div>
    )
}

export default RegisterPage;