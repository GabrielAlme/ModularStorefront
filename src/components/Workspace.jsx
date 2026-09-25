import { useState, useRef } from 'react'
import AddPanel from './AddPanel';

const Workspace = () => {
  const [workspace] = useState(loadWorkspace);
  const [panels, setPanels] = useState(workspace.panels);
  const nextId = useRef(workspace.nextId)

  return (
    <div>
      
    </div>
  )
}

export default Workspace
