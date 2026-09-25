import { useState, useRef, useEffect } from 'react'
import MosaicWorkspace from './MosaicWorkspace';
import AddPanel from './AddPanel';

const Workspace = () => {
  const [workspace] = useState(loadWorkspace);
  const [panels, setPanels] = useState(workspace.panels);
  const [layout, setLayout] = useState(workspace.layout);
  const nextId = useRef(workspace.nextId);

  function loadWorkspace() {
    const saved = JSON.parse(localStorage.getItem("workspace")) ?? {};
    return { panels: saved.panels ?? [], nextId: saved.nextId ?? 1, layout: saved.layout ?? null} //checks local storage for the stored layout of panels, if there is no layout stored it upates it to the values on the right
  }

  useEffect (() => {
        localStorage.setItem("workspace", JSON.stringify({ panels, nextId: nextId.current, layout })
        , [panels, layout]); // this watches the array [panels] and when a change is made to it it uploads it to the local storage
  })

  const addPanel = (type) => {
    const id = nextId.current++; //sets id to the current value of nextId THEN increments the value of nextId
    setPanels(prev => [...prev, {id, type}]); //takes the previous [panels] array and creates a new one with all of the old data and appends the new panel to the end of it
    setLayout(prev => prev ? {direction: "column", first: id, second: prev} : id); //places the new panel on top of the others
  }

  return (
    <div>
        <AddPanel onSelect={addPanel}/>  {/* this passes the data from onSelect inside of AddPanel to the function addPanel */}
        <MosaicWorkspace panels={panels} layout={layout} onChange={setLayout}/> {/* when a new panel is added to panels array it is passed to the mosaic inside of mosaic workspace here*/}
    </div>
  )
}

export default Workspace
