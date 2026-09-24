import { useState } from "react";

const [isOpen, setIsOpen] = useState(false);
const [select, setSelect] = useState(null);
const ref = useRef(null);

useEffect(() => {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
}, []);

const handleSelect = (item) => {
    setSelect(item);
};

const AddPanels = () => {
  return (
    <div ref={ref}>
        <button onClick={() => setIsOpen(prev => !prev)}>
            Add Panel v
        </button>
        {isOpen && (
            <ul className="menu">
                <li onClick={() => handleSelect("placeholder")}>Placeholder</li>
            </ul>
        )}
    </div>
  )
}

export default AddPanels
