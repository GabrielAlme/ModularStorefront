import { useState, useRef, useEffect } from "react";

const Dropdown = ({ registry, onSelect, title, emptyMessage = "Nothing Here"}) => {

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
            { title }
        </button>
        {isOpen && (
            <ul className="search-results">
                {Object.keys(registry).length === 0 ? (
                    <li className="empty">{ emptyMessage }</li>
                    ) : (
                    Object.entries(registry).map(([id, type]) => ( //takes the filtered results and maps the items to an unordered list
                        <li key={id} onClick={() => {onSelect(id);}}>
                            <span>{type.title}</span>
                        </li>
                    ))
                )}
            </ul>
        )}
    </div>
  )
}

export default Dropdown
