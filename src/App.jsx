import LoginPage from "./components/LoginPage"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import SignUp from "./components/SignUp"
import { AuthProvider } from "./authorization"
import ProtectedExample from "./components/ProtectedExample"
import { ProtectedRoute } from "./protectedRoute"
import Projects from "./components/Projects"
import RouterNav from "./components/RouterNav"
import Storefront from "./components/Storefront"
import Workspace from "./components/Workspace"
import CartPage from "./components/CartPage" 

//Function that links to Home.jsx
function HomePage() {
  return (
    <Home/>
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
          <Routes>
          {/* Nav that contains the links for the different pages */}
            <Route element={ <RouterNav /> }>
          {/* These routes make the links navigate to the corresponding functions defined above app */}
              <Route path="/" element={<HomePage />} />
              <Route path="/SignIn" element={<LogIn />} />
              <Route path="/SignUp" element={<ToSignUp />} />
            <Route path="/Projects" element={<ToProjects />} />
              
            {/*Anything wrapped in this element is protected and redirects to signin if the user is not logged in*/}
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<ToProtected />} />
              <Route path="/Workspace" element={<Workspace />} />
              <Route path="/Cart" element={<CartPage />} /> 
            </Route>
            </Route>
          <Route path="/:slug" element={<Storefront />} />
        </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}


export default App

