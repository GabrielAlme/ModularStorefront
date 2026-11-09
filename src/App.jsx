import Sidebar from "./components/Sidebar"
import Workspace from "./components/Workspace"
import Navbar from "./components/Navbar"
import LoginPage from "./components/LoginPage"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import SignUp from "./components/SignUp"
import { AuthProvider } from "./authorization"
import ProtectedExample from "./components/ProtectedExample"
import { ProtectedRoute } from "./protectedRoute"
import Projects from "./components/Projects"

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
    <div className="ws">
      <Workspace/>
    </div>
  </>
  )
}
//Function that links to loginpage.jsx
function LogIn() {
  return (
    <LoginPage/>
  )
}
function ToSignUp() {
  return <SignUp/>
}
function ToProtected() {
  return <ProtectedExample />
}
function ToProjects() {
  return <Projects />
}


const App = () => {
  
  return (

    //React router setup
    <BrowserRouter>
      {/* Auth provider allows components to user information stored in the JWT */}
      <AuthProvider>
        <div className="app">
          {/* Nav that contains the links for the different pages */}
          <nav className="router-nav">
            <Link to="/">Home</Link> |{" "}
            <Link to="/Projects">Projects</Link> |{" "}
            <Link to="/SignIn">Login/Sign up</Link> |{" "}
            <Link to="/protected">Protected Page</Link>
          </nav>

          {/* These routes make the links navigate to the corresponding functions defined above app */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Workshop" element={<Workshop />} />
            <Route path="/SignIn" element={<LogIn />} />
            <Route path="/SignUp" element={<ToSignUp />} />
            <Route path="/Projects" element={<ToProjects />} />

            {/*Anything wrapped in this element is protected and redirects to signin if the user is not logged in*/}
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<ToProtected />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}


export default App

