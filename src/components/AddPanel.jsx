import { useState, useRef, useEffect } from "react";
import { PANELS } from '../panels/registry';

const AddPanel = ({ onSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => { //this tracks if the user clicks outside of the dropdown and closes it when they do
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); 
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

  return (
    <div ref={ref}>
        <button onClick={() => setIsOpen(prev => !prev)}>
            Add Panel v
        </button>
        {isOpen && (
            <ul className="dropdown">
                {Object.entries(PANELS).map(([type, panel]) => ( //this takes each entry in PANELS and creates an object for them and adds that object to the dropdown menu
                    <li key={type} onClick={() => onSelect(type)}>{ panel.title }</li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default AddPanel
