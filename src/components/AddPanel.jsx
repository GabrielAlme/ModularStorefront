import { useState, useRef, useEffect } from "react";

const AddPanel = ({ onSelect }) => {

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
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
            <ul className="menu">
                <li onClick={() => onSelect("placeholder")}>Placeholder</li>
            </ul>
        )}
    </div>
  )
}

export default AddPanel
