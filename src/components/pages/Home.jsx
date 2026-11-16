import React from 'react'
import { useAuth } from '../../authorization'

const Home = () => {

  const {user} = useAuth();
  return (
    <div>
        <h1>Modular StoreFront</h1>
        <h2>{user ? `Hello ${user.username}` : 'Welcome, guest'}</h2>
        <h3>Welcome to the Modular Storefront</h3>
        <p>The easiest way to create and customize Storefront websites</p>
    </div>
  )
}

export default Home
