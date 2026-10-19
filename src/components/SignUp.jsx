import React from 'react'
import { useState } from 'react'

const SignUp = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <h2>Sign Up:</h2>
      <form>
        <label>Enter your name: <br />
          <input 
            type = "text"
            value={name}
            onChange = {(e) => setName(e.target.value)}
          />
        </label><br /><br />
        <label>Enter your Username:<br />
          <input 
            type = "text"
            value = {user}
            onChange={(e) => setUser(e.target.value)}
          />
        </label><br /><br />
        <label>Enter your email: <br />
          <input 
            type = "email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
          />
        </label><br /><br />
        <label>Enter your password: <br />
          <input 
            type = "password" 
            value = {pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </label><br /><br />
        <label>Confirm password: <br />
          <input 
            type = "password"
            value = {confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>
      </form><br /><br />

      <p>Your name: {name} <br /></p>
      <p>Your Username: {user} <br /></p>
      <p>Your email: {email} <br /></p>

      {confirm && (
        /* Ternary expression. Confirms password if pass and confirm are equal else states they don't match */
        <p>{pass === confirm ? "Password Confirmed" : "Passwords don't match"}</p>
      )}
    </>
  )
}

export default SignUp
