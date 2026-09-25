import { useState } from 'react'
import Workspace from "./components/Workspace"
import AddPanel from "./components/AddPanel"

const App = () => {
  const [workspace] = useState(loadWorkspace);
  const [panels, setPanels] = useState(workspace.panels);
  const nextId = useRef(workspace.nextId)
  
  return (
    <>
      <AddPanel/>
      <Workspace open={open}/>
    </>
  )
}

export default App

