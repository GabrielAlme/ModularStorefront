import { useState, useRef, useEffect } from "react";
import { PANELS } from '../panels/registry';

const Dropdown = ({ registry, onSelect, title }) => {

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);


    useEffect(() => { //this tracks if the user clicks outside of the dropdown and closes it when they do
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); 
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const results = useMemo(() => {
            const q = query.trim().toLowerCase(); //trims the users query of spaces and end lines at the start or end
            if(!q) return [];//hands the searchbar a blank array if the query is empty
            return registryItems.filter(item => item.title.toLowerCase().includes(q)).slice(0, 8);// filters through the entries of registryItems to find what the user is looking for
        }, [query, registry]);

  return (
    <div ref={ref}>
        <button onClick={() => setIsOpen(prev => !prev)}>
            { title }
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

export default Dropdown
