import Sidebar from "./components/Sidebar"
import Workspace from "./components/Workspace"
import Navbar from "./components/Navbar"
import LoginPage from "./components/LoginPage"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import SignUp from "./components/SignUp"
import { AuthProvider } from "./authorization"
import RouterNav from "./components/RouterNav"
import Storefront from "./components/Storefront"

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

const App = () => {
  
  return (

    //React router setup
    <BrowserRouter>
      {/* Auth provider allows components to user information stored in the JWT */}
      <AuthProvider>
        <div className="app">
          <Routes>
          {/* Nav that contains the links for the different pages */}
            <Route element={ <RouterNav /> }>
          {/* These routes make the links navigate to the corresponding functions defined above app */}
              <Route path="/" element={<HomePage />} />
              <Route path="/Workshop" element={<Workshop />} />
              <Route path="/SignIn" element={<LogIn />} />
              <Route path="/SignUp" element={<ToSignUp />} />
            </Route>
          <Route path="/:slug" element={<Storefront />} />
        </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}


export default App

