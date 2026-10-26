import React from 'react'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'

function ToSignUp() {
  return <SignUp/>
}

function HandleSubmit(e) {
  e.preventDefault();
  alert("You have been logged in");
}

const LoginPage = () => {

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  return (
    <>
      <h2>Log In:</h2>
      <form onSubmit={HandleSubmit}>
        <label>Enter Username:<br />
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
        </label>
        <br /><br />
        <label>Enter Password:<br />
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            />
        </label><br /><br />
        <input type="submit" />
      </form>

      <p>Not a user yet? 
        <Link to="/SignUp"> Sign Up Here</Link>
      </p>
    </>
  )
}

export default LoginPage
