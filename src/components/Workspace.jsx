import { useState, useRef, useEffect } from 'react'
import MosaicWorkspace from './MosaicWorkspace';
import AddPanel from './AddPanel';
import { PANELS } from '../panels/registry';

const Workspace = () => {
  const [workspace] = useState(loadWorkspace);
  const [panels, setPanels] = useState(workspace.panels);
  const nextId = useRef(workspace.nextId)

  function loadWorkspace() {
    const saved = localStorage.getItem("workspace");
    return saved ? JSON.parse(saved) : { panels: [], nextID: 1 }; //checks local storage for the stored layout of panels, if there is no layout stored it upates it to the values on the right
  }

  useEffect (() => {
        localStorage.setItem("workspace", JSON.stringify({ panels, nextId: nextId.current })
        , [panels]); // this watches the array [panels] and when a change is made to it it uploads it to the local storage
  })

  const addPanel = (type) => {
    const id = nextId.current++; //sets id to the current value of nextId THEN increments the value of nextId
    setPanels(prev => [...prev, {id, type}]); //takes the previous [panels] array and creates a new one with all of the old data and appends the new panel to the end of it
  }


  return (
    <div>
        <AddPanel/>
        <MosaicWorkspace/>
    </div>
  )
}

export default Workspace
