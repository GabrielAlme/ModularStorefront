import { useState } from 'react'
import Workspace from "./components/Workspace"
import AddPanel from "./components/AddPanel"

const App = () => {
  const [open, setOpen] = useState(["placeholder", "placeholder2", "placeholder3", "placeholder4"]);
  
  return (
    <>
      <AddPanel/>
      <Workspace open={open}/>
    </>
  )
}

export default App

