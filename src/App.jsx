import Sidebar from "./components/Sidebar"
import Workspace from "./components/Workspace"

const App = () => {
  
  return (
    <>
    <div>
      <Sidebar/>
    </div>
    <div id="ws">
      <Workspace/>
    </div>
    </>
  )
}

export default App

