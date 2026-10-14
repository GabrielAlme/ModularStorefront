import React from 'react'
import { useState } from 'react'

const SignUp = () => {
  const [name, setName] = useState("")
  const [pass, setPass] = useState("")
  const [confirm, setConfirm] = useState("")
  const [email, setEmail] = useState("")

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
      </label>
    </form>
    </>
  )
}

export default SignUp
