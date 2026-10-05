import Sidebar from "./components/Sidebar"
import Workspace from "./components/Workspace"
import Navbar from "./components/Navbar"

const App = () => {
  
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

export default App

