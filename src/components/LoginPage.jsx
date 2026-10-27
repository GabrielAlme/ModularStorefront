import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const body = { email, password: pass };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if(!response.ok) {
        setError(data.error);
        return;
      }
      alert("Successfully Logged in");

    } catch (err) {
      setError("Could not reach the server");
    }
  }

  return (
    <>
      <h2>Log In:</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Email:<br />
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
        </label>
        <br /><br />
        <label>Enter Password:<br />
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            />
        </label><br /><br />
        <input type="submit" />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <p>Not a user yet? 
        <Link to="/SignUp"> Sign Up Here</Link>
      </p>
    </>
  )
}

export default LoginPage
