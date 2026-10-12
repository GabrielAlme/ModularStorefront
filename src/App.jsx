import Sidebar from "./components/Sidebar"
import Workspace from "./components/Workspace"
import Navbar from "./components/Navbar"
import LoginPage from "./components/LoginPage"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function HomePage() {
  return (
    <Home/>
  )
}

function Workshop() {
  return (
  <>
  <div>
      <Sidebar/>
    </div>
    <div id="nav">
      <Navbar/>
    </div>
    <div id="ws">
      <Workspace/>
    </div>
  </>
  )
}

function SignIn() {
  return (
    <LoginPage/>
  )
}

const App = () => {
  
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/WorkShop">Work Shop</Link>
        <Link to="/SignIn">Login/Sign up</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Workshop" element={<Workshop />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App

