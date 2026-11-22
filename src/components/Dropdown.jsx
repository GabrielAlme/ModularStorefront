import { useState, useRef, useEffect } from "react";

const Dropdown = ({ title, children }) => {

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
    <div ref={ref} className="drop-wrapper">
        <button onClick={() => setIsOpen(prev => !prev)} className="drop-button">
            { title }
        </button>
        {isOpen && children}
    </div>
  )
}

export default Dropdown
