import Placeholder from "./Placeholder"
import Sidebar from "../components/Sidebar"
import RequestPanel from "./RequestPanel"
import BackgroundManager from "./BackgroundManager" // Assuming you named Task 2 & 3 file this

// Never reuse, reorder, or delete a number. Retired panels keep their slot.
export const PANELS = {
 1 : { title: "Placeholder", component: Placeholder },
 2 : { title: "Placeholder2", component: Placeholder },
 3 : { title: "Placeholder3", component: Placeholder },
 4 : { title: "Placeholder4", component: Placeholder },
 5 : { title: "Request New Panel Form", component: RequestPanel },
 6 : { title: "Background Settings Manager", component: BackgroundManager }
}