import React from 'react'


const RegisterPage = props => {
    return (
        <div>
            <h1>Register</h1>
            <form action="onSubmit">
            <input 
            placeholder="enter username"
            type="text"
            name="username"
            onChange={props.inputHandler}
            value={props.username}
            />
            <input 
            type="password"
            placeholder="enter password"
            name="password"
            onChange={props.inputHandler}
            value={props.password}
            />
            <button onClick={props.registerEvent}>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;