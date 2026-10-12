import Sidebar from "./components/Sidebar"
import Workspace from "./components/Workspace"
import Navbar from "./components/Navbar"
import LoginPage from "./components/LoginPage"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

//Function that links to Home.jsx
function HomePage() {
  return (
    <Home/>
  )
}
//Function that links to workspace.jsx 
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
//Function that links to loginpage.jsx
function SignIn() {
  return (
    <LoginPage/>
  )
}

const App = () => {
  
  return (

    //React router setup
    <BrowserRouter>
      //Nav that contains the links for the different pages
      <nav>
        <Link to="/">Home</Link>
        <Link to="/WorkShop">Work Shop</Link>
        <Link to="/SignIn">Login/Sign up</Link>
      </nav>

      //These routes make the links navigate to the corresponding functions defined above app
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Workshop" element={<Workshop />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App

