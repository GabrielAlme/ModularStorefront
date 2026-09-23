import { useState } from 'react'
import Workspace from "./components/Workspace"

const App = () => {
  const [open, setOpen] = useState(["placeholder", "placeholder2", "placeholder3", "placeholder4"]);
  
  return <Workspace open={open} />
}

export default App

