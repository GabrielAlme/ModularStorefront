import { useState } from 'react'
import { Link } from 'react-router-dom';


const SignUp = () => {

  //States for the new users information
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");


  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    
    if (pass !== confirm) {
      setError("Passwords do not match");
      setPass("");
      setConfirm("");
      return;
    }

    const body = { username: user, email, password: pass };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if(!response.ok) {
        setError(data.error);
        return;
      }
      alert("Successfully signed up");

    } catch (err) {
      setError("Could not reach the server");
    }
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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <p>Back to Login:
        <Link to="/SignIn">Log in here</Link>
      </p>
    </>
  )
}

export default SignUp
