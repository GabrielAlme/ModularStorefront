import { useState, useRef } from 'react'
import AddPanel from './AddPanel';

const Workspace = () => {
  const [workspace] = useState(loadWorkspace);
  const [panels, setPanels] = useState(workspace.panels);
  const nextId = useRef(workspace.nextId)

  function loadWorkspace() {
    const saved = localStorage.getItem("workspace");
    return saved ? JSON.parse(saved) : { panels: [], nextID: 1 }; //checks local storage for the stored layout of panels, if there is no layout stored it upates it to the values on the right
  }

  return (
    <div>
      
    </div>
  )
}

export default Workspace
