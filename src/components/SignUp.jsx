import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  //States for the new users information
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const navigate = useNavigate();
    
    if (pass !== confirm) {
      alert("Passwords do not match");
      setPass("");
      setConfirm("");
      return;
    }

    alert("Successfully signed up. Redirecting...");
    navigate('/');
  }

  return (
    <>
      <h2>Sign Up:</h2>
      <form onSubmit={handleSubmit} >
        <label>Enter your name: <br />
          <input 
            type = "text"
            value={name}
            onChange = {(e) => setName(e.target.value)}
            required
          />
        </label><br /><br />
        <label>Enter your Username:<br />
          <input 
            type = "text"
            value = {user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </label><br /><br />
        <label>Enter your email: <br />
          <input 
            type = "email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            required
          />
        </label><br /><br />
        <label>Enter your password: <br />
          <input 
            type = "password" 
            value = {pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </label><br /><br />
        <label>Confirm password: <br />
          <input 
            type = "password"
            value = {confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label><br /><br />
        <input type="submit" />
      </form>

    </>
  )
}

export default SignUp
